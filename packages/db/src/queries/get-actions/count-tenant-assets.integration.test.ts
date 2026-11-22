import { afterEach, describe, expect, test } from "vitest";
import {
  HUB_ONE_ID,
  HUB_THREE_ID,
  OPERATOR_EMAIL,
  TENANT_ONE_ID,
  TENANT_TWO_ID,
} from "../../integration-tests/fixtures";
import {
  deleteTestAssets,
  insertTestAsset,
  signedInClient,
} from "../../integration-tests/test-helpers";
import { countTenantAssets } from "./count-tenant-assets";

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

describe("countTenantAssets", () => {
  test("01 - operator count for Tenant One includes a Hub One asset and excludes a Tenant Two asset", async () => {
    const client = await signedInClient(OPERATOR_EMAIL);
    const before = await countTenantAssets(client, TENANT_ONE_ID);

    await insertAsset(HUB_THREE_ID, TENANT_TWO_ID, "Vitest count excluded");
    await insertAsset(HUB_ONE_ID, TENANT_ONE_ID, "Vitest count included");

    const after = await countTenantAssets(client, TENANT_ONE_ID);

    expect(after).toBe(before + 1);
  });
});
