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
import { DataTableFeatures } from "./features";
import { Row } from "@tanstack/react-table";
import { ExampleDataShape } from "./data";

export default function DataTableRowActions({
  row,
}: {
  row: Row<DataTableFeatures, ExampleDataShape>;
}) {
  return (
    <div className="relative z-20">
      {row.id}
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="ghost" className="w-8 h-8" />}
        >
          <MoreHorizontal size={4} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>View Tenant</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
