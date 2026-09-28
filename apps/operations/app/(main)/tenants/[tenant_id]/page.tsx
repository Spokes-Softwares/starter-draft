export default async function TenantOverviewPage({
  params,
}: {
  params: Promise<{ tenant_id: string }>;
}) {
  const { tenant_id } = await params;
  return <div>This is the overview page for tenant {tenant_id}</div>;
}
