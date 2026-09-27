export default async function HubOverviewPage({
  params,
}: {
  params: Promise<{ hubId: string }>;
}) {
  const { hubId } = await params;

  return <div> This will be the overview page of a single hub. {hubId}</div>;
}
