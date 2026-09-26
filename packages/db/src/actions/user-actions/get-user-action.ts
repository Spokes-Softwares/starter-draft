"use server";

import { createSupabaseServerClient } from "../../server";

export default async function getUserAction() {
  const supabase = await createSupabaseServerClient();
  const { data: user } = await supabase.auth.getUser();

  return user;
}
