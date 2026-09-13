/* This is where the prospected logged in users account gets resolved.*/

import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "./types";

//Account types:
export type AccountKind = "operator" | "tenant" | "hub";

//account destinations
export function accountDestinations() {
  return {
    operator: process.env.OPERATIONS_URL,
    tenant: process.env.TENANT_URL,
    hub: process.env.HUB_URL,
  } as const;
}

//Resolve the accounts being logged in
export async function resolveAccountKind(
  supabase: SupabaseClient<Database>,
  userId: string,
): Promise<AccountKind | null> {
  const { data: profile } = await supabase
    .from("profiles")
    .select("is_operator")
    .eq("id", userId)
    .single();

  if (profile?.is_operator) return "operator";

  const { data: tenant } = await supabase
    .from("tenant_users")
    .select("id")
    .eq("user_id", userId)
    .limit(1)
    .maybeSingle();

  if (tenant) return "tenant";

  const { data: hub } = await supabase
    .from("hub_users")
    .select("id")
    .eq("user_id", userId)
    .limit(1)
    .maybeSingle();

  if (hub) return "hub";

  return null;
}
