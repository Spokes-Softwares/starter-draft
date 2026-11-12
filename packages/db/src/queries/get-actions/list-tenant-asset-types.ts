import { SupabaseClient } from "@supabase/supabase-js";
import { Database, Tables } from "../../types";

export type TenantAssetTypeCount = Tables<"tenant_asset_types">;

export async function listTenantAssetTypes(
  client: SupabaseClient<Database>,
  tenantId: string,
): Promise<TenantAssetTypeCount[]> {
  const query = client
    .from("tenant_asset_types")
    .select("tenant_id, display_name, company_name, asset_type, asset_count")
    .order("company_name");

  const { data } = tenantId
    ? await query.eq("tenant_id", tenantId).throwOnError()
    : await query.throwOnError();

  return data;
}
