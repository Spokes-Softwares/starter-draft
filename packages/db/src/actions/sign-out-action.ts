"use server";
import { createSupabaseServerClient } from "@repo/db/server";
import { redirect } from "next/navigation";

export default async function signOutAction() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();

  const AUTH_APP_URL = process.env.AUTH_URL;
  if (!AUTH_APP_URL) throw Error("AUTH_APP_URL not set in env");

  redirect(AUTH_APP_URL);
}
