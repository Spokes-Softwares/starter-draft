import {
  authRedirect,
  createAuthRedirectClient,
} from "@repo/db/middleware";
import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/auth/reset-password";
  const path =
    next.startsWith("/") && !next.startsWith("//")
      ? next
      : "/auth/reset-password";

  if (token_hash && type) {
    const { supabase, getResponse } = createAuthRedirectClient(request, path);
    const { error } = await supabase.auth.verifyOtp({ type, token_hash });
    if (!error) return getResponse();
  }

  return authRedirect(request, "/auth/auth-code-error");
}
