/* Gets count of all tenants + hubs + assets */

import { createSupabaseServerClient } from "../../server";

export type DashboardStats = {
  numberOfAssets: number;
  numberOfTenants: number;
  numberOfHubs: number;
};

export async function getOperationDashboardStats(): Promise<DashboardStats> {
  const supabase = await createSupabaseServerClient();

  const [numberOfAssets, numberOfTenants, numberOfHubs] = await Promise.all([
    supabase.from("assets").select("*", { count: "exact", head: true }),
    supabase.from("tenants").select("*", { count: "exact", head: true }),
    supabase.from("hub_users").select("*", { count: "exact", head: true }),
  ]);

  return {
    numberOfAssets: numberOfAssets.count ?? 0,
    numberOfTenants: numberOfTenants.count ?? 0,
    numberOfHubs: numberOfHubs.count ?? 0,
  };
}
