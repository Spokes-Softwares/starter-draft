import { updateSession, redirectKeepingSession } from "@repo/db/middleware";
import {
  accountDestinations,
  resolveAccountKind,
} from "@repo/db/resolve-account";
import { type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const { response, supabase } = await updateSession(request);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const authLogin = `${process.env.AUTH_URL}/auth/login`;

  if (!user) {
    return redirectKeepingSession(authLogin, response);
  }

  const accountType = await resolveAccountKind(supabase, user.id);
  if (accountType === "operator") {
    return response;
  }

  const destination =
    typeof accountType === "string"
      ? accountDestinations()[accountType]
      : authLogin;
  return redirectKeepingSession(destination ?? authLogin, response);
}
