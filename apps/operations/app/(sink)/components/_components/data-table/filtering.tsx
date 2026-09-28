"use client";
/* This is where we can control the filtering of the table. */
import { ReactTable } from "@tanstack/react-table";
import { DataTableFeatures } from "./features";
import { ExampleDataShape } from "./data";
import { Input } from "@repo/ui/components/shadcn-ui/input";

export default function DataTableFiltering({
  table,
}: {
  table: ReactTable<DataTableFeatures, ExampleDataShape>;
}) {
  return (
    <Input
      placeholder="Filter companies..."
      value={(table.getColumn("companyName")?.getFilterValue() as string) ?? ""}
      onChange={(event) =>
        table.getColumn("companyName")?.setFilterValue(event.target.value)
      }
      className="max-w-sm dark:bg-black"
    />
  );
}
