import { SidebarMenuItemType } from "@repo/ui/components/composites-ui/sidebar";
import {
  Bot,
  BuildingComplex,
  ChevronDown,
  House,
  LucideBlocks,
} from "lucide-react";

export const operationsSidebarMenuItems: {
  title: string;
  items: SidebarMenuItemType[];
}[] = [
  {
    title: "Overviews",
    items: [
      { icon: LucideBlocks, label: "Dashboard" },
      {
        icon: BuildingComplex,
        label: "Tenants",
        dropDownItems: [
          {
            label: "Overview",
          },
          {
            label: "Invite",
          },
        ],
        chevron: ChevronDown,
      },
      {
        icon: House,
        label: "Hubs",
        dropDownItems: [
          {
            label: "Overview",
          },
          {
            label: "Invite",
          },
        ],
        chevron: ChevronDown,
      },
      {
        icon: Bot,
        label: "Assets",
        dropDownItems: [
          {
            label: "Overview",
          },
          {
            label: "Invite",
          },
        ],
        chevron: ChevronDown,
      },
    ],
  },
];
