import {
  listAllTenants,
  Tenant,
} from "@repo/db/queries/get-actions/list-all-tenants";
import TenantDataTable from "../../../components/tenants-table/table";

import { PlusIcon } from "lucide-react";
import PageHeader from "@repo/ui/shared/page-layouts/pageHeader";
import PageShell from "@repo/ui/shared/page-layouts/pageShell";

async function TenantsPageContent({ listTenants }: { listTenants: Tenant[] }) {
  return <TenantDataTable data={listTenants} />;
}

export default async function TenantsPage() {
  const listTenants = await listAllTenants();

  return (
    <PageShell>
      <PageHeader
        title="Tenant Overviews"
        description="Click a tenant to view more"
        link={{
          href: "/tenants/new",
          text: "New Tenant",
          icon: <PlusIcon />,
        }}
      />
      <TenantsPageContent listTenants={listTenants} />
    </PageShell>
  );
}
