import type { Json, Tables } from "../../types";

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

export type LatestMaintenanceRecord = {
  id: string;
  created_at: string;
  created_by: string;
  metadata: Json | null;
  parts: string[] | null;
  service_type: string;
  service_types: {
    type_name: string;
  };
};

export type AssetDetails = {
  id: string;
  created_at: string;
  service_status: string;
  reference_tag: string;
  hub_id: string;
  asset_types: {
    asset_type: string;
  };
  latest_maintenance_record: LatestMaintenanceRecord | null;
};
