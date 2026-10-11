/* Returns all data from the tenants table  */

import { createSupabaseServerClient } from "../../server";
import { Tables } from "../../types";

export type Tenant = Tables<"tenants">;

export async function listAllTenants(): Promise<Tenant[]> {
  const supabase = await createSupabaseServerClient();

  const { data: listTenants } = await supabase
    .from("tenants")
    .select("*")
    .throwOnError();

  return listTenants;
}
