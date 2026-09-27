"use client";

import { usePathname } from "next/navigation";
import AppSidebar from "@repo/ui/components/composites-ui/sidebar";
import { tenantSidebarMenuItems } from "./navConfig";

export function TenantSidebar() {
  const pathname = usePathname();

  return (
    <AppSidebar
      appHeading="Tenant Dashboard"
      sidebarMenuItems={tenantSidebarMenuItems}
      pathname={pathname}
    />
  );
}
