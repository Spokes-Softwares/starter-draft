"use client";

import { usePathname } from "next/navigation";
import AppSidebar from "@repo/ui/components/composites-ui/sidebar";
import { hubsSidebarMenuItems } from "./navConfig";

export function HubsSidebar() {
  const pathname = usePathname();

  return (
    <AppSidebar
      appHeading="Hubs dashboard"
      sidebarMenuItems={hubsSidebarMenuItems}
      pathname={pathname}
    />
  );
}
