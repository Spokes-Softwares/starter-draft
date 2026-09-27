import { ChevronDown, LucideIcon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
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
import { ProfileFooter, ProfileFooterUser } from "./profile-footer";

export type SidebarMenuItemType = {
  label: string;
  icon: LucideIcon;
  chevron?: LucideIcon;
  dropDownItems?: {
    label: string;
  }[];
};

type SidebarMenuGroup = {
  title: string;
  items: SidebarMenuItemType[];
};

export default function AppSidebar({
  appHeading,
  sidebarMenuItems,
  user,
}: {
  appHeading: string;
  sidebarMenuItems: SidebarMenuGroup[];
  user: ProfileFooterUser;
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
        <SidebarGroup className="gap-5">
          {sidebarMenuItems.map((menuItems, index) => (
            <SidebarMenu key={index}>
              <SidebarGroupLabel>{menuItems.title}</SidebarGroupLabel>
              {menuItems.items.map((item, index) => (
                <AppSidebarItem key={index} item={item} />
              ))}
              <Separator className="bg-border mt-5" />
            </SidebarMenu>
          ))}
        </SidebarGroup>
      </SidebarContent>
      <ProfileFooter user={user} />
      <SidebarFooter />
    </Sidebar>
  );
}

function AppSidebarItem({ item }: { item: SidebarMenuItemType }) {
  if (!item.dropDownItems?.length) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton className="hover:bg-primary/20 rounded-lg">
          <item.icon />
          <span>{item.label}</span>
          {item.chevron && <item.chevron className="ml-auto" />}
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  return (
    <Collapsible render={<SidebarMenuItem />}>
      <CollapsibleTrigger
        render={<SidebarMenuButton />}
        className="hover:bg-primary/20 rounded-lg"
      >
        <item.icon />
        <span>{item.label}</span>
        <ChevronDown className="ml-auto" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <SidebarMenuSub>
          {item.dropDownItems.map((sub) => (
            <SidebarMenuSubItem key={sub.label}>
              <SidebarMenuSubButton className="hover:bg-primary/20 rounded-lg">
                <span>{sub.label}</span>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          ))}
        </SidebarMenuSub>
      </CollapsibleContent>
    </Collapsible>
  );
}
