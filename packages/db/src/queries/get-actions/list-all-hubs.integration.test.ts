import { describe, expect, test } from "vitest";
import {
  HUB_FOUR_ID,
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
import { listAllHubs } from "./list-all-hubs";

async function assetCountForHub(
  client: Awaited<ReturnType<typeof signedInClient>>,
  hubId: string,
) {
  const { count, error } = await client
    .from("assets")
    .select("*", { count: "exact", head: true })
    .eq("hub_id", hubId);

  if (error) throw error;
  return count ?? 0;
}

describe("listAllHubs", () => {
  test("01 - operator sees every hub with its tenant and asset count", async () => {
    const client = await signedInClient(OPERATOR_EMAIL);
    const hubs = await listAllHubs(client);
    const ids = hubs.map((hub) => hub.id);

    expect(ids).toEqual(
      expect.arrayContaining([
        HUB_ONE_ID,
        HUB_TWO_ID,
        HUB_THREE_ID,
        HUB_FOUR_ID,
      ]),
    );

    const hubOne = hubs.find((hub) => hub.id === HUB_ONE_ID);
    const hubThree = hubs.find((hub) => hub.id === HUB_THREE_ID);

    expect(hubOne).toMatchObject({
      display_name: "Hub One",
      tenant_id: TENANT_ONE_ID,
      tenants: {
        company_name: "Tenant one",
        display_name: "Tenant One",
      },
    });
    expect(hubThree).toMatchObject({
      display_name: "Hub Three",
      tenant_id: TENANT_TWO_ID,
      tenants: {
        company_name: "Tenant two",
        display_name: "Tenant Two",
      },
    });
    expect(hubOne?.assets[0]?.count).toBe(
      await assetCountForHub(client, HUB_ONE_ID),
    );
    expect(hubThree?.assets[0]?.count).toBe(
      await assetCountForHub(client, HUB_THREE_ID),
    );
  });

  test("02 - tenant sees Hub One and Hub Two only", async () => {
    const client = await signedInClient(TENANT_EMAIL);
    const hubs = await listAllHubs(client);
    const ids = hubs.map((hub) => hub.id);

    expect(ids).toContain(HUB_ONE_ID);
    expect(ids).toContain(HUB_TWO_ID);
    expect(ids).not.toContain(HUB_THREE_ID);
    expect(ids).not.toContain(HUB_FOUR_ID);

    const hubOne = hubs.find((hub) => hub.id === HUB_ONE_ID);
    expect(hubOne?.tenants).toEqual({
      company_name: "Tenant one",
      display_name: "Tenant One",
    });
    expect(hubOne?.assets[0]?.count).toBe(
      await assetCountForHub(client, HUB_ONE_ID),
    );
  });

  test("03 - hub user sees no hubs", async () => {
    const client = await signedInClient(HUB_USER_EMAIL);
    const hubs = await listAllHubs(client);

    expect(hubs).toEqual([]);
  });
});
