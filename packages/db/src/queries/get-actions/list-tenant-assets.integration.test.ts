import { afterEach, describe, expect, test } from "vitest";
import {
  HUB_ONE_ID,
  HUB_THREE_ID,
  HUB_TWO_ID,
  HUB_USER_EMAIL,
  OPERATOR_EMAIL,
  TENANT_ONE_ID,
  TENANT_TWO_ID,
} from "../../integration-tests/fixtures";
import {
  deleteTestAssets,
  insertTestAsset,
  signedInClient,
} from "../../integration-tests/test-helpers";
import { listAssetsForTenant } from "./list-tenant-assets";

const createdAssetIds: string[] = [];
const createdAssetTypeIds: string[] = [];

afterEach(async () => {
  await deleteTestAssets(createdAssetIds, createdAssetTypeIds);
});

async function insertAsset(
  hubId: string,
  tenantId: string,
  referenceTag: string,
) {
  const { assetId, assetTypeId } = await insertTestAsset({
    hubId,
    tenantId,
    referenceTag,
  });
  createdAssetIds.push(assetId);
  createdAssetTypeIds.push(assetTypeId);
  return assetId;
}

describe("listAssetsForTenant", () => {
  test("01 - operator listing Tenant One sees a Hub One asset and cannot view a Tenant Two asset", async () => {
    const hubThreeAssetId = await insertAsset(
      HUB_THREE_ID,
      TENANT_TWO_ID,
      "Vitest Hub Three Asset",
    );
    const hubOneAssetId = await insertAsset(
      HUB_ONE_ID,
      TENANT_ONE_ID,
      "Vitest Hub One Asset",
    );

    const client = await signedInClient(OPERATOR_EMAIL);
    const assets = await listAssetsForTenant(client, TENANT_ONE_ID);
    const ids = assets.map((asset) => asset.id);

    expect(assets[0]?.id).toBe(hubOneAssetId);
    expect(assets[0]?.tenant_hubs.tenant_id).toBe(TENANT_ONE_ID);
    expect(ids).not.toContain(hubThreeAssetId);
  });

  test("02 - hub user listing Tenant One sees a Hub One asset and cannot view a Hub Two asset", async () => {
    const hubTwoAssetId = await insertAsset(
      HUB_TWO_ID,
      TENANT_ONE_ID,
      "Vitest Hub Two Asset",
    );
    const hubOneAssetId = await insertAsset(
      HUB_ONE_ID,
      TENANT_ONE_ID,
      "Vitest Hub One Asset",
    );

    const client = await signedInClient(HUB_USER_EMAIL);
    const assets = await listAssetsForTenant(client, TENANT_ONE_ID);
    const ids = assets.map((asset) => asset.id);

    expect(ids).toContain(hubOneAssetId);
    expect(ids).not.toContain(hubTwoAssetId);
    expect(assets.every((asset) => asset.hub_id !== HUB_TWO_ID)).toBe(true);
  });
});
