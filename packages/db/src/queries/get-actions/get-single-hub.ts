import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../../types";
import { Hub } from "./types";

export async function getSingleHubDetails(
  client: SupabaseClient<Database>,
  hubId: string,
): Promise<Hub | null> {
  const { data } = await client
    .from("tenant_hubs")
    .select(
      "id, display_name, tenant_id, created_at, tenants!inner(company_name, display_name), assets(count)",
    )
    .eq("id", hubId)
    .single()
    .throwOnError();

  return data;
}
