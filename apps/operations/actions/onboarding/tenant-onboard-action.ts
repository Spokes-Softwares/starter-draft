"use server";

import { createAdminClient } from "@repo/db/admin";
import {
  tenantOnboardSchema,
  TenantOnboardValues,
} from "../../components/tenant-onboard/schema";
import { createSupabaseServerClient } from "@repo/db/server";

export default async function handleTenantOnboardAction(
  values: TenantOnboardValues,
) {
  /* Parse the data server side */
  const parsed = tenantOnboardSchema.safeParse(values);

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Invalid inputs recieved",
    };
  }

  /* This puts them in the private auth + identities tables. Only available to admin-users via the admin .env var */
  const supabaseAdmin = createAdminClient();

  const { data: authData, error: authError } =
    await supabaseAdmin.auth.admin.createUser({
      email: parsed.data.email,
      password: parsed.data.password,
      user_metadata: { display_name: parsed.data.displayName },
      email_confirm: true, // This is so it is automatically confirmed in supabase. If false - it sends confirmation email to the email.
    });

  if (authError) return { error: authError.message };

  /* If no error for user insert - then add rows into relevant tables */

  const supabase = await createSupabaseServerClient();
  const { data: tenant, error: tenantTableError } = await supabase
    .from("tenants")
    .insert({
      display_name: parsed.data.displayName ?? undefined,
      company_name: parsed.data.companyName,
    })
    .select("id, display_name")
    .single();

  if (tenantTableError)
    return {
      error: tenantTableError.message,
    };

  const { error: tenantUserError } = await supabase
    .from("tenant_users")
    .insert({ tenant_id: tenant.id, user_id: authData.user.id });

  if (tenantUserError) return { error: tenantUserError.message };

  return { data: { success: true, tenant: tenant.display_name } };
}
