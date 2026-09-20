"use client";

import { signIn } from "@/actions/sign-in-action";
import { useState } from "react";

import { Button } from "@repo/ui/components/shadcn-ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/shadcn-ui/card";
import { Input } from "@repo/ui/components/shadcn-ui/input";
import { Label } from "@repo/ui/components/shadcn-ui/label";
import Header from "@repo/ui/components/composites-ui/header";
import spokesLogo from "@repo/ui/assets/spokesLogo.png";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@repo/ui/components/shadcn-ui/field";
import Link from "next/link";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const result = await signIn(new FormData(event.currentTarget));

    setLoading(false);

    if (result?.error) setError(result.error);
  }
  /* Add zod to this form */
  return (
      <Card className="w-full max-w-72 grid items-center justify-center">
        <CardHeader>
          <CardTitle>Sign in here</CardTitle>
          <CardDescription>Access your Spokes portal.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <Field className="flex flex-col gap-2">
              {/* Controller here */}
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </Field>
            <Field className="flex flex-col gap-2">
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
                name="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </Field>
            {error ? (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            ) : null}
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </CardContent>
      </Card>
  );
}
