import { afterEach, describe, expect, test } from "vitest";
import { accountDestinations, resolveAccountKind } from "../../resolve-account";
import {
  HUB_ADMIN_EMAIL,
  HUB_ADMIN_ID,
  HUB_USER_EMAIL,
  HUB_USER_ID,
  OPERATOR_EMAIL,
  OPERATOR_ID,
  TENANT_EMAIL,
  TENANT_USER_ID,
  UNKNOWN_ID,
} from "../fixtures";
import { createTestClient, signInAs } from "../test-helpers";

describe("auth portal", () => {
  describe("resolveAccountKind", () => {
    test("01 - operator resolves as operator", async () => {
      const supabase = createTestClient();
      await signInAs(supabase, OPERATOR_EMAIL);
      expect(await resolveAccountKind(supabase, OPERATOR_ID)).toBe("operator");
    });

    test("02 - tenant resolves as tenant", async () => {
      const supabase = createTestClient();
      await signInAs(supabase, TENANT_EMAIL);
      expect(await resolveAccountKind(supabase, TENANT_USER_ID)).toBe("tenant");
    });

    test("03 - hub admin resolves as hub", async () => {
      const supabase = createTestClient();
      await signInAs(supabase, HUB_ADMIN_EMAIL);
      expect(await resolveAccountKind(supabase, HUB_ADMIN_ID)).toBe("hub");
    });

    test("04 - hub user resolves as hub", async () => {
      const supabase = createTestClient();
      await signInAs(supabase, HUB_USER_EMAIL);
      expect(await resolveAccountKind(supabase, HUB_USER_ID)).toBe("hub");
    });

    test("05 - unknown ID returns error", async () => {
      const supabase = createTestClient();
      await signInAs(supabase, OPERATOR_EMAIL);
      expect(await resolveAccountKind(supabase, UNKNOWN_ID)).toEqual({
        message: "Invalid login credentials",
      });
    });
  });

  describe("accountDestinations", () => {
    test("06 - accountDestinations maps portal URLs from env", () => {
      expect(accountDestinations()).toEqual({
        operator: process.env.OPERATIONS_URL,
        tenant: process.env.TENANT_URL,
        hub: process.env.HUB_URL,
      });
    });
  });

  describe("profiles", () => {
    afterEach(async () => {
      const supabase = createTestClient();
      await signInAs(supabase, TENANT_EMAIL);
      await supabase
        .from("profiles")
        .update({ first_name: "Tenant", last_name: "One" })
        .eq("id", TENANT_USER_ID);
    });

    test("07 - user can select own profile", async () => {
      const supabase = createTestClient();
      await signInAs(supabase, TENANT_EMAIL);

      const { data, error } = await supabase
        .from("profiles")
        .select("id, email")
        .eq("id", TENANT_USER_ID)
        .single();

      expect(error).toBeNull();
      expect(data?.id).toBe(TENANT_USER_ID);
      expect(data?.email).toBe(TENANT_EMAIL);
    });

    test("08 - user cannot select another profile", async () => {
      const supabase = createTestClient();
      await signInAs(supabase, TENANT_EMAIL);

      const { data, error } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", OPERATOR_ID)
        .maybeSingle();

      expect(error).toBeNull();
      expect(data).toBeNull();
    });

    test("09 - user can update own profile", async () => {
      const supabase = createTestClient();
      await signInAs(supabase, TENANT_EMAIL);

      const { data, error } = await supabase
        .from("profiles")
        .update({ first_name: "Updated" })
        .eq("id", TENANT_USER_ID)
        .select("first_name")
        .single();

      expect(error).toBeNull();
      expect(data?.first_name).toBe("Updated");
    });

    test("10 - user cannot update another profile", async () => {
      const supabase = createTestClient();
      await signInAs(supabase, TENANT_EMAIL);

      const { data, error } = await supabase
        .from("profiles")
        .update({ first_name: "Hacked" })
        .eq("id", OPERATOR_ID)
        .select("id");

      expect(error).toBeNull();
      expect(data).toEqual([]);
    });

    test("11 - client cannot set is_operator via update", async () => {
      const supabase = createTestClient();
      await signInAs(supabase, TENANT_EMAIL);

      const { error } = await supabase
        .from("profiles")
        .update({ is_operator: true })
        .eq("id", TENANT_USER_ID);

      expect(error?.message).toBe("permission denied for table profiles");

      const { data } = await supabase
        .from("profiles")
        .select("is_operator")
        .eq("id", TENANT_USER_ID)
        .single();

      expect(data?.is_operator).toBe(false);
    });
  });
});
