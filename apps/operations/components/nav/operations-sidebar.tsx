"use client";

import { usePathname } from "next/navigation";
import AppSidebar from "@repo/ui/components/composites-ui/sidebar";
import { operationsSidebarMenuItems } from "./navConfig";

export function OperationsSidebar() {
  const pathname = usePathname();

  return (
    <AppSidebar
      appHeading="Operations dashboard"
      sidebarMenuItems={operationsSidebarMenuItems}
      pathname={pathname}
    />
  );
}
