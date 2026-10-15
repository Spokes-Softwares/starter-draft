export default async function AssetOverviewPage({
  params,
}: {
  params: Promise<{ asset_id: string }>;
}) {
  const { asset_id } = await params;

  return (
    <div>
      This is where the overview page will be for a single asset: {asset_id}
    </div>
  );
}
