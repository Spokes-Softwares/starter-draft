"use client";

import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/shadcn-ui/card";
import { useState } from "react";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@repo/ui/components/shadcn-ui/field";
import { Input } from "@repo/ui/components/shadcn-ui/input";
import { forgotPasswordAction } from "@/actions/forgot-password-action";
import Link from "next/link";
import { Button } from "@repo/ui/components/shadcn-ui/button";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@repo/ui/components/shadcn-ui/alert";
import { InfoIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailFormSchema, EmailFormValues } from "../schemas/auth-schemas";

export default function ForgotPasswordForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormValues>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function handleForgotPassword(data: EmailFormValues) {
    setLoading(true);
    setError(null);
    const result = await forgotPasswordAction(data);
    setLoading(false);

    if (result.error) return setError(result.error);
    setEmailSent(true);
  }

  return (
    <form onSubmit={handleSubmit(handleForgotPassword)} className="grid gap-6">
      <CardHeader>
        <CardTitle>Forgot Password</CardTitle>
      </CardHeader>
      <CardContent>
        <Field className="grid gap-6" data-invalid={!!errors.email}>
          <FieldDescription>
            Enter your email address associated with your account and follow the
            instructions from this email.
          </FieldDescription>
          <div className="grid gap-2">
            <div className="flex">
              <FieldLabel htmlFor="email-address">Email Address</FieldLabel>
              <Link
                href={`/auth/login`}
                className="ml-auto underline text-xs"
              >
                Back to login
              </Link>
            </div>
            <Input
              id="email-address"
              type="text"
              className="rounded-md"
              autoComplete="email"
              aria-invalid={!!errors.email}
              {...register("email")}
            />
          </div>
          {errors.email && (
            <Alert
              variant="destructive"
              className="bg-destructive/10 border-destructive/20"
            >
              <InfoIcon />
              <AlertTitle>{errors.email.message}</AlertTitle>
            </Alert>
          )}
        </Field>
      </CardContent>
      <CardFooter className="grid gap-6">
        <Button type="submit" className="w-full" disabled={emailSent}>
          {loading ? "Sending..." : emailSent ? "Email sent" : "Reset password"}
        </Button>
        {error || emailSent ? (
          <Alert>
            <InfoIcon />
            <AlertTitle>Please note</AlertTitle>
            <AlertDescription>
              {error
                ? error
                : "Emails will not be sent to unassociated accounts"}
            </AlertDescription>
          </Alert>
        ) : null}
      </CardFooter>
    </form>
  );
}
