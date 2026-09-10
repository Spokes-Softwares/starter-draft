"use client";

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
import spokesLogo from "../../../../../packages/ui/src/components/images/spokesLogo.png";
import { signIn } from "@/actions/sign-in.action";

export default function LoginPage() {
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

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-6">
      <Header image={spokesLogo.src} />
        <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign in here</CardTitle>
          <CardDescription>Access your Spokes tenant portal.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            {error ? (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            ) : null}
            <Button type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
