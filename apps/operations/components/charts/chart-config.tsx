import { ChartConfig } from "@repo/ui/components/shadcn-ui/chart";

export const chartConfig = {
  outOfService: {
    label: "Out of service",
    color: "var(--chart-4)",
  },
  inService: {
    label: "In service",
    color: "var(--chart-1)",
  },
  awaitingParts: {
    label: "Awaiting Parts",
    color: "var(--chart-2)",
  },
  monitor: {
    label: "Monitor",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;
