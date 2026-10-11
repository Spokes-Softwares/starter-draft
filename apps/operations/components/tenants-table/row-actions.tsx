"use client";

import { Button } from "@repo/ui/components/shadcn-ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@repo/ui/components/shadcn-ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { DataTableFeatures } from "@repo/ui/components/data-table/features";
import { Row } from "@tanstack/react-table";
import Link from "next/link";
import { Tenant } from "@repo/db/queries/get-actions/list-all-tenants";

export default function DataTableRowActions({
  row,
}: {
  row: Row<DataTableFeatures, Tenant>;
}) {
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
            <DropdownMenuItem
              render={
                <Link href={`/tenants/${row.original.id}`}>View Tenant </Link>
              }
            />
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
