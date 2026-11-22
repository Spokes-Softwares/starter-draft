import {
  redirectKeepingSession,
  requestOrigin,
  updateSession,
} from "@repo/db/middleware";
import {
  accountDestinations,
  authLoginUrl,
  resolveAccountKind,
} from "@repo/db/resolve-account";
import { type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const { response, supabase } = await updateSession(request);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const origin = requestOrigin(request);
  const authLogin = authLoginUrl(origin) ?? `${origin}/auth/login`;

  if (!user) {
    return redirectKeepingSession(authLogin, response);
  }

  const accountType = await resolveAccountKind(supabase, user.id);
  if (accountType === "operator") {
    return response;
  }

  const destination =
    typeof accountType === "string"
      ? accountDestinations(origin)[accountType]
      : authLogin;
  return redirectKeepingSession(destination ?? authLogin, response);
}
