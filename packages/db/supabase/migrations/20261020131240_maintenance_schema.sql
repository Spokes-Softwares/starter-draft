-- Creating tables for phase 2, the maintenance side of things. 
-- This is simply for the MVP - not the entirety of the maintenance. 

create or replace function public.is_hub_admin(p_hub_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
    select exists (
        select 1
        from public.hub_users hu
        where hu.hub_id = p_hub_id
        and hu.user_id = auth.uid()
        and hu.user_role = 'admin'
    );
$$;

revoke all on function public.is_hub_admin(uuid) from public;
grant execute on function public.is_hub_admin(uuid) to authenticated;

DROP table if exists public.maintenance_records;
DROP table if exists public.service_types;
DROP table if exists public.parts;

-- Service types are owned at the tenant level
-- These service types are read by the hub for the level of service that is being performed on the asset
-- Full CRUD for Tenant
-- Read only for Hubs

CREATE table public.service_types (
    id uuid primary key default gen_random_uuid(),
    type_name text not null,
    tenant_id uuid not null references public.tenants (id) on delete cascade,
    created_at timestamptz default now() not null
);

ALTER TABLE public.service_types enable row level security;

CREATE policy "Operators, Tenants, Hub Admins and Hub Users can view service_types"
on public.service_types
for select
using (
        public.is_operator()
        or public.is_tenant(tenant_id)
        or exists (
            select 1
            from public.tenant_hubs th
            where th.tenant_id = service_types.tenant_id
              and public.is_hub_user(th.id)
        )
    );

CREATE policy "Operators and tenants can insert on service_types"
on public.service_types 
for insert
with check (
        public.is_operator()
        or public.is_tenant(tenant_id)
    );

CREATE policy "Operators and tenants can update on service_types"
on public.service_types
for update
using (
        public.is_operator()
        or public.is_tenant(tenant_id)
    ) with check (
        public.is_operator()
        or public.is_tenant(tenant_id)
    );

CREATE policy "Operators and tenants can delete on service_types"
on public.service_types 
for delete
using (
    public.is_operator()
    or public.is_tenant(tenant_id)
);

-- Maintenance records are owned on the asset level. One asset to many records
-- Hub Admins have create, delete and read access
-- Hub Users have read and create access
-- No one can update records
-- metadata is used to store descriptions, text, any extra information that is not captured through traditional inputs

CREATE table public.maintenance_records (
    id uuid primary key default gen_random_uuid(),
    asset_id uuid not null references public.assets (id) on delete cascade,
    parts text array,
    created_by uuid not null references public.hub_users (id) on delete cascade,
    metadata jsonb,
    service_type uuid not null references public.service_types (id) on delete cascade,
    created_at timestamptz default now() not null
);

ALTER TABLE public.maintenance_records enable row level security;

CREATE policy "Operators, Tenants and hubs can view on maintenance_records"
on public.maintenance_records
for select
using (
    exists (
        select 1
        from public.assets a
        where a.id = asset_id
          and (
            public.is_hub_user(a.hub_id)
            or public.is_hub_tenant(a.hub_id)
            or public.is_operator()
          )
    )
);

CREATE policy "Operators, Tenants and hubs can insert on maintenance_records"
on public.maintenance_records
for insert
with check (
    exists (
        select 1
        from public.assets a
        where a.id = asset_id
          and (
            public.is_hub_user(a.hub_id)
            or public.is_hub_tenant(a.hub_id)
            or public.is_operator()
          )
    )
);

CREATE policy "Operators can update on maintenance_records"
on public.maintenance_records
for update
using (
    public.is_operator()
)
with check (
    public.is_operator()
);

CREATE policy "Operators, tenants and hubs can delete on maintenance_records"
on public.maintenance_records
for delete
using (
    exists (
        select 1
        from public.assets a
        where a.id = asset_id
          and (
            public.is_hub_user(a.hub_id)
            or public.is_hub_tenant(a.hub_id)
            or public.is_operator()
          )
    )
);

-- Parts is still ongoing in terms of gaining access to data
-- Currently it is just hardcoded seeded data
-- Parts are owned at the tenant level
-- Tenants will be ordering, holding stock etc
-- Tenants have full CRUD access including price
-- Hub Admins have full CRUD access except for price
-- Hub Users can only read and update

CREATE table public.parts (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    stock_count numeric,
    price numeric(12, 2),
    tenant_id uuid not null references public.tenants (id) on delete cascade,
    unique_key text
);

ALTER TABLE public.parts enable row level security;

CREATE policy "Operators and tenants can insert into parts"
on public.parts 
for insert 
with check (
    public.is_operator()
    or public.is_tenant(tenant_id)
);

CREATE policy "Operators, tenants and hubs can view parts"
on public.parts
for select
using (
    public.is_operator()
    or public.is_tenant(tenant_id)
    or exists (
        select 1
        from public.tenant_hubs th
        where th.tenant_id = parts.tenant_id
          and public.is_hub_user(th.id)
    )
);

CREATE policy "Operators, tenants and hubs can update parts"
on public.parts
for update
using (
    public.is_operator()
    or public.is_tenant(tenant_id)
    or exists (
        select 1
        from public.tenant_hubs th
        where th.tenant_id = parts.tenant_id
          and public.is_hub_user(th.id)
    )
) with check (
    public.is_operator()
    or public.is_tenant(tenant_id)
    or exists (
        select 1
        from public.tenant_hubs th
        where th.tenant_id = parts.tenant_id
          and public.is_hub_user(th.id)
    )
);

CREATE policy "Operators and tenants can delete parts"
on public.parts
for delete
using (
    public.is_operator()
    or public.is_tenant(tenant_id)
);

GRANT insert, select, delete, update on public.service_types to authenticated, service_role;
GRANT insert, select, delete, update on public.maintenance_records to authenticated, service_role;
GRANT insert, select, delete, update on public.parts to authenticated, service_role;