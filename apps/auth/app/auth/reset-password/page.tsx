import ResetPasswordForm from "@/components/forms/reset-password/reset-password-form";
import { createClient } from "@repo/db/server";
import { redirect } from "next/navigation";

export default async function ResetPasswordPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/forgot-password");
  }

  return <ResetPasswordForm />;
}
