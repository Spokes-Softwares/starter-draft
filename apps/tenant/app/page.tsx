import Link from "next/link";
import { createClient } from "@repo/db/server";
import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-8">
      <Badge variant="destructive">Spokes Tenant Portal</Badge>
      {user ? (
        <p className="text-sm text-muted-foreground">Signed in as {user.email}</p>
      ) : (
        <p className="text-sm text-muted-foreground">You are not signed in.</p>
      )}
      <Link href="/login">
        <Button>{user ? "Switch account" : "Sign in"}</Button>
      </Link>
    </main>
  );
}
