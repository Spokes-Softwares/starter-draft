import type { SupabaseClient } from "@supabase/supabase-js";

import { createAdminClient } from "@repo/db/admin";
import type { Database } from "../types";

export type HubOnboardInput = {
  tenantId: string;
  hubDisplayName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type HubOnboardResult =
  | { error: string; data?: undefined }
  | { error?: undefined; data: { success: true; hub: string } };

export default async function hubOnboardAction(
  client: SupabaseClient<Database>,
  values: HubOnboardInput,
): Promise<HubOnboardResult> {
  const { data: hub, error: hubTableError } = await client
    .from("tenant_hubs")
    .insert({
      display_name: values.hubDisplayName,
      tenant_id: values.tenantId,
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
      email: values.email,
      password: values.password,
      user_metadata: {
        first_name: values.firstName,
        last_name: values.lastName,
      },
      email_confirm: true,
    });

  if (authError || !authData.user) {
    await client.from("tenant_hubs").delete().eq("id", hub.id);
    return {
      error: authError?.message ?? "Unable to create the hub admin",
    };
  }

  const { error: hubUserError } = await client.from("hub_users").insert({
    user_id: authData.user.id,
    hub_id: hub.id,
    user_role: "admin",
  });

  if (hubUserError) {
    await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
    await client.from("tenant_hubs").delete().eq("id", hub.id);
    return { error: hubUserError.message };
  }

  return { data: { success: true, hub: hub.display_name } };
}
