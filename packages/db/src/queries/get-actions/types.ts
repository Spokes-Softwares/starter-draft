import type { Tables } from "../../types";

export type DashboardStats = {
  numberOfAssets: number;
  numberOfTenants: number;
  numberOfHubs: number;
};

export type Tenant = Tables<"tenants">;

export type tenantHub = {
  id: string;
  display_name: string;
  tenant_id: string;
  created_at: string;
  assets: { count: number }[];
};

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
  reference_tag: string | null;
  asset_type: string;
  hub_id: string;
  service_status: string;
  id: string;
  tenant_hubs: {
    display_name: string;
    tenant_id: string;
  };
};
