/* Lists all hubs from a specific tenant when passed the tenant_id */

import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "../../types";
import { Hub } from "./types";



export async function listHubsForTenant(
  client: SupabaseClient<Database>,
  tenantId: string,
): Promise<Hub[]> {
  const { data: listHubs } = await client
    .from("tenant_hubs")
    .select("id, display_name, tenant_id, created_at, tenants!inner(company_name, display_name), assets(count)")
    .eq("tenant_id", tenantId)
    .throwOnError();

  return listHubs;
}
