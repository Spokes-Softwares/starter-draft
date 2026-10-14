"use client";

import { Button } from "@repo/ui/components/shadcn-ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@repo/ui/components/shadcn-ui/collapsible";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import HubOnboardForm from "../forms/hub-onboard/hub-onboard-form";

export default function HubOnboarding({ tenantId }: { tenantId: string }) {
  const [open, setIsOpen] = useState<boolean>(false);

  return (
    <Collapsible
      open={open}
      onOpenChange={setIsOpen}
      className="data-open:bg-secondary/40 rounded-xl"
    >
      <CollapsibleTrigger
        render={
          <Button className="w-full" type="button">
            <PlusIcon />
            Onboard Hub
          </Button>
        }
      />
      <CollapsibleContent>
        <HubOnboardForm tenantId={tenantId} />
      </CollapsibleContent>
    </Collapsible>
  );
}
