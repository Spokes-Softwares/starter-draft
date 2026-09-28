"use client";
/* This will be the main DataTable component - this will be used throughout all of the apps.
This will need to be as versatile as possible. We will try and keep it clean and have as little logic in here as possible.
All logic should be passed to it, instead of doing any logic in here. */
import Link from "next/link";
import {
  ColumnDef,
  useTable,
  type ColumnFiltersState,
  type SortingState,
} from "@tanstack/react-table";
import { ExampleDataShape } from "./data";
import { DataTableFeatures, features } from "./features";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/shadcn-ui/table";
import { useState } from "react";
import DataTablePagination from "./pagination";
import DataTableFiltering from "./filtering";

//Row actions are optional. This is the drop down that is on each row.
interface DataTableProps {
  columns: ColumnDef<DataTableFeatures, ExampleDataShape>[];
  data: ExampleDataShape[];
  rowActions?: React.ReactNode;
}

export default function DataTable({ data, columns }: DataTableProps) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useTable({
    features,
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
  });

  const totalRows = data.length;
  const showingRows = table.getRowModel().rows.length;

  return (
    <div className="max-w-250 grid gap-4">
      <DataTableFiltering table={table} />
      <div className="overflow-hidden rounded-md border border-secondary-foreground/50 dark:border-border">
        <Table>
          <TableHeader className="bg-secondary-foreground/50 dark:bg-secondary [&_th]:text-background dark:[&_th]:text-foreground border-b-secondary-foreground/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : (
                        <table.FlexRender header={header} />
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-transparent"
                >
                  {row.getVisibleCells().map((cell, index) => (
                    <TableCell key={cell.id} className="relative">
                      <Link
                        href={`/tenants/${row.original.id}`}
                        className="absolute inset-0 z-10"
                        aria-label={
                          index === 0
                            ? `View ${row.original.companyName}`
                            : undefined
                        }
                        aria-hidden={index === 0 ? undefined : true}
                        tabIndex={index === 0 ? undefined : -1}
                      />
                      <table.FlexRender cell={cell} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination
        totalRows={totalRows}
        showingRows={showingRows}
        table={table}
      />
    </div>
  );
}
