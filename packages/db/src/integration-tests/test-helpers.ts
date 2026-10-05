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
