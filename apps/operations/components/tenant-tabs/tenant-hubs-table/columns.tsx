"use client";

import { ListHubs } from "@repo/db/queries/get-actions/list-hubs-for-tenant";
import { DataTableFeatures } from "@repo/ui/components/data-table/features";
import { Button } from "@repo/ui/components/shadcn-ui/button/button";
import { createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import DataTableRowActions from "./row-actions";

const columnHelper = createColumnHelper<DataTableFeatures, ListHubs>();

export const columns = columnHelper.columns([
  columnHelper.accessor("display_name", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Hub Name
          <ArrowUpDown />
        </Button>
      );
    },
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
  columnHelper.display({
    id: "rowActions",
    cell: ({ row }) => {
      return <DataTableRowActions row={row} />;
    },
  }),
]);
