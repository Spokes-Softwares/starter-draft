"use client";

import { usePathname } from "next/navigation";
import AppSidebar from "@repo/ui/components/composites-ui/sidebar";
import type { UserProfileFooter } from "@repo/ui/components/composites-ui/profile-footer";
import { hubsSidebarMenuItems } from "./navConfig";
import { hubstUserConfigItems } from "./userNavConfig";

export function HubsSidebar({ user }: { user: UserProfileFooter }) {
  const pathname = usePathname();

  return (
    <AppSidebar
      appHeading="Hubs dashboard"
      sidebarMenuItems={hubsSidebarMenuItems}
      pathname={pathname}
      user={user}
      userProfileItems={hubstUserConfigItems}
    />
  );
}
