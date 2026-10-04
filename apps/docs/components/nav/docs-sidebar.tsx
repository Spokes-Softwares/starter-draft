"use client";

import AppSidebar from "@repo/ui/components/composites-ui/sidebar";
import { usePathname } from "next/navigation";
import { documentationSidebarMenuItems } from "./nav-config";

export default function DocumentationSidebar() {
  const pathname = usePathname();

  return (
    <AppSidebar
      appHeading="Documentation"
      sidebarMenuItems={documentationSidebarMenuItems}
      pathname={pathname}
    />
  );
}
