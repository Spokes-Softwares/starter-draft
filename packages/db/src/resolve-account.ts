/* This is where the prospected logged in users account gets resolved.*/

import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "./types";

//Account types:
export type AccountKind = "operator" | "tenant" | "hub";
export type AccountError = {
  message: string;
};

/** Local `pnpm dev` overrides. Ignored on Vercel so previews stay on the deployment host. */
function localPortalEnv(value: string | undefined) {
  if (process.env.VERCEL) return undefined;
  return value;
}

function withPortalUrl(
  envUrl: string | undefined,
  origin: string | undefined,
  path: string,
) {
  const override = localPortalEnv(envUrl);
  if (override) return override;
  if (!origin) return undefined;
  return `${origin.replace(/\/$/, "")}${path}`;
}

/** Auth origin for local multi-port dev. Unset on Vercel. */
export function configuredAuthOrigin() {
  return localPortalEnv(process.env.AUTH_URL);
}

/** Host from a request or `headers()`, used when portal env URLs are unset. */
export function originFromHeaders(headerList: {
  get(name: string): string | null;
}) {
  const host = headerList.get("x-forwarded-host") ?? headerList.get("host");
  if (!host) return undefined;
  const proto = headerList.get("x-forwarded-proto") ?? "http";
  return `${proto}://${host}`;
}

/**
 * Public portal origins. `OPERATIONS_URL`, `TENANT_URL`, and `HUB_URL` are
 * local multi-port overrides. On Vercel leave them unset so redirects stay on
 * the deployment host under the public path.
 */
export function accountDestinations(origin?: string) {
  return {
    operator: withPortalUrl(process.env.OPERATIONS_URL, origin, "/operations"),
    tenant: withPortalUrl(process.env.TENANT_URL, origin, "/tenant"),
    hub: withPortalUrl(process.env.HUB_URL, origin, "/hubs"),
  } as const;
}

/** Public login URL. `AUTH_URL` is the auth origin for local multi-port dev. */
export function authLoginUrl(origin?: string) {
  const base = (configuredAuthOrigin() ?? origin)?.replace(/\/$/, "");
  if (!base) return undefined;
  return `${base}/auth/login`;
}

//Resolve the accounts being logged in
export async function resolveAccountKind(
  supabase: SupabaseClient<Database>,
  userId: string,
): Promise<AccountKind | AccountError> {
  const { data: profile } = await supabase
    .from("profiles")
    .select("is_operator")
    .eq("id", userId)
    .single();

  if (profile?.is_operator) return "operator";

  const { data: tenant } = await supabase
    .from("tenant_users")
    .select("id")
    .eq("user_id", userId)
    .limit(1)
    .maybeSingle();

  if (tenant) return "tenant";

  const { data: hub } = await supabase
    .from("hub_users")
    .select("id")
    .eq("user_id", userId)
    .limit(1)
    .maybeSingle();

  if (hub) return "hub";

  return { message: "Invalid login credentials" } as AccountError;
}
