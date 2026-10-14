/* Returns all data for a single tenant */

import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Tables } from "../../types";

export type Tenant = Tables<"tenants">;

export async function getTenant(
  client: SupabaseClient<Database>,
  tenant_id: string,
): Promise<Tenant> {
  const { data: tenant } = await client
    .from("tenants")
    .select("*")
    .eq("id", tenant_id)
    .single()
    .throwOnError();

  return tenant;
}
