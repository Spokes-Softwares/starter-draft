"use server";

import { createClient } from "@repo/db/server";

export async function forgotPasswordAction(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  if (!email) return { error: "Email is required" };
  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:3010/auth/reset-password",
  });

  if (error) return { error: error.message };
  return { success: true };
}
