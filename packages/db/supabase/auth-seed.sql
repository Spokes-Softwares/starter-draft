-- Auth + tenancy seeding (local development only)
-- Operators are staff (platform-wide)
-- Tenants are companies (admins of a company)
-- Hubs are areas where the assets are (scoped under a tenant)
--
-- All accounts use password: securepassword
--
-- Seed: 2 operators, 2 tenants, 4 hubs = 8 auth accounts
--   operator1@spokes.test / operator2@spokes.test
--   tenant1@spokes.test / tenant2@spokes.test
--   hub1@spokes.test / hub2@spokes.test / hub3@spokes.test / hub4@spokes.test
--
-- Layout:
--   Tenant One  -> hub1, hub2
--   Tenant Two  -> hub3, hub4
--
-- Profiles are created automatically by public.handle_new_user()
-- (trigger on_auth_user_created) when rows are inserted into auth.users.

create extension if not exists pgcrypto;

INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
)
VALUES
  (
    '00000000-0000-0000-0000-000000000000',
    '11111111-1111-4111-8111-111111111111'::uuid,
    'authenticated',
    'authenticated',
    'operator1@spokes.test',
    crypt('securepassword', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"first_name":"Harriet","last_name":"Blundell","account_type":"operator"}'::jsonb,
    now(),
    now(),
    '',
    '',
    '',
    ''
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    '11111111-1111-4111-8111-111111111112'::uuid,
    'authenticated',
    'authenticated',
    'operator2@spokes.test',
    crypt('securepassword', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"first_name":"Joseph","last_name":"Helmore","account_type":"operator"}'::jsonb,
    now(),
    now(),
    '',
    '',
    '',
    ''
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    '22222222-2222-4222-8222-222222222221'::uuid,
    'authenticated',
    'authenticated',
    'tenant1@spokes.test',
    crypt('securepassword', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"first_name":"Tenant","last_name":"One","account_type":"tenant"}'::jsonb,
    now(),
    now(),
    '',
    '',
    '',
    ''
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    '22222222-2222-4222-8222-222222222222'::uuid,
    'authenticated',
    'authenticated',
    'tenant2@spokes.test',
    crypt('securepassword', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"first_name":"Tenant","last_name":"Two","account_type":"tenant"}'::jsonb,
    now(),
    now(),
    '',
    '',
    '',
    ''
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    '33333333-3333-4333-8333-333333333331'::uuid,
    'authenticated',
    'authenticated',
    'hub1@spokes.test',
    crypt('securepassword', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"first_name":"Hub","last_name":"One","account_type":"hub"}'::jsonb,
    now(),
    now(),
    '',
    '',
    '',
    ''
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    '33333333-3333-4333-8333-333333333332'::uuid,
    'authenticated',
    'authenticated',
    'hub2@spokes.test',
    crypt('securepassword', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"first_name":"Hub","last_name":"Two","account_type":"hub"}'::jsonb,
    now(),
    now(),
    '',
    '',
    '',
    ''
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    '33333333-3333-4333-8333-333333333333'::uuid,
    'authenticated',
    'authenticated',
    'hub3@spokes.test',
    crypt('securepassword', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"first_name":"Hub","last_name":"Three","account_type":"hub"}'::jsonb,
    now(),
    now(),
    '',
    '',
    '',
    ''
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    '33333333-3333-4333-8333-333333333334'::uuid,
    'authenticated',
    'authenticated',
    'hub4@spokes.test',
    crypt('securepassword', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"first_name":"Hub","last_name":"Four","account_type":"hub"}'::jsonb,
    now(),
    now(),
    '',
    '',
    '',
    ''
  );

