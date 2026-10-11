import { SidebarMenuItemType } from "@repo/ui/components/composites-ui/sidebar";
import { Bot, BuildingComplex, House, LucideBlocks } from "lucide-react";

export const operationsSidebarMenuItems: {
  title: string;
  items: SidebarMenuItemType[];
}[] = [
  {
    title: "Overviews",
    items: [
      { icon: LucideBlocks, label: "Dashboard", href: "/dashboard" },
      {
        icon: BuildingComplex,
        label: "Tenants",
        dropDownItems: [
          { label: "Overview", href: "/tenants" },
          { label: "Onboard", href: "/tenants/new" },
        ],
      },
      {
        icon: House,
        label: "Hubs",
        dropDownItems: [
          { label: "Overview", href: "/hubs" },
          { label: "Onboard", href: "/hubs/new" },
        ],
      },
      {
        icon: Bot,
        label: "Assets",
        dropDownItems: [
          { label: "Overview", href: "/assets" },
          { label: "Onboard", href: "/assets/new" },
        ],
      },
    ],
  },
];
