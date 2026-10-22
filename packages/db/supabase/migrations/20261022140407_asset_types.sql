create table public.asset_types (
    id uuid unique primary key default gen_random_uuid(),
    tenant_id uuid not null references public.tenants (id) on delete cascade,
    asset_type text not null,
    created_at timestamptz default now() not null
);

alter table public.asset_types enable row level security;

create policy "Operators, tenants and hubs can view asset types"
on public.asset_types
for select
using (
    is_operator()
    or is_tenant(tenant_id)
     or exists (
            select 1
            from public.tenant_hubs th
            where th.tenant_id = asset_types.tenant_id
              and public.is_hub_user(th.id)
        )
);

create policy "Tenants and Operators can insert into asset types"
on public.asset_types
for insert
with check (
    is_operator()
    or is_tenant(tenant_id)
);

create policy "Tenants and operators can delete from asset types"
on public.asset_types
for delete
using (
    is_operator()
    or is_tenant(tenant_id)
);

create policy "Tenants and operators can update asset types"
on public.asset_types
for update
using (
    is_operator()
    or is_tenant(tenant_id)
)
with check (
    is_operator()
    or is_tenant(tenant_id)
);

grant select on public.asset_types to authenticated, service_role;
grant insert on public.asset_types to authenticated, service_role;
grant update on public.asset_types to authenticated, service_role;
grant delete on public.asset_types to authenticated, service_role;

alter table public.assets
    add column asset_type uuid not null references public.asset_types (id) on delete cascade;
