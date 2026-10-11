"use client";

import DataTable from "@repo/ui/components/data-table/table";
import { columns } from "./columns";
import { Tenant } from "@repo/db/queries/get-actions/list-all-tenants";

export default function TenantDataTable({ data }: { data: Tenant[] }) {
  const tableFilter = {
    columnId: "display_name",
    placeholder: "Filter companies...",
  };

  return (
    <DataTable
      data={data}
      columns={columns}
      filter={tableFilter}
      getRowHref={(row) => `/tenants/${row.id}`}
      getRowAriaLabel={(row) => `View ${row.company_name}`}
    />
  );
}
