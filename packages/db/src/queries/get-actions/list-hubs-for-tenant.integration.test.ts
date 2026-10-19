import { describe, expect, test } from "vitest";
import {
  HUB_ONE_ID,
  HUB_THREE_ID,
  HUB_TWO_ID,
  HUB_USER_EMAIL,
  OPERATOR_EMAIL,
  TENANT_EMAIL,
  TENANT_ONE_ID,
  TENANT_TWO_ID,
} from "../../integration-tests/fixtures";
import { signedInClient } from "../../integration-tests/test-helpers";
import { listHubsForTenant } from "./list-hubs-for-tenant";

describe("listHubsForTenant", () => {
  test("01 - operator sees Hub One and Hub Two for Tenant One", async () => {
    const client = await signedInClient(OPERATOR_EMAIL);
    const hubs = await listHubsForTenant(client, TENANT_ONE_ID);
    const ids = hubs.map((hub) => hub.id);

    expect(ids).toContain(HUB_ONE_ID);
    expect(ids).toContain(HUB_TWO_ID);
    expect(ids).not.toContain(HUB_THREE_ID);
  });

  test("02 - tenant sees Hub One and Hub Two", async () => {
    const client = await signedInClient(TENANT_EMAIL);
    const hubs = await listHubsForTenant(client, TENANT_ONE_ID);
    const ids = hubs.map((hub) => hub.id);

    expect(ids).toContain(HUB_ONE_ID);
    expect(ids).toContain(HUB_TWO_ID);
    expect(ids).not.toContain(HUB_THREE_ID);
  });

  test("03 - hub user sees only Hub One", async () => {
    const client = await signedInClient(HUB_USER_EMAIL);
    const hubs = await listHubsForTenant(client, TENANT_ONE_ID);

    expect(hubs.map((hub) => hub.id)).toEqual([HUB_ONE_ID]);
  });

  test("04 - tenant listing Tenant Two returns no hubs", async () => {
    const client = await signedInClient(TENANT_EMAIL);
    const hubs = await listHubsForTenant(client, TENANT_TWO_ID);

    expect(hubs).toEqual([]);
  });
});
