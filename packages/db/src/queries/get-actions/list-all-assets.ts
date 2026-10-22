import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../../types";
import { Asset } from "./types";

export async function listAllAssets(
  client: SupabaseClient<Database>,
): Promise<Asset[]> {
  const { data } = await client
    .from("assets")
    .select(
      "id, reference_tag, asset_type, hub_id, service_status, created_at, tenant_hubs!inner(tenant_id, display_name)",
    )
    .throwOnError();

  console.log(data.length);
  return data;
}
