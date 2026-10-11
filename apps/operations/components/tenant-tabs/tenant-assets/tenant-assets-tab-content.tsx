import type { TenantAssets } from "@repo/db/queries/get-actions/list-tenant-assets";
import TenantAssetsTable from "./table";
import StatTile from "@repo/ui/components/dashboards/stat-tile";
import { Heading } from "@repo/ui/components/shadcn-ui/heading";

export default function TenantAssetsTabContent({
  assets,
}: {
  assets: TenantAssets[];
}) {
  return (
    <section className="grid gap-6">
      <div className="grid grid-cols-3 gap-6">
        <StatTile title="Total Assets" data={assets.length} />
        <StatTile title="Live Assets" data={"Phase 2"} />
        <StatTile title="Out of Order Assets" data={"Phase 2"} />
        <StatTile title="Chart here - Asset type" data={"Phase 2"} />
        <StatTile title="Chart here - maintenance status" data={"Phase 2"} />
        <StatTile title="Chart here - ??" data={"Phase 2"} />
      </div>
      <TenantAssetsTable assets={assets} />
    </section>
  );
}
