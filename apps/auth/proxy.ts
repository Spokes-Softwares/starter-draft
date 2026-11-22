import { updateSession } from "@repo/db/middleware";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip session refresh on confirm so updateSession does not overwrite the
  // Set-Cookie from the OTP redirect response.
  // basePath is stripped from pathname, so the public URL /auth/confirm is /confirm here.
  if (pathname === "/confirm" || pathname.startsWith("/confirm/")) {
    return NextResponse.next();
  }

  const { response } = await updateSession(request);
  return response;
}

export const config = {
  matcher: [
    "/",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
