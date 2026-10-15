import { SupabaseClient } from "@supabase/supabase-js";
import { Database, Tables } from "../../types";

export type Assets = Pick<
  Tables<"assets">,
  "id" | "display_name" | "created_at"
>;

export async function ListAssetsForHub(
  client: SupabaseClient<Database>,
  hubId: string,
): Promise<Assets[]> {
  const { data } = await client
    .from("assets")
    .select("id, display_name, created_at")
    .eq("hub_id", hubId)
    .order("created_at", { ascending: false })
    .throwOnError();

  return data;
}
