"use client";

import { usePathname } from "next/navigation";
import AppSidebar from "@repo/ui/components/composites-ui/sidebar";
import type { UserProfileFooterType } from "@repo/ui/components/composites-ui/profile-footer";
import { tenantSidebarMenuItems } from "./navConfig";
import { tenantUserConfigItems } from "./userNavConfig";

export function TenantSidebar({ user }: { user: UserProfileFooterType }) {
  const pathname = usePathname();

  return (
    <AppSidebar
      appHeading="Tenant Dashboard"
      sidebarMenuItems={tenantSidebarMenuItems}
      pathname={pathname}
      user={user}
      userProfileItems={tenantUserConfigItems}
    />
  );
}
