import AssetsDataTable from "@/components/assets-table/table";
import { getSingleHubDetails } from "@repo/db/queries/get-actions/get-single-hub";
import {
  Assets,
  ListAssetsForHub,
} from "@repo/db/queries/get-actions/list-assets-for-hub";
import { createSupabaseServerClient } from "@repo/db/server";
import PageHeader from "@repo/ui/shared/page-layouts/pageHeader";
import PageShell from "@repo/ui/shared/page-layouts/pageShell";

async function HubOverviewPageContent({ assets }: { assets: Assets[] }) {
  return <AssetsDataTable data={assets} />;
}

export default async function HubOverviewPage({
  params,
}: {
  params: Promise<{ hub_id: string }>;
}) {
  const { hub_id } = await params;
  const client = await createSupabaseServerClient();

  const [assets, hubDetails] = await Promise.all([
    ListAssetsForHub(client, hub_id),
    getSingleHubDetails(client, hub_id),
  ]);

  return (
    <PageShell>
      <PageHeader title={`Overview of hub: ${hubDetails?.display_name}`} />
      <HubOverviewPageContent assets={assets} />
    </PageShell>
  );
}
