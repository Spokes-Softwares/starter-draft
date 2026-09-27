"use client";

import { usePathname } from "next/navigation";
import AppSidebar from "@repo/ui/components/composites-ui/sidebar";
import {
  UserProfileFooter,
  type UserProfileFooterType,
} from "@repo/ui/components/composites-ui/profile-footer";
import { operationsSidebarMenuItems } from "./navConfig";
import { operationsUserConfigItems } from "./userNavConfig";
import signOutAction from "@repo/db/actions/sign-out-action";

export function OperationsSidebar({ user }: { user: UserProfileFooterType }) {
  const pathname = usePathname();

  return (
    <AppSidebar
      appHeading="Operations dashboard"
      sidebarMenuItems={operationsSidebarMenuItems}
      pathname={pathname}
      footer={
        <UserProfileFooter
          user={user}
          userProfileItems={operationsUserConfigItems}
          onSignOut={signOutAction}
        />
      }
    />
  );
}
