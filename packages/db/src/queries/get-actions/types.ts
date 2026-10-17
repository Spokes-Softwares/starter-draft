import { Tables } from "../../types";

export type DashboardStats = {
    numberOfAssets: number;
    numberOfTenants: number;
    numberOfHubs: number;
};

export type Tenant = Tables<"tenants">;

export type Hub = {
  id: string;
  display_name: string;
  tenant_id: string;
  created_at: string;
  tenants: {
    company_name: string;
    display_name: string | null;
  };
  assets: { count: number }[];
};

export type Asset = {
  created_at: string;
  display_name: string | null;
  hub_id: string;
  id: string;
  tenant_hubs: {
    display_name: string;
    tenant_id: string;
  };
};
