"use client";

import { ReactTable, type RowData } from "@tanstack/react-table";
import { DataTableFeatures } from "./features";
import { Input } from "../shadcn-ui/input";

export default function DataTableFiltering<TData extends RowData>({
  table,
  columnId,
  placeholder = "Filter...",
}: {
  table: ReactTable<DataTableFeatures, TData>;
  columnId: string;
  placeholder?: string;
}) {
  return (
    <Input
      placeholder={placeholder}
      value={(table.getColumn(columnId)?.getFilterValue() as string) ?? ""}
      onChange={(event) =>
        table.getColumn(columnId)?.setFilterValue(event.target.value)
      }
      className="max-w-sm dark:bg-black"
    />
  );
}
