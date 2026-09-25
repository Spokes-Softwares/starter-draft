import { SidebarMenuItemType } from "@repo/ui/components/composites-ui/sidebar";
import { Book, ChevronRight, Map, MenuIcon, PieChart } from "lucide-react";

export const tenantSidebarMenuItems: {
  title: string;
  items: SidebarMenuItemType[];
}[] = [
  {
    title: "Overview",
    items: [
      { icon: PieChart, label: "Dashboard" },
      { icon: Book, label: "Reports" },
      { icon: MenuIcon, label: "Stock" },
      { icon: Map, label: "Regions", chevron: ChevronRight },
    ],
  },
  {
    title: "Reports",
    items: [
      { icon: Map, label: "Weekly Report", chevron: ChevronRight },
      { icon: Map, label: "Monthly Report", chevron: ChevronRight },
      { icon: Map, label: "Annual Report", chevron: ChevronRight },
    ],
  },
];
