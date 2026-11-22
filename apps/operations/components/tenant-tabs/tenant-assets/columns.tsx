"use client";

import type { Asset } from "@repo/db/queries/get-actions/types";
import { DataTableFeatures } from "@repo/ui/components/data-table/features";
import { Button } from "@repo/ui/components/shadcn-ui/button";
import { createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

const columnHelper = createColumnHelper<DataTableFeatures, Asset>();

export const columns = columnHelper.columns([
  columnHelper.accessor("reference_tag", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Asset Name
          <ArrowUpDown />
        </Button>
      );
    },
  }),
  columnHelper.accessor((row) => row.tenant_hubs.display_name, {
    id: "hub",
    header: "Hub",
  }),
  columnHelper.accessor("created_at", {
    header: "Created on",
    cell: ({ getValue }) =>
      new Date(getValue()).toLocaleDateString("en-gb", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
  }),
]);
