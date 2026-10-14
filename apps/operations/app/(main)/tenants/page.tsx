import {
  listAllTenants,
  Tenant,
} from "@repo/db/queries/get-actions/list-all-tenants";
import { createSupabaseServerClient } from "@repo/db/server";
import TenantDataTable from "@/components/tenants-table/table";
import { PlusIcon } from "lucide-react";
import PageHeader from "@repo/ui/shared/page-layouts/pageHeader";
import PageShell from "@repo/ui/shared/page-layouts/pageShell";

async function TenantsPageContent({
  listOfTenants,
}: {
  listOfTenants: Tenant[];
}) {
  return <TenantDataTable data={listOfTenants} />;
}

export default async function TenantsPage() {
  const supabase = await createSupabaseServerClient();
  const listOfTenants = await listAllTenants(supabase);
  const headerLink = {
    href: "/tenants/new",
    text: "New Tenant",
    icon: <PlusIcon />,
  };

  return (
    <PageShell>
      <PageHeader
        title="Tenant Overviews"
        description="Click a tenant to view more"
        link={headerLink}
      />
      <TenantsPageContent listOfTenants={listOfTenants} />
    </PageShell>
  );
}
