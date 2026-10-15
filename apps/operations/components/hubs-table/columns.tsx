import { Hub } from "@repo/db/queries/get-actions/list-all-hubs";
import { DataTableFeatures } from "@repo/ui/components/data-table/features";
import DataTableRowActions from "@repo/ui/components/data-table/row-actions";
import { Button } from "@repo/ui/components/shadcn-ui/button";
import { createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

const columnHelper = createColumnHelper<DataTableFeatures, Hub>();

export const columns = columnHelper.columns([
  columnHelper.accessor("display_name", {
    header: ({ column }) => {
      return (
        <Button className="p-0"variant="ghost" onClick={() => column.getIsSorted() === "asc"}>
          Display Name
          <ArrowUpDown />
        </Button>
      );
    },
  }),
  columnHelper.accessor("tenants.company_name", {
    header: ({ column }) => {
      return (
        <Button
          className="p-0"
          variant="ghost"
          onClick={() => column.getIsSorted() === "asc"}
        >
          Tenant Name
          <ArrowUpDown />
        </Button>
      );
    },
  }),
  columnHelper.accessor((row) => row.assets[0]?.count ?? 0, {
    id: "numberOfAssets",
    header: "Number of Assets",
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
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        menuItems={[{ text: "View Hub", href: (hub) => `/hubs/${hub.id}` }]}
      />
    ),
  }),
]);
