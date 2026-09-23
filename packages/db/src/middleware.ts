import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { CookieOptions } from "@supabase/ssr";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(
          cookiesToSet: {
            name: string;
            value: string;
            options: CookieOptions;
          }[],
        ) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  await supabase.auth.getUser();

  return { response: supabaseResponse, supabase };
}

/** Prefer Host header so 127.0.0.1 vs localhost match host-only cookies. */
function requestOrigin(request: NextRequest) {
  const host = request.headers.get("host") ?? "localhost:3010";
  const proto = request.headers.get("x-forwarded-proto") ?? "http";
  return `${proto}://${host}`;
}

export function authRedirect(request: NextRequest, path: string) {
  return NextResponse.redirect(new URL(path, requestOrigin(request)));
}

/**
 * Supabase client for Route Handlers that end in a redirect after auth
 * (e.g. email confirm / OTP). Session cookies are written onto the redirect
 * response with full options — required so the next page can getUser().
 */
export function createAuthRedirectClient(
  request: NextRequest,
  redirectPath: string,
) {
  const redirectUrl = new URL(redirectPath, requestOrigin(request));
  let response = NextResponse.redirect(redirectUrl);

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(
          cookiesToSet: {
            name: string;
            value: string;
            options: CookieOptions;
          }[],
        ) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });
          response = NextResponse.redirect(redirectUrl);
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  return {
    supabase,
    getResponse() {
      return response;
    },
  };
}

/* Copy the refreshed session onto the new response.
Otherwise the redirect drops the cookie and the next app looks logged out. */
export function redirectKeepingSession(
  url: string,
  sessionResponse: NextResponse,
) {
  const redirectResponse = NextResponse.redirect(url);

  sessionResponse.cookies.getAll().forEach((cookie) => {
    redirectResponse.cookies.set(cookie);
  });
  return redirectResponse;
}
