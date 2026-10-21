/* Lists all hubs from a specific tenant when passed the tenant_id */

import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Tables } from "../../types";

export type ListHubs = Tables<"tenant_hubs">;

export async function listHubsForTenant(
  client: SupabaseClient<Database>,
  tenantId: string,
): Promise<ListHubs[]> {
  const { data: listHubs } = await client
    .from("tenant_hubs")
    .select("*")
    .eq("tenant_id", tenantId)
    .throwOnError();

  return listHubs;
}
