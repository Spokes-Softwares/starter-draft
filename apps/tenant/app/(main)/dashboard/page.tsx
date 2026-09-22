import { Heading } from "@repo/ui/components/shadcn-ui/heading";
import { Separator } from "@repo/ui/components/shadcn-ui/separator";
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
} from "@repo/ui/components/shadcn-ui/sidebar";
import {
  Book,
  ChevronRight,
  Map,
  MenuIcon,
  PieChart,
  type LucideIcon,
} from "lucide-react";

type SidebarItem = {
  icon: LucideIcon;
  label: string;
  chevron?: LucideIcon;
}[];

const sidebarMenuItems: {
  title: string;
  items: SidebarItem;
}[] = [
  {
    title: "Overview",
    items: [
      { icon: PieChart, label: "Dashboard" },
      { icon: Book, label: "Reports" },
      { icon: MenuIcon, label: "Stock" },
      { icon: Map, label: "Regions", chevron: ChevronRight },
    ],
  },
  {
    title: "Reports",
    items: [
      { icon: Map, label: "Weekly Report", chevron: ChevronRight },
      { icon: Map, label: "Monthly Report", chevron: ChevronRight },
      { icon: Map, label: "Annual Report", chevron: ChevronRight },
    ],
  },
];

export default function TenantDashboard() {
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Heading variant="h5" className="font-semibold text-foreground">
          Tenant Dashboard
        </Heading>
      </SidebarHeader>
      <Separator className="bg-border" />
      <SidebarContent>
        <SidebarGroup className="gap-5">
          {sidebarMenuItems.map((menuItems, index) => (
            <SidebarMenu key={index}>
              <SidebarGroupLabel>{menuItems.title}</SidebarGroupLabel>
              {menuItems.items.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton>
                    <item.icon />
                    <span>{item.label}</span>
                    {item.chevron && <item.chevron className="ml-auto" />}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <Separator className="bg-border mt-5" />
            </SidebarMenu>
          ))}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
