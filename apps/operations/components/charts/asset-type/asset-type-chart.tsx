import {
  ChartCard,
  type AssetCount,
} from "@repo/ui/components/charts/donut-chart-card";

export type AssetTypeChartProps = {
  title: string;
  description: string;
  counts: {
    asset_type: string | null;
    asset_count: number | null;
  }[];
};

export default function AssetTypeChart({
  counts,
  title,
  description,
}: AssetTypeChartProps) {
  const chartData: AssetCount[] = counts.map((row) => ({
    data: row.asset_type,
    count: row.asset_count ?? 0,
  }));

  const totalAssets = chartData.reduce((sum, row) => sum + row.count, 0);

  return (
    <ChartCard
      chartData={chartData}
      title={title}
      description={description}
      innerCount={totalAssets}
      donutText="Total Assets"
    />
  );
}
