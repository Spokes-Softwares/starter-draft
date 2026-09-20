"use client";

import resetPasswordAction from "@/actions/reset-password-action";
import { Alert, AlertDescription } from "@repo/ui/components/shadcn-ui/alert";
import { Button } from "@repo/ui/components/shadcn-ui/button";
import {
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/shadcn-ui/card";
import { Field, FieldLabel } from "@repo/ui/components/shadcn-ui/field";
import { Input } from "@repo/ui/components/shadcn-ui/input";
import { AlertCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ResetPasswordForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleResetPassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const password = String(formData.get("initial-password") ?? "");
    const confirmPassword = String(formData.get("confirm-password") ?? "");

    if (!password || !confirmPassword) {
      setError("Please enter and confirm your new password");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    const result = await resetPasswordAction(password);
    setLoading(false);

    if (result?.error) {
      setError(result.error);
      return;
    }

    router.push("/auth/login");
    router.refresh();
  }

  return (
    <form onSubmit={handleResetPassword} className="grid gap-4">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
      </CardHeader>
      <CardContent className="grid">
        <Field>
          <FieldLabel htmlFor="initial-password">New Password</FieldLabel>
          <Input
            className="rounded-md"
            id="initial-password"
            name="initial-password"
            placeholder="New password"
            type="password"
            autoComplete="new-password"
            required
            minLength={6}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
          <Input
            className="rounded-md"
            id="confirm-password"
            name="confirm-password"
            placeholder="Confirm password"
            type="password"
            autoComplete="new-password"
            required
            minLength={6}
          />
        </Field>
        {error ? (
          <Alert
            variant="destructive"
            className="bg-destructive/10 border-destructive/50"
          >
            <AlertCircleIcon />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : null}
        <Button className="w-full" type="submit" disabled={loading}>
          {loading ? "Saving..." : "Confirm"}
        </Button>
      </CardContent>
    </form>
  );
}
