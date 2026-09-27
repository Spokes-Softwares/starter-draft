"use client";

import { usePathname } from "next/navigation";
import AppSidebar from "@repo/ui/components/composites-ui/sidebar";
import type { ProfileFooterUser } from "@repo/ui/components/composites-ui/profile-footer";
import { hubsSidebarMenuItems } from "./navConfig";

export function HubsSidebar({ user }: { user: ProfileFooterUser }) {
  const pathname = usePathname();

  return (
    <AppSidebar
      appHeading="Hubs dashboard"
      sidebarMenuItems={hubsSidebarMenuItems}
      pathname={pathname}
      user={user}
    />
  );
}
