import { describe, expect, test } from "vitest";
import {
  HUB_ADMIN_EMAIL,
  HUB_ONE_ID,
  HUB_THREE_ID,
  HUB_USER_EMAIL,
  TENANT_ONE_ID,
} from "../fixtures";
import {
  createTestClient,
  rpcIsHubTenant,
  rpcIsHubUser,
  signInAs,
  signedInClient,
} from "../test-helpers";

describe("hubs portal", () => {
  describe("tenants", () => {
    test("01 - hub admin cannot see tenants", async () => {
      const supabase = createTestClient();
      await signInAs(supabase, HUB_ADMIN_EMAIL);

      const { data } = await supabase
        .from("tenants")
        .select("id")
        .eq("id", TENANT_ONE_ID)
        .maybeSingle();

      expect(data).toBeNull();
    });

    test("02 - hub admin cannot insert a tenant", async () => {
      const supabase = createTestClient();
      await signInAs(supabase, HUB_ADMIN_EMAIL);

      const { data, error } = await supabase
        .from("tenants")
        .insert({
          company_name: "Vitest Denied Hub Admin Tenant",
          display_name: "vitest-denied-hub-admin-tenant",
        })
        .select("id");

      expect(error).not.toBeNull();
      expect(data).toBeNull();
    });

    test("03 - hub user cannot insert a tenant", async () => {
      const supabase = createTestClient();
      await signInAs(supabase, HUB_USER_EMAIL);

      const { data, error } = await supabase
        .from("tenants")
        .insert({
          company_name: "Vitest Denied Hub User Tenant",
          display_name: "vitest-denied-hub-user-tenant",
        })
        .select("id");

      expect(error).not.toBeNull();
      expect(data).toBeNull();
    });
  });

  describe("tenant_hubs", () => {
    test("04 - hub admin sees Hub One but not Hub Three", async () => {
      const supabase = createTestClient();
      await signInAs(supabase, HUB_ADMIN_EMAIL);

      const { data: own } = await supabase
        .from("tenant_hubs")
        .select("id")
        .eq("id", HUB_ONE_ID)
        .maybeSingle();
      expect(own?.id).toBe(HUB_ONE_ID);

      const { data: other } = await supabase
        .from("tenant_hubs")
        .select("id")
        .eq("id", HUB_THREE_ID)
        .maybeSingle();
      expect(other).toBeNull();
    });

    test("05 - hub user sees Hub One but not Hub Three", async () => {
      const supabase = createTestClient();
      await signInAs(supabase, HUB_USER_EMAIL);

      const { data: own } = await supabase
        .from("tenant_hubs")
        .select("id")
        .eq("id", HUB_ONE_ID)
        .maybeSingle();
      expect(own?.id).toBe(HUB_ONE_ID);

      const { data: other } = await supabase
        .from("tenant_hubs")
        .select("id")
        .eq("id", HUB_THREE_ID)
        .maybeSingle();
      expect(other).toBeNull();
    });

    test("06 - hub user cannot insert a hub", async () => {
      const supabase = createTestClient();
      await signInAs(supabase, HUB_USER_EMAIL);

      const { data, error } = await supabase
        .from("tenant_hubs")
        .insert({
          display_name: "Vitest Hub User Hub",
          tenant_id: TENANT_ONE_ID,
        })
        .select("id");

      expect(error).not.toBeNull();
      expect(data).toBeNull();
    });

    test("07 - hub admin cannot insert a hub", async () => {
      const supabase = createTestClient();
      await signInAs(supabase, HUB_ADMIN_EMAIL);

      const { data, error } = await supabase
        .from("tenant_hubs")
        .insert({
          display_name: "Vitest Hub Admin Hub",
          tenant_id: TENANT_ONE_ID,
        })
        .select("id");

      expect(error).not.toBeNull();
      expect(data).toBeNull();
    });
  });

  describe("hub_users", () => {
    test("08 - hub admin can read Hub One memberships", async () => {
      const supabase = createTestClient();
      await signInAs(supabase, HUB_ADMIN_EMAIL);

      const { data, error } = await supabase
        .from("hub_users")
        .select("id")
        .eq("hub_id", HUB_ONE_ID);

      expect(error).toBeNull();
      expect(data?.length).toBeGreaterThan(0);
    });
  });

  describe("RPC helpers", () => {
    test("09 - is_hub_user is true for hub admin and hub user", async () => {
      expect(
        await rpcIsHubUser(await signedInClient(HUB_ADMIN_EMAIL), HUB_ONE_ID),
      ).toBe(true);
      expect(
        await rpcIsHubUser(await signedInClient(HUB_USER_EMAIL), HUB_ONE_ID),
      ).toBe(true);
    });

    test("10 - is_hub_tenant is false for hub admin and hub user", async () => {
      expect(
        await rpcIsHubTenant(await signedInClient(HUB_ADMIN_EMAIL), HUB_ONE_ID),
      ).toBe(false);
      expect(
        await rpcIsHubTenant(await signedInClient(HUB_USER_EMAIL), HUB_ONE_ID),
      ).toBe(false);
    });
  });
});
