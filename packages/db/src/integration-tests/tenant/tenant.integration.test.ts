import { afterEach, describe, expect, test } from "vitest";
import {
  HUB_ONE_ID,
  HUB_THREE_ID,
  TENANT_EMAIL,
  TENANT_ONE_ID,
  TENANT_TWO_ID,
} from "../fixtures";
import {
  createAdminTestClient,
  createTestClient,
  rpcIsHubTenant,
  rpcIsTenant,
  signInAs,
  signedInClient,
} from "../test-helpers";

const createdHubIds: string[] = [];

afterEach(async () => {
  if (createdHubIds.length === 0) return;
  const admin = createAdminTestClient();
  await admin.from("tenant_hubs").delete().in("id", createdHubIds);
  createdHubIds.length = 0;
});

describe("tenant portal", () => {
  describe("tenants", () => {
    test("01 - tenant sees only own tenant", async () => {
      const supabase = createTestClient();
      await signInAs(supabase, TENANT_EMAIL);

      const { data: own } = await supabase
        .from("tenants")
        .select("id")
        .eq("id", TENANT_ONE_ID)
        .maybeSingle();
      expect(own?.id).toBe(TENANT_ONE_ID);

      const { data: other } = await supabase
        .from("tenants")
        .select("id")
        .eq("id", TENANT_TWO_ID)
        .maybeSingle();
      expect(other).toBeNull();
    });

    test("02 - tenant cannot insert a tenant", async () => {
      const supabase = createTestClient();
      await signInAs(supabase, TENANT_EMAIL);

      const { data, error } = await supabase
        .from("tenants")
        .insert({
          company_name: "Vitest Denied Tenant",
          display_name: "vitest-denied-tenant",
        })
        .select("id");

      expect(error).not.toBeNull();
      expect(data).toBeNull();
    });
  });

  describe("tenant_users", () => {
    test("03 - tenant can see own memberships but not Tenant Two", async () => {
      const supabase = createTestClient();
      await signInAs(supabase, TENANT_EMAIL);

      const { data: own } = await supabase
        .from("tenant_users")
        .select("id")
        .eq("tenant_id", TENANT_ONE_ID);
      expect(own?.length).toBeGreaterThan(0);

      const { data: other } = await supabase
        .from("tenant_users")
        .select("id")
        .eq("tenant_id", TENANT_TWO_ID);
      expect(other).toEqual([]);
    });
  });

  describe("tenant_hubs", () => {
    test("04 - tenant sees Hub One but not Hub Three", async () => {
      const supabase = createTestClient();
      await signInAs(supabase, TENANT_EMAIL);

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

    test("05 - tenant can insert hub under own tenant", async () => {
      const supabase = createTestClient();
      await signInAs(supabase, TENANT_EMAIL);

      const { data, error } = await supabase
        .from("tenant_hubs")
        .insert({
          display_name: "Vitest Own Hub",
          tenant_id: TENANT_ONE_ID,
        })
        .select("id")
        .single();

      expect(error).toBeNull();
      expect(data?.id).toBeTruthy();
      if (data?.id) createdHubIds.push(data.id);
    });

    test("06 - tenant cannot insert hub under another tenant", async () => {
      const supabase = createTestClient();
      await signInAs(supabase, TENANT_EMAIL);

      const { data, error } = await supabase
        .from("tenant_hubs")
        .insert({
          display_name: "Vitest Foreign Hub",
          tenant_id: TENANT_TWO_ID,
        })
        .select("id");

      expect(error).not.toBeNull();
      expect(data).toBeNull();
    });
  });

  describe("hub_users", () => {
    test("07 - tenant cannot read Hub Three memberships", async () => {
      const supabase = createTestClient();
      await signInAs(supabase, TENANT_EMAIL);

      const { data } = await supabase
        .from("hub_users")
        .select("id")
        .eq("hub_id", HUB_THREE_ID);

      expect(data).toEqual([]);
    });
  });

  describe("RPC helpers", () => {
    test("08 - is_tenant is true for tenant", async () => {
      const client = await signedInClient(TENANT_EMAIL);
      expect(await rpcIsTenant(client, TENANT_ONE_ID)).toBe(true);
    });

    test("09 - is_hub_tenant is true for tenant on Hub One", async () => {
      const client = await signedInClient(TENANT_EMAIL);
      expect(await rpcIsHubTenant(client, HUB_ONE_ID)).toBe(true);
    });
  });
});
