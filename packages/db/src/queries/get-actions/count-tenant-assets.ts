import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "../../types";

export async function countTenantAssets(
  client: SupabaseClient<Database>,
  tenantId: string,
): Promise<number> {
  const { count } = await client
    .from("assets")
    .select("hub_id, tenant_hubs!inner(tenant_id)", {
      count: "exact",
      head: true,
    })
    .eq("tenant_hubs.tenant_id", tenantId)
    .throwOnError();

  return count ?? 0;
}
