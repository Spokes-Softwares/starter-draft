-- tenant table to create a multi-tenant platform.
-- Each tenant will effectively be a company that has access to the platform.
-- Each hub will be attached to a tenant.
-- Each tenant can have multiple users.

-- Tenants
create table public.tenants (
  id uuid primary key default gen_random_uuid(),
  display_name text not null,
  created_at timestamptz default now() not null
);

-- Users for each tenant
create table public.tenant_users (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz default now() not null,
  unique (tenant_id, user_id)
);

-- Hubs for a specific tenant
create table public.tenant_hubs (
  id uuid primary key default gen_random_uuid(),
  display_name text not null,
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  created_at timestamptz default now() not null
);

-- Users for specific hubs
create table public.hub_users (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  hub_id uuid not null references public.tenant_hubs (id) on delete cascade,
  created_at timestamptz default now() not null,
  unique (hub_id, user_id)
);

-- Whether the current user is an operator
create or replace function public.is_operator()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.is_operator = true
  );
$$;

revoke all on function public.is_operator() from public;
grant execute on function public.is_operator() to authenticated;

-- Whether the current user belongs to the given tenant
create or replace function public.is_tenant(p_tenant_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.tenant_users tu
    where tu.tenant_id = p_tenant_id
      and tu.user_id = auth.uid()
  );
$$;

revoke all on function public.is_tenant(uuid) from public;
grant execute on function public.is_tenant(uuid) to authenticated;

-- Whether the current user belongs to the given hub
create or replace function public.is_hub_user(p_hub_id uuid)
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
  );
$$;

revoke all on function public.is_hub_user(uuid) from public;
grant execute on function public.is_hub_user(uuid) to authenticated;

--Check that the hub is a member of the tenant
create or replace function public.is_hub_tenant(p_hub_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$ 
    select exists (
        select 1 
        from public.tenant_hubs th
        where th.id = p_hub_id
        and public.is_tenant(th.tenant_id)
    );
$$;
revoke all on function public.is_hub_tenant(uuid) from public;
grant execute on function public.is_hub_tenant(uuid) to authenticated;

alter table public.tenants enable row level security;
alter table public.tenant_users enable row level security;
alter table public.tenant_hubs enable row level security;
alter table public.hub_users enable row level security;

-- tenants policies
create policy "Operators and tenants can view tenants"
  on public.tenants
  for select
  using (
    public.is_operator()
    or public.is_tenant(id)
  );

create policy "Operators can insert new tenants"
  on public.tenants
  for insert
  with check (public.is_operator());

create policy "Operators and tenants can update tenants"
  on public.tenants
  for update
  using (
    public.is_operator()
    or public.is_tenant(id)
  )
  with check (
    public.is_operator()
    or public.is_tenant(id)
  );

create policy "Operators can delete tenants"
  on public.tenants
  for delete
  using (public.is_operator());

-- tenant_users policies
create policy "Operators and tenants can view tenant users"
  on public.tenant_users
  for select
  using (
    public.is_operator()
    or public.is_tenant(tenant_id)
  );

create policy "Operators can insert new tenant users"
  on public.tenant_users
  for insert
  with check (public.is_operator());

create policy "Operators and tenants can update tenant users"
  on public.tenant_users
  for update
  using (
    public.is_operator()
    or public.is_tenant(tenant_id)
  )
  with check (
    public.is_operator()
    or public.is_tenant(tenant_id)
  );

create policy "Operators can delete tenant users"
  on public.tenant_users
  for delete
  using (public.is_operator());

-- tenant_hubs policies
create policy "Operators, tenants and hub users can view hubs"
  on public.tenant_hubs
  for select
  using (
    public.is_operator()
    or public.is_tenant(tenant_id)
    or public.is_hub_user(id)
  );

create policy "Operators and tenants can insert hubs"
  on public.tenant_hubs
  for insert
  with check (
    public.is_operator()
    or public.is_tenant(tenant_id)
  );

create policy "Operators and tenants can update hubs"
  on public.tenant_hubs
  for update
  using (
    public.is_operator()
    or public.is_tenant(tenant_id)
  )
  with check (
    public.is_operator()
    or public.is_tenant(tenant_id)
  );

create policy "Operators and tenants can delete hubs"
  on public.tenant_hubs
  for delete
  using (
    public.is_operator()
    or public.is_tenant(tenant_id)
  );

-- hub_users policies
create policy "Operators, tenants and hub users can view hub users"
  on public.hub_users
  for select
  using (
    public.is_operator()
    or public.is_hub_user(hub_id)
    or public.is_hub_tenant(hub_id)
  );

create policy "Operators and tenants can insert hub users"
  on public.hub_users
  for insert
  with check (
    public.is_operator()
    or public.is_hub_tenant(hub_id)
  );

create policy "Operators and tenants can update hub users"
  on public.hub_users
  for update
  using (
    public.is_operator()
    or public.is_hub_tenant(hub_id)
  )
  with check (
    public.is_operator()
    or public.is_hub_tenant(hub_id)
  );

create policy "Operators and tenants can delete hub users"
  on public.hub_users
  for delete
  using (
    public.is_operator()
    or public.is_hub_tenant(hub_id)
  );
