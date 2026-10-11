/* Lists all hubs from a specific tenant when passed the tenant_id */

import { createSupabaseServerClient } from "../../server";
import { Tables } from "../../types";

export type ListHubs = Tables<"tenant_hubs">;

export async function listHubsForTenant(tenantId: string): Promise<ListHubs[]> {
  const supabase = await createSupabaseServerClient();

  const { data: listHubs } = await supabase
    .from("tenant_hubs")
    .select("*")
    .eq("tenant_id", tenantId)
    .throwOnError();

  return listHubs;
}
