"use server";

import { revalidatePath } from "next/cache";

import {
  tenantOnboardSchema,
  type TenantOnboardValues,
} from "@/components/forms/tenant-onboard/schema";
import { createSupabaseServerClient } from "@repo/db/server";
import tenantOnboardAction, {
  type TenantOnboardResult,
} from "@repo/db/actions/tenant-onboard-action";

export type { TenantOnboardResult };

export default async function handleTenantOnboard(
  values: TenantOnboardValues,
): Promise<TenantOnboardResult> {
  const parsedValues = tenantOnboardSchema.safeParse(values);

  if (!parsedValues.success) {
    return {
      error: parsedValues.error.issues[0]?.message ?? "Invalid inputs received",
    };
  }

  const displayName = parsedValues.data.displayName?.trim() || null;
  const supabase = await createSupabaseServerClient();
  const result = await tenantOnboardAction(supabase, {
    displayName,
    companyName: parsedValues.data.companyName,
    email: parsedValues.data.email,
    password: parsedValues.data.password,
  });

  if (result.data) {
    revalidatePath("/tenants");
  }

  return result;
}
