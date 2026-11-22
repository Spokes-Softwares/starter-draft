"use server";

import {
  emailFormSchema,
  EmailFormValues,
} from "@/components/forms/schemas/auth-schemas";
import {
  configuredAuthOrigin,
  originFromHeaders,
} from "@repo/db/resolve-account";
import { createSupabaseServerClient } from "@repo/db/server";
import { headers } from "next/headers";

export async function forgotPasswordAction(data: EmailFormValues) {
  const parsed = emailFormSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const { email } = parsed.data;
  const supabase = await createSupabaseServerClient();

  const origin =
    configuredAuthOrigin()?.replace(/\/$/, "") ??
    originFromHeaders(await headers());
  if (!origin) return { error: "AUTH_URL not set in env" };

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/reset-password`,
  });

  if (error) return { error: error.message };
  return { success: true };
}
