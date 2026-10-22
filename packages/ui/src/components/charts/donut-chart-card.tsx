"use client";

import { Label, Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../shadcn-ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../shadcn-ui/card";

export const description = "A donut chart with text";

export type ServiceStatusCount = {
  service_status: string | null;
  count: number;
};

const STATUS_KEY = {
  "out of service": "outOfService",
  "in service": "inService",
  "awaiting parts": "awaitingParts",
  monitor: "monitor",
} as const;

function serviceStatusSlices(rows: ServiceStatusCount[]) {
  return rows.flatMap((row) => {
    if (!row.service_status || row.count <= 0) return [];

    const key =
      STATUS_KEY[row.service_status as keyof typeof STATUS_KEY] ??
      row.service_status;

    return [
      {
        status: key,
        count: row.count,
        fill: `var(--color-${key})`,
      },
    ];
  });
}

type ChartCardProps = {
  title: string;
  description: string;
  chartData: ServiceStatusCount[];
  chartConfig: ChartConfig;
};

export function ChartCard({
  title,
  description,
  chartData,
  chartConfig,
}: ChartCardProps) {
  const totalAssets = chartData.reduce((sum, row) => sum + row.count, 0);
  const slices = serviceStatusSlices(chartData);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="status" />}
            />
            <Pie
              data={slices}
              dataKey="count"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalAssets.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-white"
                        >
                          Assets
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
