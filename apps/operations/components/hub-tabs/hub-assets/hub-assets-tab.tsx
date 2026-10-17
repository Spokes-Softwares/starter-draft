import AssetsDataTable from "@/components/assets-table/table";
import { Asset } from "@repo/db/queries/get-actions/types";
import StatTile, {
  StatTileProps,
} from "@repo/ui/components/dashboards/stat-tile";

export default function HubAssetsTab({ assets }: { assets: Asset[] }) {

  const statTileData = [
    { title: "Total Number of assets", data: assets.length },
    { title: "Assets in use", data: "Phase 2" },
    { title: "Assets out of order", data: "Phase 2" },
    { title: "Awaiting parts", data: "Phase 2" },
    { title: "chart1 goes here", data: "Phase 2" },
    { title: "chart2 goes here", data: "Phase 2" },
  ] satisfies StatTileProps[];

  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-3 gap-4">
        {statTileData.map((tile) => (
          <StatTile title={tile.title} data={tile.data} key={tile.title} />
        ))}
      </div>
      <AssetsDataTable data={assets} />
    </div>
  );
}
