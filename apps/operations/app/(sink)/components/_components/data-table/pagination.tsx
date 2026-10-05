"use client";

/* This controls the pagination of the table.
The previous and next buttons only appear when there is a previous or next page to navigate to 
otherwise they do not show. 
Part of this page is also how many results are actually shown compared to total results.
 */

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@repo/ui/components/shadcn-ui/pagination";
import { ReactTable } from "@tanstack/react-table";
import { DataTableFeatures } from "./features";
import { ExampleDataShape } from "./data";

export default function DataTablePagination({
  totalRows,
  showingRows,
  table,
}: {
  totalRows: number;
  showingRows: number;
  table: ReactTable<DataTableFeatures, ExampleDataShape>;
}) {
  return (
    <Pagination className="flex justify-end items-center">
      <p className="mr-auto">
        {`Showing ${showingRows} of ${totalRows} rows.`}
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
