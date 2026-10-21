"use client";

import { ListHubs } from "@repo/db/queries/get-actions/list-hubs-for-tenant";
import DataTable from "@repo/ui/components/data-table/table";
import { columns } from "./columns";

export default function TenantHubsDataTable({ data }: { data: ListHubs[] }) {
  const tableFilter = {
    columnId: "display_name",
    placeholder: "Filter Hubs...",
  };
  return (
    <div className="grid gap-4">
      <DataTable
        data={data}
        columns={columns}
        filter={tableFilter}
        getRowHref={(row) => `/hubs/${row.id}`}
        getRowAriaLabel={(row) => `View ${row.display_name}`}
      />
    </div>
  );
}
