"use client";

import { Hub } from "@repo/db/queries/get-actions/list-all-hubs";
import DataTable from "@repo/ui/components/data-table/table";
import { columns } from "./columns";

export default function HubsDataTable({ data }: { data: Hub[] }) {
  const tableFilter = {
    columnId: "display_name",
    placeholder: "Filter hubs...",
  };

  return (
    <DataTable
      data={data}
      columns={columns}
      filter={tableFilter}
      getRowHref={(row) => `/hubs/${row.id}`}
      getRowAriaLabel={(row) => `View ${row.display_name}`}
    />
  );
}
