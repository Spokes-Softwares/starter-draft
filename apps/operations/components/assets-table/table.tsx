"use client";

import { Assets } from "@repo/db/queries/get-actions/list-assets-for-hub";
import DataTable from "@repo/ui/components/data-table/table";
import { columns } from "./columns";

export default function AssetsDataTable({ data }: { data: Assets[] }) {
  const tableFilter = {
    columnId: "display_name",
    placeHolder: "Filter Assets",
  };

  return (
    <DataTable
      data={data}
      columns={columns}
      filter={tableFilter}
      getRowHref={(row) => `/assets/${row.id}`}
      getRowAriaLabel={(row) => `View ${row.display_name}`}
    />
  );
}
