"use client";

import resetPasswordAction from "@/actions/reset-password-action";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@repo/ui/components/shadcn-ui/alert";
import { Button } from "@repo/ui/components/shadcn-ui/button";
import {
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/shadcn-ui/card";
import { Field, FieldLabel } from "@repo/ui/components/shadcn-ui/field";
import { Input } from "@repo/ui/components/shadcn-ui/input";
import { AlertCircleIcon, InfoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  resetPasswordFormSchema,
  ResetPasswordValues,
} from "../schemas/auth-schemas";
import { zodResolver } from "@hookform/resolvers/zod";

export default function ResetPasswordForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      password: "",
      confirm: "",
    },
  });

  async function handleResetPassword(values: ResetPasswordValues) {
    setLoading(true);
    setError(null);

    const result = await resetPasswordAction(values);
    setLoading(false);

    if (result?.error) {
      setError(result.error);
      return;
    }

    router.push("/auth/login");
    router.refresh();
  }

  return (
    <form
      onSubmit={form.handleSubmit(handleResetPassword)}
      className="grid gap-4"
    >
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="initial-password">New Password</FieldLabel>
              <Input
                {...field}
                className="rounded-md"
                id="initial-password"
                placeholder="New password"
                type="password"
              />
              {fieldState.invalid && (
                <Alert
                  variant="destructive"
                  className="bg-destructive/10 border-destructive/20"
                >
                  <InfoIcon />
                  <AlertTitle>{fieldState.error?.message}</AlertTitle>
                </Alert>
              )}
            </Field>
          )}
        />
        <Controller
          name="confirm"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input
                {...field}
                className="rounded-md"
                id="confirm-password"
                placeholder="Confirm password"
                type="password"
              />
              {fieldState.invalid && (
                <Alert
                  variant="destructive"
                  className="bg-destructive/10 border-destructive/20"
                >
                  <InfoIcon />
                  <AlertTitle>{fieldState.error?.message}</AlertTitle>
                </Alert>
              )}
            </Field>
          )}
        />
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
