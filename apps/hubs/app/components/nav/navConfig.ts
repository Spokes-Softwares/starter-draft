import { SidebarMenuItemType } from "@repo/ui/components/composites-ui/sidebar";
import {
  Bot,
  ChevronDown,
  House,
  LucideBlocks,
} from "lucide-react";

export const hubsSidebarMenuItems: {
  title: string;
  items: SidebarMenuItemType[];
}[] = [
  {
    title: "Overviews",
    items: [
      { icon: LucideBlocks, label: "Dashboard" },
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
