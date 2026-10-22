import AssetServiceChart from "@/components/charts/asset-service-status-chart";
import {
  listTenantAssetServiceCounts,
  type TenantAssetServiceCount,
} from "@repo/db/queries/get-actions/list-tenant-asset-service-counts";
import { createSupabaseServerClient } from "@repo/db/server";
import PageHeader from "@repo/ui/shared/page-layouts/pageHeader";
import PageShell from "@repo/ui/shared/page-layouts/pageShell";

type tenantGroups = [
  string,
  {
    asset_count: number | null;
    company_name: string | null;
    display_name: string | null;
    service_status: string | null;
    tenant_id: string | null;
  }[],
][];

function groupByTenant(rows: TenantAssetServiceCount[]): tenantGroups {
  const groups = new Map<string, TenantAssetServiceCount[]>();

  for (const row of rows) {
    if (!row.tenant_id) continue;
    const existing = groups.get(row.tenant_id) ?? [];
    existing.push(row);
    groups.set(row.tenant_id, existing);
  }

  return [...groups.entries()];
}

function AssetsPageContent({ tenants }: { tenants: tenantGroups }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {tenants.map(([tenantId, rows]) => {
        const companyName = rows[0]?.company_name ?? "";
        const title = rows[0]?.display_name ?? companyName;

        return (
          <AssetServiceChart
            key={tenantId}
            title={title}
            description={companyName}
            counts={rows}
          />
        );
      })}
    </div>
  );
}

export default async function AssetsPage() {
  const client = await createSupabaseServerClient();
  const counts = await listTenantAssetServiceCounts(client);
  const tenants = groupByTenant(counts);

  return (
    <PageShell>
      <PageHeader title="An overview of all assets on the platform" />
      <AssetsPageContent tenants={tenants} />
    </PageShell>
  );
}
