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
<<<<<<< HEAD
<<<<<<<< HEAD:packages/ui/src/components/data-table/row-actions.tsx
import { Row, type RowData } from "@tanstack/react-table";
import { DataTableFeatures } from "./features";
========
import { DataTableFeatures } from "@repo/ui/components/data-table/features";
import { Row } from "@tanstack/react-table";
import Link from "next/link";
import type { tenantHub } from "@repo/db/queries/get-actions/types";
>>>>>>>> feat/maintenance-seeding:apps/tenant/components/list-hubs-table/row-actions.tsx
=======
import Link from "next/link";
import { Row, type RowData } from "@tanstack/react-table";
import { DataTableFeatures } from "./features";
>>>>>>> feat/maintenance-seeding

type MenuItem<TData> = {
  text: string;
  href: (row: TData) => string;
};

export default function DataTableRowActions<TData extends RowData>({
  row,
  menuItems,
}: {
<<<<<<< HEAD
<<<<<<<< HEAD:packages/ui/src/components/data-table/row-actions.tsx
  row: Row<DataTableFeatures, TData>;
  menuItems: MenuItem<TData>[];
========
  row: Row<DataTableFeatures, tenantHub>;
>>>>>>>> feat/maintenance-seeding:apps/tenant/components/list-hubs-table/row-actions.tsx
=======
  row: Row<DataTableFeatures, TData>;
  menuItems: MenuItem<TData>[];
>>>>>>> feat/maintenance-seeding
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
            {menuItems.map((item) => (
              <DropdownMenuItem
                key={item.text}
<<<<<<< HEAD
                render={<a href={item.href(row.original)}>{item.text}</a>}
=======
                render={<Link href={item.href(row.original)}>{item.text}</Link>}
>>>>>>> feat/maintenance-seeding
              />
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
