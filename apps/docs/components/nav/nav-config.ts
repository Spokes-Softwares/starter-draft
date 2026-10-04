import { SidebarMenuItemType } from "@repo/ui/components/composites-ui/sidebar";

export const documentationSidebarMenuItems: {
  title: string;
  items: SidebarMenuItemType[];
}[] = [
  {
    title: "Docs",
    items: [{ label: "App overview", href: "/overview" }],
  },
];
