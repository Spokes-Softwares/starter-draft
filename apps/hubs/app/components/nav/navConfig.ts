import { SidebarMenuItemType } from "@repo/ui/components/composites-ui/sidebar";
import { Bot, House, LucideBlocks } from "lucide-react";

export const hubsSidebarMenuItems: {
  title: string;
  items: SidebarMenuItemType[];
}[] = [
  {
    title: "Overviews",
    items: [
      { icon: LucideBlocks, label: "Dashboard", href: "/dashboard" },
      {
        icon: House,
        label: "Hubs",
        dropDownItems: [
          { label: "Overview", href: "/hub/overview" },
          { label: "Invite", href: "/hub/invite" },
        ],
      },
      {
        icon: Bot,
        label: "Assets",
        dropDownItems: [
          { label: "Overview", href: "/assets" },
          { label: "Invite", href: "/assets/invite" },
        ],
      },
    ],
  },
];
