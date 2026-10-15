import { afterEach, describe, expect, test } from "vitest";
import {
  HUB_ONE_ID,
  HUB_THREE_ID,
  HUB_TWO_ID,
  HUB_USER_EMAIL,
  OPERATOR_EMAIL,
  TENANT_EMAIL,
} from "../../integration-tests/fixtures";
import {
  createAdminTestClient,
  signedInClient,
} from "../../integration-tests/test-helpers";
import { ListAssetsForHub } from "./list-assets-for-hub";

const createdAssetIds: string[] = [];

afterEach(async () => {
  if (createdAssetIds.length === 0) return;
  const admin = createAdminTestClient();
  await admin.from("assets").delete().in("id", createdAssetIds);
  createdAssetIds.length = 0;
});

async function insertAsset(
  hubId: string,
  displayName: string,
  createdAt: string,
) {
  const admin = createAdminTestClient();
  const { data, error } = await admin
    .from("assets")
    .insert({
      hub_id: hubId,
      display_name: displayName,
      created_at: createdAt,
    })
    .select("id")
    .single();

  if (error) throw error;
  createdAssetIds.push(data.id);
  return data.id;
}

describe("ListAssetsForHub", () => {
  test("01 - operator sees Hub One assets newest first and not Hub Three", async () => {
    const hubThreeAssetId = await insertAsset(
      HUB_THREE_ID,
      "Vitest Hub Three Asset",
      "2099-01-02T00:00:00.000Z",
    );
    const olderHubOneAssetId = await insertAsset(
      HUB_ONE_ID,
      "Vitest Older Hub One Asset",
      "2099-01-01T00:00:00.000Z",
    );
    const newerHubOneAssetId = await insertAsset(
      HUB_ONE_ID,
      "Vitest Newer Hub One Asset",
      "2099-01-03T00:00:00.000Z",
    );

    const client = await signedInClient(OPERATOR_EMAIL);
    const assets = await ListAssetsForHub(client, HUB_ONE_ID);
    const ids = assets.map((asset) => asset.id);
    const olderIndex = ids.indexOf(olderHubOneAssetId);

    expect(assets[0]).toMatchObject({
      id: newerHubOneAssetId,
      display_name: "Vitest Newer Hub One Asset",
    });
    expect(olderIndex).toBeGreaterThan(0);
    expect(ids).not.toContain(hubThreeAssetId);
  });

  test("02 - tenant sees Hub One assets and no Hub Three assets", async () => {
    const hubThreeAssetId = await insertAsset(
      HUB_THREE_ID,
      "Vitest Hub Three Asset",
      "2099-01-02T00:00:00.000Z",
    );
    const hubOneAssetId = await insertAsset(
      HUB_ONE_ID,
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

  test("03 - hub user sees Hub One assets and no Hub Two assets", async () => {
    const hubTwoAssetId = await insertAsset(
      HUB_TWO_ID,
      "Vitest Hub Two Asset",
      "2099-01-02T00:00:00.000Z",
    );
    const hubOneAssetId = await insertAsset(
      HUB_ONE_ID,
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
