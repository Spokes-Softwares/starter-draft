import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/shadcn-ui/tabs";
import TenantHubsDataTable from "./tenant-hubs-table/table";
import TenantAssetsTabContent from "./tenant-assets/tenant-assets-tab-content";
import TenantSettingsTab from "./tenant-settings/tenant-settings";
import HubOnboarding from "../hub-onboard/hub-onboard";
import type { Asset, tenantHub } from "@repo/db/queries/get-actions/types";

export default function TenantTabs({
  hubs,
  assets,
  tenantId,
}: {
  hubs: tenantHub[];
  assets: Asset[];
  tenantId: string;
}) {
  const tabsTriggerList = [
    { value: "hubs-table", text: "Hubs" },
    { value: "tenant-assets", text: "Assets" },
    { value: "settings", text: "Tenant Settings" },
  ];

  return (
    <Tabs defaultValue="hubs-table">
      <TabsList>
        {tabsTriggerList.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.text}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="hubs-table">
        <div className="grid gap-6">
          <TenantHubsDataTable data={hubs} />
          <HubOnboarding tenantId={tenantId} />
        </div>
      </TabsContent>
      <TabsContent value="tenant-assets">
        <TenantAssetsTabContent assets={assets} />
      </TabsContent>
      <TabsContent value="settings">
        <TenantSettingsTab />
      </TabsContent>
    </Tabs>
  );
}
