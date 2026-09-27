import { SidebarMenuItemType } from "@repo/ui/components/composites-ui/sidebar";
import { Bot, ChartColumn, Map, PieChart } from "lucide-react";

export const tenantSidebarMenuItems: {
  title: string;
  items: SidebarMenuItemType[];
}[] = [
  {
    title: "Overview",
    items: [
      { icon: PieChart, label: "Dashboard", href: "/dashboard" },
      { icon: Map, label: "Hubs", href: "/hubs" },
      { icon: Bot, label: "Asssets", href: "/assets" },
    ],
  },
  {
    title: "Reports",
    items: [
      { icon: ChartColumn, label: "Weekly Report", href: "/reports/weekly" },
      { icon: ChartColumn, label: "Monthly Report", href: "/reports/monthly" },
      { icon: ChartColumn, label: "Annual Report", href: "/reports/annual" },
    ],
  },
];
