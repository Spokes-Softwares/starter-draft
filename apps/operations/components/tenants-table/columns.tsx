"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { DataTableFeatures } from "@repo/ui/components/data-table/features";
import { Button } from "@repo/ui/components/shadcn-ui/button";
import { ArrowUpDown } from "lucide-react";
import type { Tenant } from "@repo/db/queries/get-actions/types";
import DataTableRowActions from "@repo/ui/components/data-table/row-actions";

const columnHelper = createColumnHelper<DataTableFeatures, Tenant>();

export const columns = columnHelper.columns([
  columnHelper.accessor("display_name", {
    header: ({ column }) => {
      return (
        <Button
          className="p-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <ArrowUpDown />
          Display Name
        </Button>
      );
    },
  }),
  columnHelper.accessor("company_name", { header: "Company Name" }),
  columnHelper.display({
    id: "rowActions",
    cell: ({ row }) => {
      return (
        <DataTableRowActions
          row={row}
          menuItems={[
            {
              text: "View Tenant",
              href: (tenant) => `/tenants/${tenant.id}`,
            },
          ]}
        />
      );
    },
  }),
]);
