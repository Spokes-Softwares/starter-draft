import { listHubsForTenant } from "@repo/db/queries/get-actions/list-hubs-for-tenant";
import { getTenant } from "@repo/db/queries/get-actions/get-single-tenant";
import PageHeader from "@repo/ui/shared/page-layouts/pageHeader";
import TenantTabs from "@/components/tenant-tabs/tenant-tabs";
import { listAssetsForTenant } from "@repo/db/queries/get-actions/list-tenant-assets";
import { listTenantAssetServiceCounts } from "@repo/db/queries/get-actions/list-tenant-asset-service-counts";
import { createSupabaseServerClient } from "@repo/db/server";
import type {
  Asset,
  Tenant,
  tenantHub,
} from "@repo/db/queries/get-actions/types";
import type { TenantAssetServiceCount } from "@repo/db/queries/get-actions/list-tenant-asset-service-counts";
import PageShell from "@repo/ui/shared/page-layouts/pageShell";
import {
  listTenantAssetTypes,
  TenantAssetTypeCount,
} from "@repo/db/queries/get-actions/list-tenant-asset-types";

async function TenantOverviewPageContent({
  hubs,
  assets,
  tenantId,
  tenant,
  serviceCounts,
  assetTypes,
}: {
  hubs: tenantHub[];
  assets: Asset[];
  tenantId: string;
  tenant: Tenant;
  serviceCounts: TenantAssetServiceCount[];
  assetTypes: TenantAssetTypeCount[];
}) {
  return (
    <TenantTabs
      hubs={hubs}
      assets={assets}
      tenantId={tenantId}
      tenant={tenant}
      serviceCounts={serviceCounts}
      assetTypes={assetTypes}
    />
  );
}

export default async function TenantOverviewPage({
  params,
}: {
  params: Promise<{ tenant_id: string }>;
}) {
  const { tenant_id } = await params;
  const supabase = await createSupabaseServerClient();
  const [listHubs, tenant, assets, serviceCounts, assetTypes] =
    await Promise.all([
      listHubsForTenant(supabase, tenant_id),
      getTenant(supabase, tenant_id),
      listAssetsForTenant(supabase, tenant_id),
      listTenantAssetServiceCounts(supabase, tenant_id),
      listTenantAssetTypes(supabase, tenant_id),
    ]);

  return (
    <PageShell>
      <PageHeader
        title={`${tenant.display_name}`}
        description={`You are viewing the details of: ${tenant.display_name}`}
      />
      <TenantOverviewPageContent
        hubs={listHubs}
        assets={assets}
        tenantId={tenant_id}
        tenant={tenant}
        serviceCounts={serviceCounts}
        assetTypes={assetTypes}
      />
    </PageShell>
  );
}
