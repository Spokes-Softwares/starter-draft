/* Returns all data from the tenant_hubs table */

import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../../types";
import { Hub } from "./types";


export async function listAllHubs(
  client: SupabaseClient<Database>,
): Promise<Hub[]> {
  const { data: listHubs } = await client
    .from("tenant_hubs")
    .select(
      "id, display_name, tenant_id, created_at, tenants!inner(company_name, display_name), assets(count)",
    )
    .throwOnError();

  return listHubs;
}
