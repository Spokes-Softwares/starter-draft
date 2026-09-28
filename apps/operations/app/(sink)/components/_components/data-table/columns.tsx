"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { ExampleDataShape } from "./data";
import { DataTableFeatures } from "./features";
import { Button } from "@repo/ui/components/shadcn-ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@repo/ui/components/shadcn-ui/dropdown-menu";

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
      return (
        <div className="relative z-20">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button variant="ghost" className="w-8 h-8" />}
            >
              <MoreHorizontal size={4} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>View Tenant</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  }),
]);
