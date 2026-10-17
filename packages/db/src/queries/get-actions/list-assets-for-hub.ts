import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "../../types";
import type { Asset } from "./types";

export async function ListAssetsForHub(
  client: SupabaseClient<Database>,
  hubId: string,
): Promise<Asset[]> {
  const { data } = await client
    .from("assets")
    .select(
      "id, display_name, hub_id, created_at, tenant_hubs!inner(tenant_id, display_name)",
    )
    .eq("hub_id", hubId)
    .order("created_at", { ascending: false })
    .throwOnError();

  return data;
}
