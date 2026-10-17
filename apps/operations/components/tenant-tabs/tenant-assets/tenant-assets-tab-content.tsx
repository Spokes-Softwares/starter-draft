import { Asset } from "@repo/db/queries/get-actions/types";
import TenantAssetsTable from "./table";
import StatTile from "@repo/ui/components/dashboards/stat-tile";

export default function TenantAssetsTabContent({
  assets,
}: {
  assets: Asset[];
}) {
  const totalAssets = assets.length;

  const statTileData = [
    { title: "Total Assets", data: totalAssets },
    { title: "Live Assets", data: "Phase 2" },
    { title: "Out of Order Assets", data: "Phase 2" },
    { title: "Chart here - Asset type", data: "Phase 2" },
    { title: "Chart here - maintenance status", data: "Phase 2" },
    { title: "Chart here - ??", data: "Phase 2" },
  ];

  return (
    <section className="grid gap-6">
      <div className="grid grid-cols-3 gap-6">
        {statTileData.map((tile) => (
          <StatTile key={tile.title} title={tile.title} data={tile.data} />
        ))}
      </div>
      <TenantAssetsTable assets={assets} />
    </section>
  );
}
