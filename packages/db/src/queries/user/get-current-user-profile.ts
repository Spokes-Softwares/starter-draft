import { createSupabaseServerClient } from "../../server";
import { redirect } from "next/navigation";

export type CurrentUserProfile = {
  name: string;
  email: string;
  avatarUrl?: string;
};

export default async function getCurrentUserProfile(): Promise<CurrentUserProfile> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const authUrl = process.env.AUTH_URL;
    if (!authUrl) throw new Error("AUTH_URL not set in env");
    redirect(authUrl);
  }

  return {
    name: user?.user_metadata?.first_name ?? user?.email ?? "User",
    email: user?.email ?? "",
    avatarUrl: user?.user_metadata?.avatar_url,
  };
}
