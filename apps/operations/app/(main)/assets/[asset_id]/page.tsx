export default async function AssetOverviewPage({
  params,
}: {
  params: Promise<{ assetId: string }>;
}) {
  const { assetId } = await params;

  return (
    <div>
      This is where the overview page will be for a single asset: {assetId}
    </div>
  );
}
