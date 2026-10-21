import { describe, expect, test } from "vitest";
import { OPERATOR_EMAIL } from "../../integration-tests/fixtures";
import { signedInClient } from "../../integration-tests/test-helpers";
import { getOperationDashboardStats } from "./get-operation-dashboard-stats";

describe("getOperationDashboardStats", () => {
  test("01 - operator counts match direct asset, tenant, and hub user counts", async () => {
    const client = await signedInClient(OPERATOR_EMAIL);
    const stats = await getOperationDashboardStats(client);

    const [assets, tenants, hubUsers] = await Promise.all([
      client.from("assets").select("*", { count: "exact", head: true }),
      client.from("tenants").select("*", { count: "exact", head: true }),
      client.from("hub_users").select("*", { count: "exact", head: true }),
    ]);

    expect(stats).toEqual({
      numberOfAssets: assets.count ?? 0,
      numberOfTenants: tenants.count ?? 0,
      numberOfHubs: hubUsers.count ?? 0,
    });
  });
});
