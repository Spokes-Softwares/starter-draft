"use client";

import { useEffect, useState } from "react";
import { ChevronDown, LucideIcon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../shadcn-ui/sidebar";
import { Separator } from "../shadcn-ui/separator";
import { Heading } from "../shadcn-ui/heading";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../shadcn-ui/collapsible";
import { ProfileFooter, ProfileFooterUser, UserProfileGroup } from "./profile-footer";
import { cn } from "../../lib/utils";

export type SidebarMenuItemType = {
  label: string;
  icon: LucideIcon;
  href?: string;
  dropDownItems?: {
    label: string;
    href: string;
  }[];
};

type SidebarMenuGroup = {
  title: string;
  items: SidebarMenuItemType[];
};

function isActivePath(pathname: string, href: string) {
  return pathname === href;
}

function NavCollapsibleItem({
  item,
  pathname,
}: {
  item: SidebarMenuItemType;
  pathname: string;
}) {
  const dropDownItems = item.dropDownItems ?? [];
  const hasActiveChild = dropDownItems.some((sub) =>
    isActivePath(pathname, sub.href),
  );
  const [open, setOpen] = useState(hasActiveChild);

  useEffect(() => {
    if (hasActiveChild) setOpen(true);
  }, [hasActiveChild]);

  return (
    <Collapsible
      className="group/collapsible"
      open={open}
      onOpenChange={setOpen}
      render={<SidebarMenuItem />}
    >
      <CollapsibleTrigger
        className={cn(
          "peer/menu-button flex h-9 w-full cursor-pointer items-center gap-2 overflow-hidden rounded-lg px-3 py-2 text-left text-sm outline-hidden",
          "hover:bg-primary/20",
          "[&_svg]:size-4 [&_svg]:shrink-0 [&>span:last-child]:truncate",
          hasActiveChild && "bg-primary/20 font-medium",
        )}
      >
        <item.icon />
        <span>{item.label}</span>
        <ChevronDown className="ml-auto transition-transform group-data-open/collapsible:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <SidebarMenuSub>
          {dropDownItems.map((sub) => (
            <SidebarMenuSubItem key={sub.label}>
              <SidebarMenuSubButton
                className="hover:bg-primary/20 rounded-lg"
                isActive={isActivePath(pathname, sub.href)}
                render={<a href={sub.href} />}
              >
                <span>{sub.label}</span>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          ))}
        </SidebarMenuSub>
      </CollapsibleContent>
    </Collapsible>
  );
}

export default function AppSidebar({
  appHeading,
  sidebarMenuItems,
  userProfileItems,
  user,
  pathname,
}: {
  appHeading: string;
  sidebarMenuItems: SidebarMenuGroup[];
  userProfileItems: UserProfileGroup[];
  user: ProfileFooterUser;
  pathname: string;
}) {
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Heading variant="h5" className="font-semibold text-foreground">
          {appHeading}
        </Heading>
      </SidebarHeader>
      <Separator className="bg-border" />
      <SidebarContent>
        {sidebarMenuItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) =>
                  item.dropDownItems?.length ? (
                    <NavCollapsibleItem
                      key={item.label}
                      item={item}
                      pathname={pathname}
                    />
                  ) : (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton
                        className="hover:bg-primary/20 rounded-lg"
                        isActive={
                          !!item.href && isActivePath(pathname, item.href)
                        }
                        render={item.href ? <a href={item.href} /> : undefined}
                      >
                        <item.icon />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ),
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <ProfileFooter user={user} userProfileItems={userProfileItems} />
    </Sidebar>
  );
}
