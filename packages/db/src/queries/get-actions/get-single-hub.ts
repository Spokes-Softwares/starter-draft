import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../../types";

export type SingleHub = {
  id: string;
  display_name: string;
  tenant_id: string;
  created_at: string;
};

export async function getSingleHubDetails(
  client: SupabaseClient<Database>,
  hubId: string,
): Promise<SingleHub | null> {
  const { data } = await client
    .from("tenant_hubs")
    .select("*")
    .eq("id", hubId)
    .single()
    .throwOnError();

  return data;
}
