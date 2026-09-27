"use client";

import { usePathname } from "next/navigation";
import AppSidebar from "@repo/ui/components/composites-ui/sidebar";
import type { ProfileFooterUser } from "@repo/ui/components/composites-ui/profile-footer";
import { tenantSidebarMenuItems } from "./navConfig";

export function TenantSidebar({ user }: { user: ProfileFooterUser }) {
  const pathname = usePathname();

  return (
    <AppSidebar
      appHeading="Tenant Dashboard"
      sidebarMenuItems={tenantSidebarMenuItems}
      pathname={pathname}
      user={user}
    />
  );
}
