import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "../../types";

export type TenantAssets = {
  created_at: string;
  display_name: string | null;
  hub_id: string;
  id: string;
  tenant_hubs: {
    display_name: string;
    tenant_id: string;
  };
};

export async function listAssetsForTenant(
  client: SupabaseClient<Database>,
  tenantId: string,
): Promise<TenantAssets[]> {
  const { data } = await client
    .from("assets")
    .select(
      "id, display_name, hub_id, created_at, tenant_hubs!inner(tenant_id, display_name)",
    )
    .eq("tenant_hubs.tenant_id", tenantId)
    .order("created_at", { ascending: false })
    .order("id", { ascending: false })
    .throwOnError();

  return data;
}
