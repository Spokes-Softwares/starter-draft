"use server";

import {
  emailFormSchema,
  EmailFormValues,
} from "@/components/forms/schemas/auth-schemas";
import { createSupabaseServerClient } from "@repo/db/server";

export async function forgotPasswordAction(data: EmailFormValues) {
  const parsed = emailFormSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const { email } = parsed.data;
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:3010/auth/reset-password",
  });

  if (error) return { error: error.message };
  return { success: true };
}
