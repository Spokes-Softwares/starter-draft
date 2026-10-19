import HubAssetOverview from "@/components/hub-overview/hub-stats";
import { getSingleHubDetails } from "@repo/db/queries/get-actions/get-single-hub";
import { ListAssetsForHub } from "@repo/db/queries/get-actions/list-assets-for-hub";
import { Asset } from "@repo/db/queries/get-actions/types";
import { createSupabaseServerClient } from "@repo/db/server";
import PageHeader from "@repo/ui/shared/page-layouts/pageHeader";
import PageShell from "@repo/ui/shared/page-layouts/pageShell";

async function HubOverviewPageContent({ assets }: { assets: Asset[] }) {
  return <HubAssetOverview assets={assets} />;
}

export default async function HubOverviewPage({
  params,
}: {
  params: Promise<{ hubId: string }>;
}) {
  const { hubId } = await params;
  const client = await createSupabaseServerClient();
  const hub = await getSingleHubDetails(client, hubId);
  const assets = await ListAssetsForHub(client, hubId);

  return (
    <PageShell>
      <PageHeader title={`This is an overview page for ${hub?.display_name}`} />
      <HubOverviewPageContent assets={assets} />
    </PageShell>
  );
}
