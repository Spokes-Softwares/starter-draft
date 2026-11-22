import AssetOverviewSection from "@/components/asset-overview/asset-overview";
import { getSingleAssetDetails } from "@repo/db/queries/get-actions/get-single-asset-details";
import { AssetDetails } from "@repo/db/queries/get-actions/types";
import { createSupabaseServerClient } from "@repo/db/server";
import PageHeader from "@repo/ui/shared/page-layouts/pageHeader";
import PageShell from "@repo/ui/shared/page-layouts/pageShell";

async function AssetOverviewPageContent({
  assetDetails,
}: {
  assetDetails: AssetDetails;
}) {
  const { created_at, service_status, reference_tag, asset_types } =
    assetDetails;


  return (
    <AssetOverviewSection
      createdAt={created_at}
      serviceStatus={service_status}
      referenceTag={reference_tag}
      assetType={asset_types.asset_type}
    />
  );
}

export default async function AssetOverviewPage({
  params,
}: {
  params: Promise<{ asset_id: string }>;
}) {
  const { asset_id } = await params;
  const supabase = await createSupabaseServerClient();

  const assetDetails = await getSingleAssetDetails(asset_id, supabase);

  return (
    <PageShell>
      <PageHeader title="Asset Overview" />
      <AssetOverviewPageContent assetDetails={assetDetails} />
    </PageShell>
  );
}
