import { accountDestinations, resolveAccountKind } from "@repo/db/resolve-account";
import { redirectKeepingSession, updateSession } from "@repo/db/middleware";
import { type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const { response, supabase } = await updateSession(request)
  const { data: { user } } = await supabase.auth.getUser()

  const authLogin = `${process.env.AUTH_URL}/auth/login`

  if (!user) {
    return redirectKeepingSession(authLogin, response)
  }

  const kind = await resolveAccountKind(supabase, user.id)
  if (kind !== "hub") {
    const destination = kind ? accountDestinations()[kind] : authLogin
    return redirectKeepingSession(destination ?? authLogin, response)
  }
  return response
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
