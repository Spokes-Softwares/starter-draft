"use server";

import {
  resetPasswordFormSchema,
  ResetPasswordValues,
} from "@/components/forms/schemas/auth-schemas";
import { createSupabaseServerClient } from "@repo/db/server";

export default async function resetPasswordAction(values: ResetPasswordValues) {
  const parsed = resetPasswordFormSchema.safeParse(values);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const password = parsed.data.password;

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
