import {
  ListHubs,
  listHubsForTenant,
} from "@repo/db/queries/get-actions/list-hubs-for-tenant";
import { getTenant } from "@repo/db/queries/get-actions/get-single-tenant";
import PageHeader from "@repo/ui/shared/page-layouts/pageHeader";
import TenantTabs from "@/components/tenant-tabs/tenant-tabs";
import {
  listAssetsForTenant,
  TenantAssets,
} from "@repo/db/queries/get-actions/list-tenant-assets";
import { createSupabaseServerClient } from "@repo/db/server";
import HubOnboarding from "@/components/hub-onboard/hub-onboard";

async function TenantOverviewPageContent({
  hubs,
  assets,
  tenantId,
}: {
  hubs: ListHubs[];
  assets: TenantAssets[];
  tenantId: string;
}) {
  return (
    <div className="grid gap-10">
      <TenantTabs hubs={hubs} assets={assets} />
      <HubOnboarding tenantId={tenantId} />
    </div>
  );
}

export default async function TenantOverviewPage({
  params,
}: {
  params: Promise<{ tenant_id: string }>;
}) {
  const { tenant_id } = await params;
  const supabase = await createSupabaseServerClient();
  const [listHubs, tenant, assets] = await Promise.all([
    listHubsForTenant(supabase, tenant_id),
    getTenant(supabase, tenant_id),
    listAssetsForTenant(supabase, tenant_id),
  ]);

  return (
    <div className="grid gap-10">
      <PageHeader
        title={`${tenant.display_name}`}
        description={`You are viewing the details of: ${tenant.display_name}`}
      />
      <TenantOverviewPageContent
        hubs={listHubs}
        assets={assets}
        tenantId={tenant_id}
      />
    </div>
  );
}
