"use client";

import { usePathname } from "next/navigation";
import AppSidebar from "@repo/ui/components/composites-ui/sidebar";
import { hubsSidebarMenuItems } from "./navConfig";
import getCurrentUserProfile from "@repo/db/queries/user/get-current-user-profile";

export async function HubsSidebar() {
  const pathname = usePathname();
  const user = await getCurrentUserProfile();


  return (
    <AppSidebar
      appHeading="Hubs dashboard"
      sidebarMenuItems={hubsSidebarMenuItems}
      user={user}
      pathname={pathname}
    />
  );
}
