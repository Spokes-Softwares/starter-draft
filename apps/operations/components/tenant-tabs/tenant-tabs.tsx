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
  return (
    <Tabs defaultValue="hubs-table">
      <TabsList>
        <TabsTrigger value="hubs-table">Hubs</TabsTrigger>
        <TabsTrigger value="tenant-assets">Assets</TabsTrigger>
        <TabsTrigger value="settings">Tenant Settings</TabsTrigger>
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
