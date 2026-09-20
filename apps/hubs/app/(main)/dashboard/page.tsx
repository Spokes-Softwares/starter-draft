import { hubsSidebarMenuItems } from "@/app/components/nav/navConfig";
import AppSidebar from "@repo/ui/components/composites-ui/sidebar";

export default function HubsDashboard() {
  return (
    <div>
      <AppSidebar
        appHeading="Hubs Dashboard"
        sidebarMenuItems={hubsSidebarMenuItems}
      />
    </div>
  );
}
