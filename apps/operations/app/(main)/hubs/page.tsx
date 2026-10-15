import HubsDataTable from "@/components/hubs-table/table";
import { Hub, listAllHubs } from "@repo/db/queries/get-actions/list-all-hubs";
import { createSupabaseServerClient } from "@repo/db/server";
import PageHeader from "@repo/ui/shared/page-layouts/pageHeader";
import PageShell from "@repo/ui/shared/page-layouts/pageShell";

async function HubsPageContent({ listOfHubs }: { listOfHubs: Hub[] }) {
  return <HubsDataTable data={listOfHubs} />;
}

export default async function HubsPage() {
  const supabase = await createSupabaseServerClient();
  const listOfHubs = await listAllHubs(supabase);

  return (
    <PageShell>
      <PageHeader
        title="Hub Overviews"
        description="Click on a hub to view more.
         To onboard a hub, please go to the relevant tenant"
      />
      <HubsPageContent listOfHubs={listOfHubs} />
    </PageShell>
  );
}
