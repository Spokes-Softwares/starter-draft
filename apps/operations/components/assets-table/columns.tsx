"use client ";

import type { Asset } from "@repo/db/queries/get-actions/types";
import { DataTableFeatures } from "@repo/ui/components/data-table/features";
import DataTableRowActions from "@repo/ui/components/data-table/row-actions";
import { Button } from "@repo/ui/components/shadcn-ui/button";
import { createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

const columnHelper = createColumnHelper<DataTableFeatures, Asset>();

export const columns = columnHelper.columns([
  columnHelper.accessor("reference_tag", {
    header: ({ column }) => {
      return (
        <Button
          className="p-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Display Name
          <ArrowUpDown />
        </Button>
      );
    },
  }),
  columnHelper.accessor("created_at", {
    header: ({ column }) => {
      return (
        <Button
          className="p-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date Created
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ getValue }) =>
      new Date(getValue()).toLocaleDateString("en-gb", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
  }),
  columnHelper.display({
    id: "rowActions",
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        menuItems={[
          { text: "View Asset", href: (assets) => `/assets/${assets.id}` },
        ]}
      />
    ),
  }),
]);
