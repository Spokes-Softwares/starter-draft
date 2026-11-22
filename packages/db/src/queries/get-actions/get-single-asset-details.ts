import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "../../types";
import type { AssetDetails } from "./types";

export async function getSingleAssetDetails(
  asset_id: string,
  client: SupabaseClient<Database>,
): Promise<AssetDetails> {
  const { data } = await client
    .from("assets")
    .select(
      "id, created_at, service_status, reference_tag, hub_id, asset_types!inner(asset_type), maintenance_records(id, created_at, created_by, metadata, parts, service_type, service_types(type_name))",
    )
    .eq("id", asset_id)
    .order("created_at", {
      referencedTable: "maintenance_records",
      ascending: false,
    })
    .limit(1, { referencedTable: "maintenance_records" })
    .single()
    .throwOnError();

  const { maintenance_records, ...asset } = data;

  return {
    ...asset,
    latest_maintenance_record: maintenance_records[0] ?? null,
  };
}
