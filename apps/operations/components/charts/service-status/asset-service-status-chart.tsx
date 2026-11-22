import {
  ChartCard,
  type AssetCount,
} from "@repo/ui/components/charts/donut-chart-card";

export default function AssetServiceChart({
  title,
  description,
  counts,
}: {
  title: string;
  description: string;
  counts: {
    service_status: string | null;
    asset_count: number | null;
  }[];
}) {
  const chartData: AssetCount[] = counts.map((row) => ({
    data: row.service_status,
    count: row.asset_count ?? 0,
  }));

  const inServiceCount = counts.reduce((sum, row) => {
    if (row.service_status !== "in service") return sum;
    return sum + (row.asset_count ?? 0);
  }, 0);

  const totalAssets = chartData.reduce((sum, row) => sum + row.count, 0);

  return (
    <ChartCard
      chartData={chartData}
      title={title}
      description={description}
      donutText={`${((inServiceCount / totalAssets) * 100).toFixed(0)}% in service`}
      innerCount={inServiceCount}
    />
  );
}
