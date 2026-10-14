import type { SupabaseClient } from "@supabase/supabase-js";

import { createAdminClient } from "@repo/db/admin";
import type { Database } from "../types";

export type TenantOnboardInput = {
  displayName: string | null;
  companyName: string;
  email: string;
  password: string;
};

export type TenantOnboardResult =
  | { error: string; data?: undefined }
  | { error?: undefined; data: { success: true; tenant: string } };

export default async function tenantOnboardAction(
  client: SupabaseClient<Database>,
  values: TenantOnboardInput,
): Promise<TenantOnboardResult> {
  const supabaseAdmin = createAdminClient();

  const { data: authData, error: authError } =
    await supabaseAdmin.auth.admin.createUser({
      email: values.email,
      password: values.password,
      user_metadata: { display_name: values.displayName },
      email_confirm: true,
    });

  if (authError || !authData.user) {
    return {
      error: authError?.message ?? "Unable to create the tenant user",
    };
  }

  const { data: tenant, error: tenantTableError } = await client
    .from("tenants")
    .insert({
      display_name: values.displayName,
      company_name: values.companyName,
    })
    .select("id, display_name")
    .single();

  if (tenantTableError || !tenant) {
    await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
    return {
      error: tenantTableError?.message ?? "Unable to create the tenant",
    };
  }

  const { error: tenantUserError } = await client.from("tenant_users").insert({
    tenant_id: tenant.id,
    user_id: authData.user.id,
  });

  if (tenantUserError) {
    await client.from("tenants").delete().eq("id", tenant.id);
    await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
    return { error: tenantUserError.message };
  }

  return {
    data: {
      success: true,
      tenant: tenant.display_name ?? values.companyName,
    },
  };
}
