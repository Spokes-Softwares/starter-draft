"use server";

import { revalidatePath } from "next/cache";
import {
  hubOnboardSchema,
  HubOnboardValues,
} from "@/components/forms/hub-onboard/schema";
import { createAdminClient } from "@repo/db/admin";
import { createSupabaseServerClient } from "@repo/db/server";

type HubOnboardResult =
  | { error: string; data?: undefined }
  | { error?: undefined; data: { success: true; hub: string } };

export default async function handleHubOnboardAction(
  values: HubOnboardValues,
): Promise<HubOnboardResult> {
  const parsed = hubOnboardSchema.safeParse(values);

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Invalid inputs returned",
    };
  }

  const supabase = await createSupabaseServerClient();
  const { data: hub, error: hubTableError } = await supabase
    .from("tenant_hubs")
    .insert({
      display_name: parsed.data.hubDisplayName,
      tenant_id: parsed.data.tenantId,
    })
    .select("id, display_name")
    .single();

  if (hubTableError || !hub) {
    return {
      error: hubTableError?.message ?? "Unable to create the hub",
    };
  }

  const supabaseAdmin = createAdminClient();

  const { data: authData, error: authError } =
    await supabaseAdmin.auth.admin.createUser({
      email: parsed.data.email,
      password: parsed.data.password,
      user_metadata: {
        first_name: parsed.data.firstName,
        last_name: parsed.data.lastName,
      },
      email_confirm: true,
    });

  if (authError || !authData.user) {
    await supabase.from("tenant_hubs").delete().eq("id", hub.id);
    return {
      error: authError?.message ?? "Unable to create the hub admin",
    };
  }

  const { error: hubUserError } = await supabase.from("hub_users").insert({
    user_id: authData.user.id,
    hub_id: hub.id,
    user_role: "admin",
  });

  if (hubUserError) {
    await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
    await supabase.from("tenant_hubs").delete().eq("id", hub.id);
    return { error: hubUserError.message };
  }

  revalidatePath(`/tenants/${parsed.data.tenantId}`);

  return { data: { success: true, hub: hub.display_name } };
}
