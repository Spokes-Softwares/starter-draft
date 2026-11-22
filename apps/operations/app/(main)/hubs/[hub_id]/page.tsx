import HubTabs from "@/components/hub-tabs/hub-tabs";
import { getSingleHubDetails } from "@repo/db/queries/get-actions/get-single-hub";
import { ListAssetsForHub } from "@repo/db/queries/get-actions/list-assets-for-hub";
import type { Asset } from "@repo/db/queries/get-actions/types";
import { createSupabaseServerClient } from "@repo/db/server";
import PageHeader from "@repo/ui/shared/page-layouts/pageHeader";
import PageShell from "@repo/ui/shared/page-layouts/pageShell";

async function HubOverviewPageContent({ assets }: { assets: Asset[] }) {
  return <HubTabs assets={assets} />;
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
