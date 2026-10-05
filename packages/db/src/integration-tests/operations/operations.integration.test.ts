import { afterEach, describe, expect, test } from "vitest";
import { HUB_ONE_ID, OPERATOR_EMAIL, TENANT_ONE_ID } from "../fixtures";
import {
  createAdminTestClient,
  createTestClient,
  rpcIsHubTenant,
  rpcIsHubUser,
  rpcIsOperator,
  rpcIsTenant,
  signInAs,
  signedInClient,
} from "../test-helpers";

const createdTenantIds: string[] = [];

afterEach(async () => {
  if (createdTenantIds.length === 0) return;
  const admin = createAdminTestClient();
  await admin.from("tenants").delete().in("id", createdTenantIds);
  createdTenantIds.length = 0;
});

describe("operations portal", () => {
  describe("tenants", () => {
    test("01 - operator can see Tenant One", async () => {
      const supabase = createTestClient();
      await signInAs(supabase, OPERATOR_EMAIL);

      const { data, error } = await supabase
        .from("tenants")
        .select("id")
        .eq("id", TENANT_ONE_ID)
        .maybeSingle();

      expect(error).toBeNull();
      expect(data?.id).toBe(TENANT_ONE_ID);
    });

    test("02 - operator can insert a tenant", async () => {
      const supabase = createTestClient();
      await signInAs(supabase, OPERATOR_EMAIL);

      const { data, error } = await supabase
        .from("tenants")
        .insert({
          company_name: "Vitest Operator Tenant",
          display_name: "vitest-operator-tenant",
        })
        .select("id")
        .single();

      expect(error).toBeNull();
      expect(data?.id).toBeTruthy();
      if (data?.id) createdTenantIds.push(data.id);
    });
  });

  describe("tenant_users", () => {
    test("03 - operator can see Tenant One memberships", async () => {
      const supabase = createTestClient();
      await signInAs(supabase, OPERATOR_EMAIL);

      const { data, error } = await supabase
        .from("tenant_users")
        .select("id")
        .eq("tenant_id", TENANT_ONE_ID);

      expect(error).toBeNull();
      expect(data?.length).toBeGreaterThan(0);
    });
  });

  describe("tenant_hubs", () => {
    test("04 - operator can see Hub One", async () => {
      const supabase = createTestClient();
      await signInAs(supabase, OPERATOR_EMAIL);

      const { data } = await supabase
        .from("tenant_hubs")
        .select("id")
        .eq("id", HUB_ONE_ID)
        .maybeSingle();

      expect(data?.id).toBe(HUB_ONE_ID);
    });
  });

  describe("RPC helpers", () => {
    test("05 - is_operator is true for operator", async () => {
      const client = await signedInClient(OPERATOR_EMAIL);
      expect(await rpcIsOperator(client)).toBe(true);
    });

    test("06 - is_tenant is false for operator", async () => {
      const client = await signedInClient(OPERATOR_EMAIL);
      expect(await rpcIsTenant(client, TENANT_ONE_ID)).toBe(false);
    });

    test("07 - is_hub_user is false for operator", async () => {
      const client = await signedInClient(OPERATOR_EMAIL);
      expect(await rpcIsHubUser(client, HUB_ONE_ID)).toBe(false);
    });

    test("08 - is_hub_tenant is false for operator", async () => {
      const client = await signedInClient(OPERATOR_EMAIL);
      expect(await rpcIsHubTenant(client, HUB_ONE_ID)).toBe(false);
    });
  });
});
