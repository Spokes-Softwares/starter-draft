import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/shadcn-ui/tabs";
import HubSettingsTab from "./hub-settings/hub-settings";
import type { Asset } from "@repo/db/queries/get-actions/types";
import HubAssetsTab from "./hub-assets/hub-assets-tab";

export default function HubTabs({ assets }: { assets: Asset[] }) {
  const tabsTriggerList = [
    { value: "asset-overview", text: "Assets" },
    { value: "settings", text: "Hub Settings" },
  ];

  return (
    <Tabs defaultValue="asset-overview">
      <TabsList>
        {tabsTriggerList.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.text}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="asset-overview">
        <HubAssetsTab assets={assets} />
      </TabsContent>
      <TabsContent value="settings">
        <HubSettingsTab />
      </TabsContent>
    </Tabs>
  );
}
