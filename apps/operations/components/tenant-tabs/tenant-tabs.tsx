import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/shadcn-ui/tabs";
import TenantHubsDataTable from "./tenant-hubs-table/table";
import TenantAssetsTabContent from "./tenant-assets/tenant-assets-tab-content";
import TenantSettingsTab from "./tenant-settings/tenant-settings";
import { ListHubs } from "@repo/db/queries/get-actions/list-hubs-for-tenant";
import { TenantAssets } from "@repo/db/queries/get-actions/list-tenant-assets";

export default function TenantTabs({
  hubs,
  assets,
}: {
  hubs: ListHubs[];
  assets: TenantAssets[];
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
        <TenantHubsDataTable data={hubs} />
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
