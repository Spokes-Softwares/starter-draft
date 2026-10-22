import { chartConfig } from "./chart-config";
import {
  ChartCard,
  type ServiceStatusCount,
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
  const chartData: ServiceStatusCount[] = counts.map((row) => ({
    service_status: row.service_status,
    count: row.asset_count ?? 0,
  }));

  return (
    <ChartCard
      chartData={chartData}
      title={title}
      description={description}
      chartConfig={chartConfig}
    />
  );
}
