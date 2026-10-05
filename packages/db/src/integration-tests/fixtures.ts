/** Matches packages/db/supabase/auth-seed.sql — one user per type */

export const SEED_PASSWORD = "securepassword";
export const UNKNOWN_ID = "99999999-9999-4999-8999-999999999999";

// Operator
export const OPERATOR_ID = "11111111-1111-4111-8111-111111111111";
export const OPERATOR_EMAIL = "operator1@spokes.test";

// Tenant user
export const TENANT_USER_ID = "22222222-2222-4222-8222-222222222221";
export const TENANT_EMAIL = "tenant1@spokes.test";

// Hub admin
export const HUB_ADMIN_ID = "33333333-3333-4333-8333-333333333331";
export const HUB_ADMIN_EMAIL = "hub1@spokes.test";

// Hub user
export const HUB_USER_ID = "33333333-3333-4333-8333-333333333335";
export const HUB_USER_EMAIL = "hub1-user@spokes.test";

// Own graph (Tenant One → Hub One)
export const TENANT_ONE_ID = "44444444-4444-4444-8444-444444444441";
export const HUB_ONE_ID = "55555555-5555-4555-8555-555555555551";

// Denial targets (Tenant Two → Hub Three) — IDs only, no sign-in
export const TENANT_TWO_ID = "44444444-4444-4444-8444-444444444442";
export const HUB_THREE_ID = "55555555-5555-4555-8555-555555555553";