INSERT INTO auth.identities (
  id,
  user_id,
  identity_data,
  provider,
  provider_id,
  last_sign_in_at,
  created_at,
  updated_at
)
VALUES
  (
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa1'::uuid,
    '11111111-1111-4111-8111-111111111111'::uuid,
    '{"sub":"11111111-1111-4111-8111-111111111111","email":"operator1@spokes.test","email_verified":true}'::jsonb,
    'email',
    '11111111-1111-4111-8111-111111111111',
    now(),
    now(),
    now()
  ),
  (
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa8'::uuid,
    '11111111-1111-4111-8111-111111111112'::uuid,
    '{"sub":"11111111-1111-4111-8111-111111111112","email":"operator2@spokes.test","email_verified":true}'::jsonb,
    'email',
    '11111111-1111-4111-8111-111111111112',
    now(),
    now(),
    now()
  ),
  (
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa2'::uuid,
    '22222222-2222-4222-8222-222222222221'::uuid,
    '{"sub":"22222222-2222-4222-8222-222222222221","email":"tenant1@spokes.test","email_verified":true}'::jsonb,
    'email',
    '22222222-2222-4222-8222-222222222221',
    now(),
    now(),
    now()
  ),
  (
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa3'::uuid,
    '22222222-2222-4222-8222-222222222222'::uuid,
    '{"sub":"22222222-2222-4222-8222-222222222222","email":"tenant2@spokes.test","email_verified":true}'::jsonb,
    'email',
    '22222222-2222-4222-8222-222222222222',
    now(),
    now(),
    now()
  ),
  (
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa4'::uuid,
    '33333333-3333-4333-8333-333333333331'::uuid,
    '{"sub":"33333333-3333-4333-8333-333333333331","email":"hub1@spokes.test","email_verified":true}'::jsonb,
    'email',
    '33333333-3333-4333-8333-333333333331',
    now(),
    now(),
    now()
  ),
  (
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa5'::uuid,
    '33333333-3333-4333-8333-333333333332'::uuid,
    '{"sub":"33333333-3333-4333-8333-333333333332","email":"hub2@spokes.test","email_verified":true}'::jsonb,
    'email',
    '33333333-3333-4333-8333-333333333332',
    now(),
    now(),
    now()
  ),
  (
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa6'::uuid,
    '33333333-3333-4333-8333-333333333333'::uuid,
    '{"sub":"33333333-3333-4333-8333-333333333333","email":"hub3@spokes.test","email_verified":true}'::jsonb,
    'email',
    '33333333-3333-4333-8333-333333333333',
    now(),
    now(),
    now()
  ),
  (
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa7'::uuid,
    '33333333-3333-4333-8333-333333333334'::uuid,
    '{"sub":"33333333-3333-4333-8333-333333333334","email":"hub4@spokes.test","email_verified":true}'::jsonb,
    'email',
    '33333333-3333-4333-8333-333333333334',
    now(),
    now(),
    now()
  );

-- Mark operators on profiles (handle_new_user does not set is_operator)
update public.profiles
set is_operator = true
where id in (
  '11111111-1111-4111-8111-111111111111'::uuid,
  '11111111-1111-4111-8111-111111111112'::uuid
);

-- Tenants (companies)
insert into public.tenants (id, display_name)
values
  ('44444444-4444-4444-8444-444444444441'::uuid, 'Tenant One'),
  ('44444444-4444-4444-8444-444444444442'::uuid, 'Tenant Two');

-- Tenant admins
insert into public.tenant_users (tenant_id, user_id)
values
  (
    '44444444-4444-4444-8444-444444444441'::uuid,
    '22222222-2222-4222-8222-222222222221'::uuid
  ),
  (
    '44444444-4444-4444-8444-444444444442'::uuid,
    '22222222-2222-4222-8222-222222222222'::uuid
  );

-- Hubs under each tenant (2 hubs per tenant)
insert into public.tenant_hubs (id, display_name, tenant_id)
values
  (
    '55555555-5555-4555-8555-555555555551'::uuid,
    'Hub One',
    '44444444-4444-4444-8444-444444444441'::uuid
  ),
  (
    '55555555-5555-4555-8555-555555555552'::uuid,
    'Hub Two',
    '44444444-4444-4444-8444-444444444441'::uuid
  ),
  (
    '55555555-5555-4555-8555-555555555553'::uuid,
    'Hub Three',
    '44444444-4444-4444-8444-444444444442'::uuid
  ),
  (
    '55555555-5555-4555-8555-555555555554'::uuid,
    'Hub Four',
    '44444444-4444-4444-8444-444444444442'::uuid
  );

-- Hub users (one user per hub)
insert into public.hub_users (hub_id, user_id)
values
  (
    '55555555-5555-4555-8555-555555555551'::uuid,
    '33333333-3333-4333-8333-333333333331'::uuid
  ),
  (
    '55555555-5555-4555-8555-555555555552'::uuid,
    '33333333-3333-4333-8333-333333333332'::uuid
  ),
  (
    '55555555-5555-4555-8555-555555555553'::uuid,
    '33333333-3333-4333-8333-333333333333'::uuid
  ),
  (
    '55555555-5555-4555-8555-555555555554'::uuid,
    '33333333-3333-4333-8333-333333333334'::uuid
  );
