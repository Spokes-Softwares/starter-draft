"use server";

import { revalidatePath } from "next/cache";

import {
  hubOnboardSchema,
  type HubOnboardValues,
} from "@/components/forms/hub-onboard/schema";
import { createSupabaseServerClient } from "@repo/db/server";
import hubOnboardAction, {
  type HubOnboardResult,
} from "@repo/db/actions/hub-onboarding-action";

export type { HubOnboardResult };

export default async function handleHubOnboard(
  values: HubOnboardValues,
): Promise<HubOnboardResult> {
  const parsedValues = hubOnboardSchema.safeParse(values);

  if (!parsedValues.success) {
    return {
      error: parsedValues.error.issues[0]?.message ?? "Invalid inputs received",
    };
  }

  const supabase = await createSupabaseServerClient();
  const result = await hubOnboardAction(supabase, parsedValues.data);

  if (result.data) {
    revalidatePath(`/tenants/${parsedValues.data.tenantId}`);
  }

  return result;
}
