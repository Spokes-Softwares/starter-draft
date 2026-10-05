import { SidebarMenuItemType } from "@repo/ui/components/composites-ui/sidebar";

export const documentationSidebarMenuItems: {
  title: string;
  items: SidebarMenuItemType[];
}[] = [
  {
    title: "Areas",
    items: [
      { label: "Application overview", href: "/overview" },
      { label: "Operations Portal", href: "/operations-portal" },
      { label: "Tenant Portal", href: "/tenant-portal" },
      { label: "Hubs Portal", href: "/hubs-portal" },
    ],
  },
];
