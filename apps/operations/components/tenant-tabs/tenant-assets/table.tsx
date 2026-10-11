"use client";

import { TenantAssets } from "@repo/db/queries/get-actions/list-tenant-assets";
import DataTable from "@repo/ui/components/data-table/table";
import { columns } from "./columns";

export default function TenantAssetsTable({
  assets,
}: {
  assets: TenantAssets[];
}) {
  return (
    <DataTable
      data={assets}
      columns={columns}
      filter={{
        columnId: "display_name",
        placeholder: "Filter assets...",
      }}
      getRowHref={(row) => `/assets/${row.id}`}
      getRowAriaLabel={(row) => `View ${row.display_name ?? "asset"}`}
    />
  );
}
