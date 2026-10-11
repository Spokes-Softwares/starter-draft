import {
  ListHubs,
  listHubsForTenant,
} from "@repo/db/queries/get-actions/list-hubs-for-tenant";
import { getTenant } from "@repo/db/queries/get-actions/get-single-tenant";
import PageHeader from "@repo/ui/shared/page-layouts/pageHeader";
import TenantTabs from "../../../../components/tenant-tabs/tenant-tabs";
import {
  listAssetsForTenant,
  TenantAssets,
} from "@repo/db/queries/get-actions/list-tenant-assets";

async function TenantOverviewPageContent({
  hubs,
  assets,
}: {
  hubs: ListHubs[];
  assets: TenantAssets[];
}) {
  return <TenantTabs hubs={hubs} assets={assets} />;
}

export default async function TenantOverviewPage({
  params,
}: {
  params: Promise<{ tenant_id: string }>;
}) {
  const { tenant_id } = await params;
  const [listHubs, tenant, assets] = await Promise.all([
    listHubsForTenant(tenant_id),
    getTenant(tenant_id),
    listAssetsForTenant(tenant_id),
  ]);

  return (
    <div className="grid gap-10">
      <PageHeader
        title={`${tenant.display_name}`}
        description={`You are viewing the details of: ${tenant.display_name}`}
      />
      <TenantOverviewPageContent hubs={listHubs} assets={assets} />
    </div>
  );
}
