"use server";
import {
  authLoginUrl,
  configuredAuthOrigin,
  originFromHeaders,
} from "@repo/db/resolve-account";
import { createSupabaseServerClient } from "@repo/db/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function signOutAction() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();

  const authUrl =
    configuredAuthOrigin() ?? authLoginUrl(originFromHeaders(await headers()));
  if (!authUrl) throw Error("AUTH_URL not set in env");

  redirect(authUrl);
}
