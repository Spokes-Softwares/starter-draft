"use client";

import { usePathname } from "next/navigation";
import AppSidebar from "@repo/ui/components/composites-ui/sidebar";
import { tenantSidebarMenuItems } from "./navConfig";
import getCurrentUserProfile from "@repo/db/queries/user/get-current-user-profile";

export async function TenantSidebar() {
  const pathname = usePathname();
  const user = await getCurrentUserProfile();


  return (
    <AppSidebar
      appHeading="Tenant Dashboard"
      sidebarMenuItems={tenantSidebarMenuItems}
      pathname={pathname}
      user={user}
    />
  );
}
