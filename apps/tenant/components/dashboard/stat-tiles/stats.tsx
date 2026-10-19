import StatTile, {
  StatTileProps,
} from "@repo/ui/components/dashboards/stat-tile";

export default function TenantDashboardStats() {
  const statTileData = [
    {
      title: "Asset vs Hub Spread",
      data: "Phase 2 - Radar Chart",
    },
    {
      title: "Asset Service Status Spread",
      data: "Phase 2 - Pie Chart",
    },
    {
      title: "Out of Service Assets",
      data: "Phase 2",
    },
  ] satisfies StatTileProps[];

  return (
    <div className="grid grid-cols-3 gap-4">
      {statTileData.map((tile) => (
        <StatTile title={tile.title} data={tile.data} key={tile.title} />
      ))}
      <StatTile
        className="col-span-3"
        title="Asset status per hub - 30 day comparison"
        data="Phase 2 - multi bar chart"
      />
    </div>
  );
}
