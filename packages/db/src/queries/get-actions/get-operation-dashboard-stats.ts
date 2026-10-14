/* Gets count of all tenants + hubs + assets */

import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "../../types";

export type DashboardStats = {
  numberOfAssets: number;
  numberOfTenants: number;
  numberOfHubs: number;
};

export async function getOperationDashboardStats(
  client: SupabaseClient<Database>,
): Promise<DashboardStats> {
  const [numberOfAssets, numberOfTenants, numberOfHubs] = await Promise.all([
    client.from("assets").select("*", { count: "exact", head: true }),
    client.from("tenants").select("*", { count: "exact", head: true }),
    client.from("hub_users").select("*", { count: "exact", head: true }),
  ]);

  return {
    numberOfAssets: numberOfAssets.count ?? 0,
    numberOfTenants: numberOfTenants.count ?? 0,
    numberOfHubs: numberOfHubs.count ?? 0,
  };
}
