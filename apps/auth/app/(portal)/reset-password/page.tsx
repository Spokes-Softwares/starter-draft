import ResetPasswordForm from "@/components/forms/reset-password/reset-password-form";
import { createSupabaseServerClient } from "@repo/db/server";
import { redirect } from "next/navigation";

export default async function ResetPasswordPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/forgot-password");
  }

  return <ResetPasswordForm />;
}
