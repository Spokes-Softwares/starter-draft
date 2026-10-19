import { afterEach, describe, expect, test } from "vitest";
import {
  HUB_ONE_ID,
  HUB_THREE_ID,
  OPERATOR_EMAIL,
  TENANT_ONE_ID,
} from "../../integration-tests/fixtures";
import {
  createAdminTestClient,
  signedInClient,
} from "../../integration-tests/test-helpers";
import { countTenantAssets } from "./count-tenant-assets";

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

describe("countTenantAssets", () => {
  test("01 - count includes a Tenant One asset and excludes Tenant Two", async () => {
    const client = await signedInClient(OPERATOR_EMAIL);
    const before = await countTenantAssets(client, TENANT_ONE_ID);

    await insertAsset(HUB_THREE_ID, "Vitest count excluded");
    await insertAsset(HUB_ONE_ID, "Vitest count included");

    const after = await countTenantAssets(client, TENANT_ONE_ID);

    expect(after).toBe(before + 1);
  });
});
