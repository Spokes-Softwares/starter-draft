/* Returns all data from the tenants table  */

import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Tables } from "../../types";

export type Tenant = Tables<"tenants">;

export async function listAllTenants(
  client: SupabaseClient<Database>,
): Promise<Tenant[]> {
  const { data: listTenants } = await client
    .from("tenants")
    .select("*")
    .throwOnError();

  return listTenants;
}
