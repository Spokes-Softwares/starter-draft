"use server";

import { revalidatePath } from "next/cache";
import {
  tenantOnboardSchema,
  TenantOnboardValues,
} from "@/components/forms/tenant-onboard/schema";
import { createAdminClient } from "@repo/db/admin";
import { createSupabaseServerClient } from "@repo/db/server";

type TenantOnboardResult =
  | { error: string; data?: undefined }
  | { error?: undefined; data: { success: true; tenant: string } };

export default async function handleTenantOnboardAction(
  values: TenantOnboardValues,
): Promise<TenantOnboardResult> {
  const parsed = tenantOnboardSchema.safeParse(values);

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Invalid inputs received",
    };
  }

  const displayName = parsed.data.displayName?.trim() || null;
  const supabase = await createSupabaseServerClient();
  const supabaseAdmin = createAdminClient();

  const { data: authData, error: authError } =
    await supabaseAdmin.auth.admin.createUser({
      email: parsed.data.email,
      password: parsed.data.password,
      user_metadata: { display_name: displayName },
      email_confirm: true,
    });

  if (authError || !authData.user) {
    return {
      error: authError?.message ?? "Unable to create the tenant user",
    };
  }

  const { data: tenant, error: tenantTableError } = await supabase
    .from("tenants")
    .insert({
      display_name: displayName,
      company_name: parsed.data.companyName,
    })
    .select("id, display_name")
    .single();

  if (tenantTableError || !tenant) {
    await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
    return {
      error: tenantTableError?.message ?? "Unable to create the tenant",
    };
  }

  const { error: tenantUserError } = await supabase
    .from("tenant_users")
    .insert({
      tenant_id: tenant.id,
      user_id: authData.user.id,
    });

  if (tenantUserError) {
    await supabase.from("tenants").delete().eq("id", tenant.id);
    await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
    return { error: tenantUserError.message };
  }

  revalidatePath("/tenants");

  return {
    data: {
      success: true,
      tenant: tenant.display_name ?? parsed.data.companyName,
    },
  };
}
