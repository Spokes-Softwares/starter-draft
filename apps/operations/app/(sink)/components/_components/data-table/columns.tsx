"use client";
/* This is the main control centre of the columns of the table.
How the data will look in the table, how it is structured etc.
Sorting is also controlled here - i.e. which columns are sortable etc. */
import { createColumnHelper } from "@tanstack/react-table";
import { ExampleDataShape } from "./data";
import { DataTableFeatures } from "@repo/ui/components/data-table/features";
import { Button } from "@repo/ui/components/shadcn-ui/button";
import { ArrowUpDown } from "lucide-react";

import DataTableRowActions from "./row-actions";

const columnHelper = createColumnHelper<DataTableFeatures, ExampleDataShape>();

export const columns = columnHelper.columns([
  /* This is the method of sorting a column for tanstack */
  columnHelper.accessor("companyName", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <ArrowUpDown />
          Company Name
        </Button>
      );
    },
  }),
  columnHelper.accessor("displayName", { header: "Display Name" }),
  columnHelper.accessor("numberOfHubs", { header: "Number of Hubs" }),
  columnHelper.accessor("numberOfAssets", { header: "Number of Assets" }),
  columnHelper.display({
    id: "rowActions",
    cell: ({ row }) => {
      return <DataTableRowActions row={row} />;
    },
  }),
]);
