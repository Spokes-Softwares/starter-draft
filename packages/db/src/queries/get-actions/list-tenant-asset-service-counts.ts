import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Tables } from "../../types";

export type TenantAssetServiceCount = Tables<"tenant_asset_service_counts">;

export async function listTenantAssetServiceCounts(
  client: SupabaseClient<Database>,
  tenantId?: string,
): Promise<TenantAssetServiceCount[]> {
  const query = client
    .from("tenant_asset_service_counts")
    .select(
      "tenant_id, display_name, company_name, service_status, asset_count",
    )
    .order("company_name");

  const { data } = tenantId
    ? await query.eq("tenant_id", tenantId).throwOnError()
    : await query.throwOnError();

  return data;
}
