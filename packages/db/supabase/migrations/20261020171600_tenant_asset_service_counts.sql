-- Counts of assets by tenant and service status.
-- security_invoker keeps RLS on tenants, tenant_hubs, and assets.

create view public.tenant_asset_service_counts
with (security_invoker = true) as
select
  t.id as tenant_id,
  t.display_name,
  t.company_name,
  a.service_status,
  count(a.id)::integer as asset_count
from public.tenants t
left join public.tenant_hubs h on h.tenant_id = t.id
left join public.assets a on a.hub_id = h.id
group by t.id, t.display_name, t.company_name, a.service_status;

grant select on public.tenant_asset_service_counts to authenticated, service_role;
