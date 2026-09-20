import signOutAction from "@repo/db/actions/sign-out-action";
import SignOutButton from "../../../components/sign-out-button";
import AppSidebar from "@repo/ui/components/composites-ui/sidebar";
import { operationsSidebarMenuItems } from "../../../components/nav/navConfig";

export default async function OperationsDashboard() {
  return (
    <div>
      <AppSidebar
        appHeading="Operations Dashboard"
        sidebarMenuItems={operationsSidebarMenuItems}
      />
      <SignOutButton handleSignOut={signOutAction} />
    </div>
  );
}
