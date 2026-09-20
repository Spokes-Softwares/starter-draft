import {
  Bot,
  BuildingComplex,
  Houses,
  LayoutDashboard,
  LucideIcon,
} from "lucide-react";
import { Route } from "next";

export type NavConfigItem = {
  label: string;
  icon?: LucideIcon;
  href: Route;
  children?: NavConfigItemChildren[];
};
export type NavConfigItemChildren = {
  label: string;
  href: Route;
};

export const MAIN_NAV_ROUTES = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "Tenants",
    icon: BuildingComplex,
    href: "/tenants",
    children: [
      {
        label: "Invite Tenant",
        href: "/tenants/new",
      },
    ],
  },
  {
    label: "Hubs",
    icon: Houses,
    href: "/hubs",
    children: [
      {
        label: "New Hub",
        href: "/hub/new",
      },
    ],
  },
  {
    label: "Assets",
    icon: Bot,
    href: "/assets",
    children: [
      {
        label: "Onboard Assets",
        href: "/assets/onboard",
      },
    ],
  },
] satisfies NavConfigItem[];

export const REPORT_NAV_ROUTES = [
  {
    label: "Tenants Reports",
    icon: BuildingComplex,
    href: "/tenant-overview",
  },
  {
    label: "Hub Reports",
    icon: BuildingComplex,
    href: "/hub-overview",
  },
  {
    label: "Asset Reports",
    icon: BuildingComplex,
    href: "/asset-overview",
  },
] satisfies NavConfigItem[];

export const USER_NAV_ROUTES = [
  {
    label: "Profile",
    href: "/profile",
  },
  {
    label: "Settings",
    href: "/settings",
  },
];
