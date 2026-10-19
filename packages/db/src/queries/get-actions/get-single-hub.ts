import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "../../types";
import type { tenantHub } from "./types";

export async function getSingleHubDetails(
  client: SupabaseClient<Database>,
  hubId: string,
): Promise<tenantHub | null> {
  const { data } = await client
    .from("tenant_hubs")
    .select("id, display_name, tenant_id, created_at, assets(count)")
    .eq("id", hubId)
    .single()
    .throwOnError();

  return data;
}
