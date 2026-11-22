"use client";

import DataTable from "@repo/ui/components/data-table/table";
import { columns } from "./columns";
import type { Asset } from "@repo/db/queries/get-actions/types";

export default function TenantAssetsTable({ assets }: { assets: Asset[] }) {
  const filter = { columnId: "reference_tag", placeholder: "Filter assets..." };
  return (
    <DataTable
      data={assets}
      columns={columns}
      filter={filter}
      getRowHref={(row) => `/assets/${row.id}`}
      getRowAriaLabel={(row) => `View ${row.reference_tag ?? "asset"}`}
    />
  );
}
