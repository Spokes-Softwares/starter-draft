-- Assets Table
create table public.assets (
    id uuid primary key default gen_random_uuid(),
    hub_id uuid not null references public.tenant_hubs (id) on delete cascade,
    reference_tag text,
    service_status text not null,
    created_at timestamptz default now() not null
);

alter table public.assets enable row level security;

-- Hubs, tenants and operators can view assets
create policy "Hubs, tenants and operators can view assets" on public.assets for
select
    using (
        public.is_hub_user(hub_id)
        OR public.is_hub_tenant(hub_id)
        OR public.is_operator()
    );

-- Hubs, tenants and operators can delete assets
create policy "Hubs, tenants and operators can delete assets" on public.assets for delete using (
    public.is_hub_user(hub_id)
    OR public.is_hub_tenant(hub_id)
    OR public.is_operator()
);

-- Hubs, tenants and operators can update assets
create policy "Hubs, tenants and operators can update assets" on public.assets for
update
    using (
        public.is_hub_user(hub_id)
        OR public.is_hub_tenant(hub_id)
        OR public.is_operator()
    ) with check (
        public.is_hub_user(hub_id)
        OR public.is_hub_tenant(hub_id)
        OR public.is_operator()
    );

-- Hubs, tenants and operators can insert new assets
create policy "Hubs, tenants and operators can insert new assets" on public.assets for
insert
    with check (
        public.is_hub_user(hub_id)
        OR public.is_hub_tenant(hub_id)
        OR public.is_operator()
    );

-- Only authenticated users can use the below grants
grant select, insert, update, delete on public.assets to authenticated, service_role;