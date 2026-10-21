import {
  DashboardStats,
  getOperationDashboardStats,
} from "@repo/db/queries/get-actions/get-operation-dashboard-stats";
import { createSupabaseServerClient } from "@repo/db/server";
import StatTile from "@repo/ui/components/dashboards/stat-tile";
import { Heading } from "@repo/ui/components/shadcn-ui/heading";

async function OperationsDashboardContent({ data }: { data: DashboardStats }) {
  const { numberOfAssets, numberOfHubs, numberOfTenants } = data;

  const TILES = [
    {
      title: " Tenants",
      tileData: numberOfTenants,
      tileTitle: "Lifetime Tenants",
    },
    { title: " Hubs", tileData: numberOfHubs, tileTitle: "Lifetime Hubs" },
    {
      title: " Assets",
      tileData: numberOfAssets,
      tileTitle: "Lifetime Assets",
    },
  ];

  return (
    <div className="grid gap-20">
      {TILES.map((tile) => (
        <section className="grid grid-cols-3 gap-4" key={tile.title}>
          <Heading variant="h3" className="col-span-3">
            {tile.title}
          </Heading>
          <StatTile title={tile.tileTitle} data={tile.tileData} />
        </section>
      ))}
    </div>
  );
}

export default async function OperationsPage() {
  const supabase = await createSupabaseServerClient();
  const data = await getOperationDashboardStats(supabase);

  return <OperationsDashboardContent data={data} />;
}
