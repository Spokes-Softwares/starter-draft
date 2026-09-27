"use client";

import { usePathname } from "next/navigation";
import AppSidebar from "@repo/ui/components/composites-ui/sidebar";
import { operationsSidebarMenuItems } from "./navConfig";
import getCurrentUserProfile from "@repo/db/queries/user/get-current-user-profile";

export async function OperationsSidebar() {
  const pathname = usePathname();
  const user = await getCurrentUserProfile();


  return (
    <AppSidebar
      appHeading="Operations dashboard"
      sidebarMenuItems={operationsSidebarMenuItems}
      pathname={pathname}
      user={user}
    />
  );
}
