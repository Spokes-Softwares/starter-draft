"use client";

import {
  Card,
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

export default function ForgotPasswordForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  async function handleForgotPassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const result = await forgotPasswordAction(
      new FormData(event.currentTarget),
    );
    setLoading(false);

    if (result.error) return setError(result.error);
    setEmailSent(true);

    /* Add zod into this form  */
  }

  return (
    <Card className="w-full max-w-72 grid items-center justify-center">
      <form onSubmit={handleForgotPassword} className="grid gap-6">
        <CardHeader>
          <CardTitle>Forgot Password</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Controller here */}
          <Field className="grid gap-6">
            <FieldDescription>
              Enter your email address associated with your account and follow
              the instructions from this email.
            </FieldDescription>
            <div className="grid gap-2">
              <div className="flex">
                <FieldLabel>Email Address</FieldLabel>
                <Link
                  href={`/auth/login`}
                  className="ml-auto underline text-xs"
                >
                  Back to login
                </Link>
              </div>
              <Input
                id="email"
                type="email"
                className="rounded-md"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
          </Field>
        </CardContent>
        <CardFooter className="grid gap-6">
          <Button type="submit" className="w-full" disabled={emailSent}>
            {loading
              ? "Sending..."
              : emailSent
                ? "Email sent"
                : "Reset password"}
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
    </Card>
  );
}
