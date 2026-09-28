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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
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

  const signInText = loading ? "Signing in..." : "Sign in";

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-4">
      <CardHeader>
        <CardTitle>Sign in here</CardTitle>
        <CardDescription>Access your Spokes portal.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <Field className="grid gap-2" data-invalid={!!errors.email}>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="text"
            autoComplete="email"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && (
            <Alert
              variant="destructive"
              className="bg-destructive/10 border-destructive/20"
            >
              <InfoIcon />
              <AlertDescription>{errors.email.message}</AlertDescription>
            </Alert>
          )}
        </Field>
        <Field data-invalid={!!errors.password} className="grid gap-2">
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
            id="password"
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

        <Button type="submit" disabled={loading} className="w-full bg-black">
          <span className="text-card">{signInText}</span>
        </Button>
      </CardContent>
    </form>
  );
}
