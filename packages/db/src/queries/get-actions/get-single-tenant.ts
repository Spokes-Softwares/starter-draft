/* Returns all data for a single tenant */

import { createSupabaseServerClient } from "../../server";
import { Tables } from "../../types";

export type Tenant = Tables<"tenants">;

export async function getTenant(tenant_id: string): Promise<Tenant> {
  const supabase = await createSupabaseServerClient();

  const { data: tenant } = await supabase
    .from("tenants")
    .select("*")
    .eq("id", tenant_id)
    .single()
    .throwOnError();

  return tenant;
}
