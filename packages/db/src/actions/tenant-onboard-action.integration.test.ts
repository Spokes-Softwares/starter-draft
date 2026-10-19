import { afterEach, describe, expect, test } from "vitest";
import {
  createAdminTestClient,
  signedInClient,
} from "../integration-tests/test-helpers";
import tenantOnboardAction from "./tenant-onboard-action";
import { OPERATOR_EMAIL, TENANT_EMAIL } from "../integration-tests/fixtures";

const createdCompanyNames: string[] = [];
const createdEmails: string[] = [];

afterEach(async () => {
  const admin = createAdminTestClient();

  if (createdCompanyNames.length > 0) {
    await admin
      .from("tenants")
      .delete()
      .in("company_name", createdCompanyNames);
    createdCompanyNames.length = 0;
  }

  for (const email of createdEmails) {
    const { data: profile } = await admin
      .from("profiles")
      .select("id")
      .eq("email", email)
      .maybeSingle();
    if (profile) await admin.auth.admin.deleteUser(profile.id);
  }
  createdEmails.length = 0;
});

function tenantValues(email: string, companyName: string) {
  return {
    displayName: "Vitest Tenant",
    companyName,
    email,
    password: "securepassword",
  };
}

describe("tenantOnboardAction", () => {
  test("01 - operator creates a tenant and membership", async () => {
    const email = `vitest-tenant-${crypto.randomUUID()}@spokes.test`;
    const companyName = `Vitest Co ${crypto.randomUUID()}`;
    createdEmails.push(email);
    createdCompanyNames.push(companyName);

    const result = await tenantOnboardAction(
      await signedInClient(OPERATOR_EMAIL),
      tenantValues(email, companyName),
    );

    expect(result.error).toBeUndefined();
    expect(result.data).toEqual({ success: true, tenant: "Vitest Tenant" });

    const admin = createAdminTestClient();
    const { data: tenant } = await admin
      .from("tenants")
      .select("id, display_name")
      .eq("company_name", companyName)
      .single();
    const { data: membership } = await admin
      .from("tenant_users")
      .select("user_id")
      .eq("tenant_id", tenant?.id ?? "")
      .single();
    const { data: profile } = await admin
      .from("profiles")
      .select("id")
      .eq("email", email)
      .single();

    expect(tenant?.display_name).toBe("Vitest Tenant");
    expect(membership?.user_id).toBe(profile?.id);
  });

  test("02 - non-operator cannot create a tenant and the auth user is removed", async () => {
    const email = `vitest-tenant-${crypto.randomUUID()}@spokes.test`;
    const companyName = `Vitest Co ${crypto.randomUUID()}`;
    createdEmails.push(email);
    createdCompanyNames.push(companyName);

    const result = await tenantOnboardAction(
      await signedInClient(TENANT_EMAIL),
      tenantValues(email, companyName),
    );

    expect(result.error).toBeTruthy();
    expect(result.data).toBeUndefined();

    const admin = createAdminTestClient();
    const { data: tenant } = await admin
      .from("tenants")
      .select("id")
      .eq("company_name", companyName)
      .maybeSingle();
    const { data: profile } = await admin
      .from("profiles")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    expect(tenant).toBeNull();
    expect(profile).toBeNull();
  });
});
