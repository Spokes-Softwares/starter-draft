"use client";

import { usePathname } from "next/navigation";
import AppSidebar from "@repo/ui/components/composites-ui/sidebar";
import {
  UserProfileFooter,
  type UserProfileFooterType,
} from "@repo/ui/components/composites-ui/profile-footer";
import { hubsSidebarMenuItems } from "./navConfig";
import { hubstUserConfigItems } from "./userNavConfig";
import signOutAction from "@repo/db/actions/sign-out-action";

export function HubsSidebar({ user }: { user: UserProfileFooterType }) {
  const pathname = usePathname();

  return (
    <AppSidebar
      appHeading="Hubs dashboard"
      sidebarMenuItems={hubsSidebarMenuItems}
      pathname={pathname}
      footer={
        <UserProfileFooter
          user={user}
          userProfileItems={hubstUserConfigItems}
          onSignOut={signOutAction}
        />
      }
    />
  );
}
