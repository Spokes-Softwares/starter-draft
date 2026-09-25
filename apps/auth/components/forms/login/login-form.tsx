"use client";

import { signIn } from "@/actions/sign-in-action";
import { useState } from "react";

import { Button } from "@repo/ui/components/shadcn-ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/shadcn-ui/card";
import { Input } from "@repo/ui/components/shadcn-ui/input";
import { Field, FieldLabel } from "@repo/ui/components/shadcn-ui/field";
import Link from "next/link";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@repo/ui/components/shadcn-ui/alert";
import { InfoIcon } from "lucide-react";
import { loginFormSchema, LoginFormValues } from "../schemas/auth-schemas";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleLogin(values: LoginFormValues) {
    setLoading(true);
    setError(null);

    const result = await signIn(values);
    setLoading(false);

    if (result?.error) setError(result.error);
  }

  return (
    <form onSubmit={form.handleSubmit(handleLogin)} className="grid gap-4">
      <CardHeader>
        <CardTitle>Sign in here</CardTitle>
        <CardDescription>Access your Spokes portal.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="grid gap-2" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                {...field}
                id="email"
                type="text"
                name="email"
                autoComplete="email"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && (
                <Alert
                  variant="destructive"
                  className="bg-destructive/10 border-destructive/20"
                >
                  <InfoIcon />
                  <AlertDescription>
                    {fieldState.error?.message}
                  </AlertDescription>
                </Alert>
              )}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="grid gap-2">
              <div className="flex items-center">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Link
                  className="text-xs ml-auto underline"
                  href={`/auth/forgot-password`}
                >
                  Forgot Password
                </Link>
              </div>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                id="password"
                type="password"
                name="password"
              />
              {fieldState.error && (
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
            className="bg-destructive/10 border-destructive/20"
          >
            <InfoIcon />
            <AlertTitle>An error occurred</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : null}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </CardContent>
    </form>
  );
}
