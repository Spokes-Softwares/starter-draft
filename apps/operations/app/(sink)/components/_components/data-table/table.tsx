"use client";

import Link from "next/link";
import { ColumnDef, useTable } from "@tanstack/react-table";
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@repo/ui/components/shadcn-ui/pagination";

interface DataTableProps {
  columns: ColumnDef<DataTableFeatures, ExampleDataShape>[];
  data: ExampleDataShape[];
  rowActions?: React.ReactNode;
}

export default function DataTable({ data, columns }: DataTableProps) {
  const table = useTable({
    features,
    data,
    columns,
  });

  return (
    <div>
      <div className="overflow-hidden rounded-md border border-secondary-foreground/50 dark:border-border max-w-250">
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
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
