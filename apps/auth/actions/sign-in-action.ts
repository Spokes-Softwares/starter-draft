"use server";

import {
  loginFormSchema,
  LoginFormValues,
} from "@/components/forms/schemas/auth-schemas";
import {
  accountDestinations,
  resolveAccountKind,
} from "@repo/db/resolve-account";
import { createSupabaseServerClient } from "@repo/db/server";
import { redirect } from "next/navigation";

export async function signIn(data: LoginFormValues) {
  const parsed = loginFormSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const { email } =  parsed.data;
  const { password }  = parsed.data;
  const supabase = await createSupabaseServerClient();

  // Sign in using supabase auth helper
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: error.message };

  //get the user data back from the logged in user
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Signed in but no user was returned" };

  //resolve the kind of account that is being logged in and where the destination is
  const accountType = await resolveAccountKind(supabase, user.id);

  if (typeof accountType !== "string") {
    await supabase.auth.signOut();
    return { error: accountType.message };
  }

  const destination = accountDestinations()[accountType];

  //if no valid destination - sign the user out
  if (!destination) {
    await supabase.auth.signOut();
    return { error: "This account is not assigned to a portal" };
  }

  redirect(destination);
}
