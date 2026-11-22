import TenantHubsDataTable from "@/components/list-hubs-table/hubs-data-table";
import signOutAction from "@repo/db/actions/sign-out-action";
import { listHubsForTenant } from "@repo/db/queries/get-actions/list-hubs-for-tenant";
import { tenantHub } from "@repo/db/queries/get-actions/types";
import getCurrentUserProfile from "@repo/db/queries/user/get-current-user-profile";
import { createSupabaseServerClient } from "@repo/db/server";
import PageHeader from "@repo/ui/shared/page-layouts/pageHeader";
import PageShell from "@repo/ui/shared/page-layouts/pageShell";

async function HubsPageContent({ hubs }: { hubs: tenantHub[] }) {
  return <TenantHubsDataTable data={hubs} />;
}

export default async function HubsPage() {
  const client = await createSupabaseServerClient();
  const user = await getCurrentUserProfile(client);

  if (user.tenantId === null) {
    await signOutAction();
    return;
  }
  const hubs = await listHubsForTenant(client, user.tenantId);

  return (
    <PageShell>
      <PageHeader
        title="Hub List"
        description="See below for a list of your hubs, click on a row to go to a specific hub."
      />
      <HubsPageContent hubs={hubs} />
    </PageShell>
  );
}
