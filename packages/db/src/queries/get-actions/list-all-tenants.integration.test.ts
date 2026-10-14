import { describe, expect, test } from "vitest";
import {
  HUB_USER_EMAIL,
  OPERATOR_EMAIL,
  TENANT_EMAIL,
  TENANT_ONE_ID,
  TENANT_TWO_ID,
} from "../../integration-tests/fixtures";
import { signedInClient } from "../../integration-tests/test-helpers";
import { listAllTenants } from "./list-all-tenants";

describe("listAllTenants", () => {
  test("01 - operator can see Tenant One and Tenant Two", async () => {
    const client = await signedInClient(OPERATOR_EMAIL);
    const tenants = await listAllTenants(client);
    const ids = tenants.map((tenant) => tenant.id);

    expect(ids).toContain(TENANT_ONE_ID);
    expect(ids).toContain(TENANT_TWO_ID);
  });

  test("02 - tenant sees only Tenant One", async () => {
    const client = await signedInClient(TENANT_EMAIL);
    const tenants = await listAllTenants(client);

    expect(tenants.map((tenant) => tenant.id)).toEqual([TENANT_ONE_ID]);
  });

  test("03 - hub user sees no tenants", async () => {
    const client = await signedInClient(HUB_USER_EMAIL);
    const tenants = await listAllTenants(client);

    expect(tenants).toEqual([]);
  });
});
