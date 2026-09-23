"use server";

import { createSupabaseServerClient } from "@repo/db/server";

export default async function resetPasswordAction(password: string) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Your reset session expired. Request a new reset email." };
  }

  const { error } = await supabase.auth.updateUser({ password });
  if (error) return { error: error.message };

  await supabase.auth.signOut();
  return { success: true as const };
}
