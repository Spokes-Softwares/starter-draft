"use client";

/* Pagination chrome for DataTable. Prev/next only render when available. */

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../shadcn-ui/pagination";
import { ReactTable, type RowData } from "@tanstack/react-table";
import { DataTableFeatures } from "./features";

export default function DataTablePagination<TData extends RowData>({
  totalRows,
  showingRows,
  table,
}: {
  totalRows: number;
  showingRows: number;
  table: ReactTable<DataTableFeatures, TData>;
}) {
  return (
    <Pagination className="flex justify-end items-center">
      <p className="mr-auto">
        Showing {showingRows} of {totalRows} rows.
      </p>
      <PaginationContent>
        {table.getCanPreviousPage() ? (
          <PaginationItem>
            <PaginationPrevious onClick={table.previousPage} />
          </PaginationItem>
        ) : null}
        {table.getCanNextPage() ? (
          <PaginationItem>
            <PaginationNext onClick={table.nextPage} />
          </PaginationItem>
        ) : null}
      </PaginationContent>
    </Pagination>
  );
}
