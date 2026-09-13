"use server";

import {
  accountDestinations,
  resolveAccountKind,
} from "@repo/db/resolve-account";
import { createClient } from "@repo/db/server";
import { redirect } from "next/navigation";

export async function signIn(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const supabase = await createClient();

  // Sign in using supabase auth helper
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: error.message };

  //get the user data back from the logged in user
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Signed in but no user was returned" };

  //resolve the kind of account that is being logged in and where the destination is
  const kind = await resolveAccountKind(supabase, user.id);
  const destination = kind ? accountDestinations()[kind] : null;

  //if no valid destination - sign the user out
  if (!destination) {
    await supabase.auth.signOut();
    return { error: "This account is not assigned to a portal" };
  }

  redirect(destination);
}
