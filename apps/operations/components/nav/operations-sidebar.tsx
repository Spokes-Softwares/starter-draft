"use client";

import { usePathname } from "next/navigation";
import AppSidebar from "@repo/ui/components/composites-ui/sidebar";
import type { ProfileFooterUser } from "@repo/ui/components/composites-ui/profile-footer";
import { operationsSidebarMenuItems } from "./navConfig";
import { operationsUserConfigItems } from "./userNavConfig";

export function OperationsSidebar({ user }: { user: ProfileFooterUser }) {
  const pathname = usePathname();

  return (
    <AppSidebar
      appHeading="Operations dashboard"
      sidebarMenuItems={operationsSidebarMenuItems}
      pathname={pathname}
      user={user}
      userProfileItems={operationsUserConfigItems}
    />
  );
}
