import type { Asset } from "@repo/db/queries/get-actions/types";
import type { TenantAssetServiceCount } from "@repo/db/queries/get-actions/list-tenant-asset-service-counts";
import AssetServiceChart from "@/components/charts/service-status/asset-service-status-chart";
import TenantAssetsTable from "./table";
import StatTile from "@repo/ui/components/dashboards/stat-tile";
import { TenantAssetTypeCount } from "@repo/db/queries/get-actions/list-tenant-asset-types";
import AssetTypeChart from "@/components/charts/asset-type/asset-type-chart";

function countForStatus(counts: TenantAssetServiceCount[], status: string) {
  return counts.reduce((sum, row) => {
    if (row.service_status !== status) return sum;
    return sum + (row.asset_count ?? 0);
  }, 0);
}

export default function TenantAssetsTabContent({
  assets,
  serviceCounts,
  tenantName,
  companyName,
  assetTypes,
}: {
  assets: Asset[];
  serviceCounts: TenantAssetServiceCount[];
  tenantName: string;
  companyName: string;
  assetTypes: TenantAssetTypeCount[];
}) {
  const totalAssets = serviceCounts.reduce(
    (sum, row) => sum + (row.asset_count ?? 0),
    0,
  );

  return (
    <section className="grid gap-6">
      <div className="grid grid-cols-3 gap-6">
        <StatTile title="Total Assets" data={totalAssets} />
        <StatTile
          title="Live Assets"
          data={countForStatus(serviceCounts, "in service")}
        />
        <StatTile
          title="Out of Order Assets"
          data={countForStatus(serviceCounts, "out of service")}
        />
        <AssetTypeChart
          title="Types of assets"
          description="A list of all asset types for this tenant"
          counts={assetTypes}
        />
        <AssetServiceChart
          title="Service Status"
          description="A total count of the states of service across all assets"
          counts={serviceCounts}
        />
        <StatTile title="Chart here - ??" data="Phase 2" />
      </div>
      <TenantAssetsTable assets={assets} />
    </section>
  );
}
