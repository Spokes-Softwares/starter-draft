import { afterEach, describe, expect, test } from "vitest";
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
import {
  deleteTestAssets,
  insertTestAsset,
  signedInClient,
} from "../../integration-tests/test-helpers";
import { ListAssetsForHub } from "./list-assets-for-hub";

const createdAssetIds: string[] = [];
const createdAssetTypeIds: string[] = [];

afterEach(async () => {
  await deleteTestAssets(createdAssetIds, createdAssetTypeIds);
});

async function insertAsset(
  hubId: string,
  tenantId: string,
  referenceTag: string,
  createdAt: string,
) {
  const { assetId, assetTypeId } = await insertTestAsset({
    hubId,
    tenantId,
    referenceTag,
    createdAt,
  });
  createdAssetIds.push(assetId);
  createdAssetTypeIds.push(assetTypeId);
  return assetId;
}

describe("ListAssetsForHub", () => {
  test("01 - operator listing Hub One sees its assets newest first and cannot view a Tenant Two asset", async () => {
    const hubThreeAssetId = await insertAsset(
      HUB_THREE_ID,
      TENANT_TWO_ID,
      "Vitest Hub Three Asset",
      "2099-01-02T00:00:00.000Z",
    );
    const olderHubOneAssetId = await insertAsset(
      HUB_ONE_ID,
      TENANT_ONE_ID,
      "Vitest Older Hub One Asset",
      "2099-01-01T00:00:00.000Z",
    );
    const newerHubOneAssetId = await insertAsset(
      HUB_ONE_ID,
      TENANT_ONE_ID,
      "Vitest Newer Hub One Asset",
      "2099-01-03T00:00:00.000Z",
    );

    const client = await signedInClient(OPERATOR_EMAIL);
    const assets = await ListAssetsForHub(client, HUB_ONE_ID);
    const ids = assets.map((asset) => asset.id);
    const olderIndex = ids.indexOf(olderHubOneAssetId);

    expect(assets[0]).toMatchObject({
      id: newerHubOneAssetId,
      reference_tag: "Vitest Newer Hub One Asset",
    });
    expect(olderIndex).toBeGreaterThan(0);
    expect(ids).not.toContain(hubThreeAssetId);
  });

  test("02 - Tenant One can view Hub One assets and cannot view Tenant Two assets", async () => {
    const hubThreeAssetId = await insertAsset(
      HUB_THREE_ID,
      TENANT_TWO_ID,
      "Vitest Hub Three Asset",
      "2099-01-02T00:00:00.000Z",
    );
    const hubOneAssetId = await insertAsset(
      HUB_ONE_ID,
      TENANT_ONE_ID,
      "Vitest Hub One Asset",
      "2099-01-03T00:00:00.000Z",
    );

    const client = await signedInClient(TENANT_EMAIL);
    const ownAssets = await ListAssetsForHub(client, HUB_ONE_ID);
    const otherAssets = await ListAssetsForHub(client, HUB_THREE_ID);

    expect(ownAssets.map((asset) => asset.id)).toContain(hubOneAssetId);
    expect(ownAssets[0]?.id).toBe(hubOneAssetId);
    expect(otherAssets).toEqual([]);
    expect(ownAssets.map((asset) => asset.id)).not.toContain(hubThreeAssetId);
  });

  test("03 - hub user can view Hub One assets and cannot view Hub Two assets", async () => {
    const hubTwoAssetId = await insertAsset(
      HUB_TWO_ID,
      TENANT_ONE_ID,
      "Vitest Hub Two Asset",
      "2099-01-02T00:00:00.000Z",
    );
    const hubOneAssetId = await insertAsset(
      HUB_ONE_ID,
      TENANT_ONE_ID,
      "Vitest Hub One Asset",
      "2099-01-03T00:00:00.000Z",
    );

    const client = await signedInClient(HUB_USER_EMAIL);
    const ownAssets = await ListAssetsForHub(client, HUB_ONE_ID);
    const otherAssets = await ListAssetsForHub(client, HUB_TWO_ID);

    expect(ownAssets.map((asset) => asset.id)).toContain(hubOneAssetId);
    expect(ownAssets[0]?.id).toBe(hubOneAssetId);
    expect(otherAssets).toEqual([]);
    expect(ownAssets.map((asset) => asset.id)).not.toContain(hubTwoAssetId);
  });
});
