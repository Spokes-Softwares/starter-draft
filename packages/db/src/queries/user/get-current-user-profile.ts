import type { SupabaseClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import type { Database } from "../../types";

export type CurrentUserProfile = {
  name: string;
  email: string;
  avatarUrl?: string;
  phone?: string;
  displayName?: string;
  tenantId: string | null;
};

export default async function getCurrentUserProfile(
  client: SupabaseClient<Database>,
): Promise<CurrentUserProfile> {
  const {
    data: { user },
  } = await client.auth.getUser();

  if (!user) {
    const authUrl = process.env.AUTH_URL;
    if (!authUrl) throw new Error("AUTH_URL not set in env");
    redirect(authUrl);
  }

  const { data: tenantDetails } = await client
    .from("tenant_users")
    .select("tenant_id")
    .eq("user_id", user.id)
    .maybeSingle()
    .throwOnError();

  return {
    name: user.user_metadata?.first_name ?? user?.email ?? "User",
    email: user.email ?? "",
    avatarUrl: user.user_metadata?.avatar_url,
    phone: user.phone ?? "",
    displayName: user.user_metadata.displayName ?? "",
    tenantId: tenantDetails?.tenant_id ?? null,
  };
}
