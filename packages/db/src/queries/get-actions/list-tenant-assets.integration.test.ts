import { afterEach, describe, expect, test } from "vitest";
import {
  HUB_ONE_ID,
  HUB_THREE_ID,
  HUB_TWO_ID,
  HUB_USER_EMAIL,
  OPERATOR_EMAIL,
  TENANT_ONE_ID,
} from "../../integration-tests/fixtures";
import {
  createAdminTestClient,
  signedInClient,
} from "../../integration-tests/test-helpers";
import { listAssetsForTenant } from "./list-tenant-assets";

const createdAssetIds: string[] = [];

afterEach(async () => {
  if (createdAssetIds.length === 0) return;
  const admin = createAdminTestClient();
  await admin.from("assets").delete().in("id", createdAssetIds);
  createdAssetIds.length = 0;
});

async function insertAsset(hubId: string, displayName: string) {
  const admin = createAdminTestClient();
  const { data, error } = await admin
    .from("assets")
    .insert({ hub_id: hubId, display_name: displayName })
    .select("id")
    .single();

  if (error) throw error;
  createdAssetIds.push(data.id);
  return data.id;
}

describe("listAssetsForTenant", () => {
  test("01 - operator sees the new Hub One asset first and not Hub Three", async () => {
    const hubThreeAssetId = await insertAsset(
      HUB_THREE_ID,
      "Vitest Hub Three Asset",
    );
    const hubOneAssetId = await insertAsset(HUB_ONE_ID, "Vitest Hub One Asset");

    const client = await signedInClient(OPERATOR_EMAIL);
    const assets = await listAssetsForTenant(client, TENANT_ONE_ID);
    const ids = assets.map((asset) => asset.id);

    expect(assets[0]?.id).toBe(hubOneAssetId);
    expect(assets[0]?.tenant_hubs.tenant_id).toBe(TENANT_ONE_ID);
    expect(ids).not.toContain(hubThreeAssetId);
  });

  test("02 - hub user sees the Hub One asset and not the Hub Two asset", async () => {
    const hubTwoAssetId = await insertAsset(HUB_TWO_ID, "Vitest Hub Two Asset");
    const hubOneAssetId = await insertAsset(HUB_ONE_ID, "Vitest Hub One Asset");

    const client = await signedInClient(HUB_USER_EMAIL);
    const assets = await listAssetsForTenant(client, TENANT_ONE_ID);
    const ids = assets.map((asset) => asset.id);

    expect(ids).toContain(hubOneAssetId);
    expect(ids).not.toContain(hubTwoAssetId);
    expect(assets.every((asset) => asset.hub_id !== HUB_TWO_ID)).toBe(true);
  });
});
