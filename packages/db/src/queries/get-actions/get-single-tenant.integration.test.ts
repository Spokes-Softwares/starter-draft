import { describe, expect, test } from "vitest";
import {
  HUB_USER_EMAIL,
  OPERATOR_EMAIL,
  TENANT_EMAIL,
  TENANT_ONE_ID,
  TENANT_TWO_ID,
} from "../../integration-tests/fixtures";
import { signedInClient } from "../../integration-tests/test-helpers";
import { getTenant } from "./get-single-tenant";

describe("getTenant", () => {
  test("01 - operator can read Tenant One", async () => {
    const client = await signedInClient(OPERATOR_EMAIL);
    const tenant = await getTenant(client, TENANT_ONE_ID);

    expect(tenant.id).toBe(TENANT_ONE_ID);
    expect(tenant.display_name).toBe("Tenant One");
  });

  test("02 - tenant can read Tenant One", async () => {
    const client = await signedInClient(TENANT_EMAIL);
    const tenant = await getTenant(client, TENANT_ONE_ID);

    expect(tenant.id).toBe(TENANT_ONE_ID);
    expect(tenant.display_name).toBe("Tenant One");
  });

  test("03 - tenant cannot read Tenant Two", async () => {
    const client = await signedInClient(TENANT_EMAIL);

    await expect(getTenant(client, TENANT_TWO_ID)).rejects.toThrow();
  });

  test("04 - hub user cannot read Tenant One", async () => {
    const client = await signedInClient(HUB_USER_EMAIL);

    await expect(getTenant(client, TENANT_ONE_ID)).rejects.toThrow();
  });
});
