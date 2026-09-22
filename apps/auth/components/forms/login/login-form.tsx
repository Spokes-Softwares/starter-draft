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
    <form onSubmit={handleLogin} className="grid gap-4">
      <CardHeader>
        <CardTitle>Sign in here</CardTitle>
        <CardDescription>Access your Spokes portal.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <Field className="grid gap-2">
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
        <Field className="grid gap-2">
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
          <Alert
            variant="destructive"
            className="border-desetructive/50 bg-destructive/20"
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
