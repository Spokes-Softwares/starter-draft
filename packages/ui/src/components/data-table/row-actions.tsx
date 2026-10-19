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
import { Row, type RowData } from "@tanstack/react-table";
import { DataTableFeatures } from "./features";

type MenuItem<TData> = {
  text: string;
  href: (row: TData) => string;
};

export default function DataTableRowActions<TData extends RowData>({
  row,
  menuItems,
}: {
  row: Row<DataTableFeatures, TData>;
  menuItems: MenuItem<TData>[];
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
                render={<a href={item.href(row.original)}>{item.text}</a>}
              />
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
