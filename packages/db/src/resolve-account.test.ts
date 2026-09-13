import { createClient } from "@supabase/supabase-js";
import { test, describe, expect } from "vitest";
import type { Database } from "./types";
import { resolveAccountKind } from "./resolve-account";
import {
  HUB_EMAIL,
  HUB_ID,
  OPERATOR_EMAIL,
  OPERATOR_ID,
  SEED_PASSWORD,
  TENANT_EMAIL,
  TENANT_ID,
  UNKNOWN_ID,
} from "./integration-tests/fixtures";

function createTestClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY environment variables.",
    );
  }

  return createClient<Database>(url, publishableKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

const supabase = createTestClient();

async function signIn(seedEmail: string) {
  const { error } = await supabase.auth.signInWithPassword({
    email: seedEmail,
    password: SEED_PASSWORD,
  });
  if (error) throw error;
}

describe("Testing of: resolveAccountKind", () => {
  test("Integration Test 01: Operator", async () => {
    await signIn(OPERATOR_EMAIL);
    expect(await resolveAccountKind(supabase, OPERATOR_ID)).toBe("operator");
  });

  test("Integration Test 02: Tenant", async () => {
    await signIn(TENANT_EMAIL);
    expect(await resolveAccountKind(supabase, TENANT_ID)).toBe("tenant");
  });
  test("Integration Test 03: Hub", async () => {
    await signIn(HUB_EMAIL);
    expect(await resolveAccountKind(supabase, HUB_ID)).toBe("hub");
  });
  test("Integration Test 04: Unknown ID returns error", async () => {
    await signIn(OPERATOR_EMAIL);
    expect(await resolveAccountKind(supabase, UNKNOWN_ID)).toEqual({
      message: "Invalid login credentials",
    });
  });
});
