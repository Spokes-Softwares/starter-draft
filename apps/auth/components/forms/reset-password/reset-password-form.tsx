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
import { useForm } from "react-hook-form";
import {
  resetPasswordFormSchema,
  ResetPasswordValues,
} from "../schemas/auth-schemas";
import { zodResolver } from "@hookform/resolvers/zod";

export default function ResetPasswordForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordValues>({
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
    <form onSubmit={handleSubmit(handleResetPassword)} className="grid gap-4">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Field data-invalid={!!errors.password}>
          <FieldLabel htmlFor="initial-password">New Password</FieldLabel>
          <Input
            id="initial-password"
            className="rounded-md"
            placeholder="New password"
            type="password"
            aria-invalid={!!errors.password}
            {...register("password")}
          />
          {errors.password && (
            <Alert
              variant="destructive"
              className="bg-destructive/10 border-destructive/20"
            >
              <InfoIcon />
              <AlertTitle>{errors.password.message}</AlertTitle>
            </Alert>
          )}
        </Field>
        <Field data-invalid={!!errors.confirm}>
          <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
          <Input
            id="confirm-password"
            className="rounded-md"
            placeholder="Confirm password"
            type="password"
            aria-invalid={!!errors.confirm}
            {...register("confirm")}
          />
          {errors.confirm && (
            <Alert
              variant="destructive"
              className="bg-destructive/10 border-destructive/20"
            >
              <InfoIcon />
              <AlertTitle>{errors.confirm.message}</AlertTitle>
            </Alert>
          )}
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
