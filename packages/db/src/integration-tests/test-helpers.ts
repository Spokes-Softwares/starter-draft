import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { createAdminClient } from "../admin";
import type { Database } from "../types";
import { SEED_PASSWORD } from "./fixtures";

export type TestClient = SupabaseClient<Database>;

export function createTestClient(): TestClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY environment variables.",
    );
  }

  //Allow the tests to connect to the DB. RLS checking.
  return createClient<Database>(url, publishableKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

//Use admin client to delete the new rows from the tests. Clean up basically.
export function createAdminTestClient(): TestClient {
  return createAdminClient();
}

export async function signInAs(client: TestClient, email: string) {
  const { error } = await client.auth.signInWithPassword({
    email,
    password: SEED_PASSWORD,
  });
  if (error) throw error;
}

export async function signedInClient(email: string) {
  const client = createTestClient();
  await signInAs(client, email);
  return client;
}

export async function insertTestAsset(input: {
  hubId: string;
  tenantId: string;
  referenceTag: string;
  createdAt?: string;
  serviceStatus?: string;
}) {
  const admin = createAdminTestClient();
  const { data: assetType, error: assetTypeError } = await admin
    .from("asset_types")
    .insert({
      tenant_id: input.tenantId,
      asset_type: input.referenceTag,
    })
    .select("id")
    .single();

  if (assetTypeError) throw assetTypeError;

  const { data, error } = await admin
    .from("assets")
    .insert({
      hub_id: input.hubId,
      reference_tag: input.referenceTag,
      asset_type: assetType.id,
      service_status: input.serviceStatus ?? "in service",
      ...(input.createdAt ? { created_at: input.createdAt } : {}),
    })
    .select("id")
    .single();

  if (error) {
    await admin.from("asset_types").delete().eq("id", assetType.id);
    throw error;
  }

  return { assetId: data.id, assetTypeId: assetType.id };
}

export async function deleteTestAssets(
  assetIds: string[],
  assetTypeIds: string[],
) {
  if (assetIds.length === 0 && assetTypeIds.length === 0) return;

  const admin = createAdminTestClient();
  if (assetIds.length > 0) {
    await admin.from("assets").delete().in("id", assetIds);
    assetIds.length = 0;
  }
  if (assetTypeIds.length > 0) {
    await admin.from("asset_types").delete().in("id", assetTypeIds);
    assetTypeIds.length = 0;
  }
}

export async function rpcIsOperator(client: TestClient) {
  const { data, error } = await client.rpc("is_operator");
  if (error) throw error;
  return data;
}

export async function rpcIsTenant(client: TestClient, tenantId: string) {
  const { data, error } = await client.rpc("is_tenant", {
    p_tenant_id: tenantId,
  });
  if (error) throw error;
  return data;
}

export async function rpcIsHubUser(client: TestClient, hubId: string) {
  const { data, error } = await client.rpc("is_hub_user", { p_hub_id: hubId });
  if (error) throw error;
  return data;
}

export async function rpcIsHubTenant(client: TestClient, hubId: string) {
  const { data, error } = await client.rpc("is_hub_tenant", {
    p_hub_id: hubId,
  });
  if (error) throw error;
  return data;
}
