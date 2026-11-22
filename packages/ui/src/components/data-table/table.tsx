"use client";

/* Shared DataTable shell — apps supply columns, data, and optional row hrefs.
This is the engine for all the data tables in the repo - this will grow and develop as further 
table features are needed */

import {
  ColumnDef,
  useTable,
  type ColumnFiltersState,
  type RowData,
  type SortingState,
} from "@tanstack/react-table";
import { DataTableFeatures, features } from "./features";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../shadcn-ui/table";
import Link from "next/link";
import { useState } from "react";
import DataTablePagination from "./pagination";
import DataTableFiltering from "./filtering";

export interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<DataTableFeatures, TData>[];
  data: TData[];
  filter?: {
    columnId: string;
    placeholder?: string;
  };
  getRowHref?: (row: TData) => string;
  getRowAriaLabel?: (row: TData) => string;
}

export default function DataTable<TData extends RowData>({
  data,
  columns,
  filter,
  getRowHref,
  getRowAriaLabel,
}: DataTableProps<TData>) {
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
    <div className="min-w-0 grid gap-4">
      {filter ? (
        <DataTableFiltering
          table={table}
          columnId={filter.columnId}
          placeholder={filter.placeholder}
        />
      ) : null}
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
              table.getRowModel().rows.map((row) => {
                const href = getRowHref?.(row.original);
                return (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="hover:bg-secondary/50"
                  >
                    {row.getVisibleCells().map((cell, index) => (
                      <TableCell key={cell.id} className="relative">
                        {href ? (
                          <Link
                            href={href}
                            className="absolute inset-0 z-10"
                            aria-label={
                              index === 0
                                ? getRowAriaLabel?.(row.original)
                                : undefined
                            }
                            aria-hidden={index === 0 ? undefined : true}
                            tabIndex={index === 0 ? undefined : -1}
                          />
                        ) : null}
                        <table.FlexRender cell={cell} />
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
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
