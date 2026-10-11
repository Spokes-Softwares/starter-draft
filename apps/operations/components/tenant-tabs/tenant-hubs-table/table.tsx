"use client";

import { ListHubs } from "@repo/db/queries/get-actions/list-hubs-for-tenant";
import DataTable from "@repo/ui/components/data-table/table";
import { columns } from "./columns";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { Button } from "@repo/ui/components/shadcn-ui/button";

export default function TenantHubsDataTable({ data }: { data: ListHubs[] }) {
  return (
    <div className="grid gap-4">
      <DataTable
        data={data}
        columns={columns}
        filter={{
          columnId: "display_name",
          placeholder: "Filter Hubs...",
        }}
        getRowHref={(row) => `/hubs/${row.id}`}
        getRowAriaLabel={(row) => `View ${row.display_name}`}
      />
      <Link href="/hubs/new" className="">
        <Button className="dark:bg-secondary hover:cursor-pointer">
          <PlusIcon />
          Add Hub
        </Button>
      </Link>
    </div>
  );
}
