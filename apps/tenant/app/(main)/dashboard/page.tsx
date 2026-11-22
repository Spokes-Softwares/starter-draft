import TenantDashboardStats from "@/components/dashboard/stat-tiles/stats";
import signOutAction from "@repo/db/actions/sign-out-action";
import { countTenantAssets } from "@repo/db/queries/get-actions/count-tenant-assets";
import { listHubsForTenant } from "@repo/db/queries/get-actions/list-hubs-for-tenant";
import getCurrentUserProfile from "@repo/db/queries/user/get-current-user-profile";
import { createSupabaseServerClient } from "@repo/db/server";
import PageHeader from "@repo/ui/shared/page-layouts/pageHeader";
import PageShell from "@repo/ui/shared/page-layouts/pageShell";

async function TenantDashboardPageContent() {
  return <TenantDashboardStats />;
}

export default async function TenantDashboard() {
  const client = await createSupabaseServerClient();
  const user = await getCurrentUserProfile(client);
  const { tenantId, displayName, name } = user;

  if (tenantId === null) {
    await signOutAction();
    return;
  }

  const [assetCount, hubs] = await Promise.all([
    countTenantAssets(client, tenantId),
    listHubsForTenant(client, tenantId),
  ]);

  const hubCount = hubs.length;

  return (
    <PageShell>
      <PageHeader
        title={`Welcome back, ${displayName ? displayName : name}.`}
        description={`You currently have ${assetCount} across ${hubCount} hubs. Below you can view a more detailed summary`}
      />
      <TenantDashboardPageContent />
    </PageShell>
  );
}
