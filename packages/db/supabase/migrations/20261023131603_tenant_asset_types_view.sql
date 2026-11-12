-- Counts of assets by tenant and asset type.
-- security_invoker keeps RLS on tenants, asset_types, and assets.

create view public.tenant_asset_types
with (security_invoker = true) as
select
  t.id as tenant_id,
  t.display_name,
  t.company_name,
  at.asset_type,
  count(a.id)::integer as asset_count
from public.tenants t
left join public.asset_types at on at.tenant_id = t.id
left join public.assets a on a.asset_type = at.id
group by t.id, t.display_name, t.company_name, at.asset_type;

grant select on public.tenant_asset_types to authenticated, service_role;
