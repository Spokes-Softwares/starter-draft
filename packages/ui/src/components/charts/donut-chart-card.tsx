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

export type AssetCount = {
  data: string | null;
  count: number;
};

const CHART_COLORS = 5;

function chartKey(label: string) {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function chartConfigFromLabels(labels: (string | null)[]): ChartConfig {
  const unique = [
    ...new Set(
      labels.filter(
        (label): label is string => !!label && chartKey(label).length > 0,
      ),
    ),
  ].sort((a, b) => a.localeCompare(b));

  return Object.fromEntries(
    unique.map((label, index) => [
      chartKey(label),
      {
        label,
        color: `var(--chart-${(index % CHART_COLORS) + 1})`,
      },
    ]),
  );
}

function chartSlices(rows: AssetCount[]) {
  return rows.flatMap((row) => {
    if (!row.data || row.count <= 0) return [];

    const key = chartKey(row.data);
    if (!key) return [];

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
  chartData: AssetCount[];
  innerCount: number;
  donutText: string;
};

export function ChartCard({
  title,
  description,
  chartData,
  innerCount,
  donutText,
}: ChartCardProps) {
  const chartConfig = chartConfigFromLabels(chartData.map((row) => row.data));
  const slices = chartSlices(chartData);

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
                          {innerCount.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-white"
                        >
                          {donutText}
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
