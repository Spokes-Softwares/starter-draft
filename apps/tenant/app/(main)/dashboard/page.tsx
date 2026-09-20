import { tenantSidebarMenuItems } from "@/components/nav/navConfig";
import AppSideBar from "@repo/ui/components/composites-ui/sidebar";

export default function TenantSidebar() {
  return (
    <AppSideBar
      appHeading={"Tenant Dashboard"}
      sidebarMenuItems={tenantSidebarMenuItems}
    />
  );
}
