import { describe, expect, test } from "vitest";
import {
  HUB_ONE_ID,
  HUB_THREE_ID,
  HUB_TWO_ID,
  HUB_USER_EMAIL,
  OPERATOR_EMAIL,
  TENANT_EMAIL,
  TENANT_ONE_ID,
  TENANT_TWO_ID,
  UNKNOWN_ID,
} from "../../integration-tests/fixtures";
import { signedInClient } from "../../integration-tests/test-helpers";
import { getSingleHubDetails } from "./get-single-hub";

describe("getSingleHubDetails", () => {
  test("01 - operator can read Hub One", async () => {
    const client = await signedInClient(OPERATOR_EMAIL);
    const hub = await getSingleHubDetails(client, HUB_ONE_ID);

    expect(hub).toMatchObject({
      id: HUB_ONE_ID,
      display_name: "Hub One",
      tenant_id: TENANT_ONE_ID,
    });
    expect(hub?.created_at).toEqual(expect.any(String));
  });

  test("02 - operator can read Hub Three", async () => {
    const client = await signedInClient(OPERATOR_EMAIL);
    const hub = await getSingleHubDetails(client, HUB_THREE_ID);

    expect(hub).toMatchObject({
      id: HUB_THREE_ID,
      display_name: "Hub Three",
      tenant_id: TENANT_TWO_ID,
    });
  });

  test("03 - tenant one can read Hub One", async () => {
    const client = await signedInClient(TENANT_EMAIL);
    const hub = await getSingleHubDetails(client, HUB_ONE_ID);

    expect(hub).toMatchObject({
      id: HUB_ONE_ID,
      display_name: "Hub One",
      tenant_id: TENANT_ONE_ID,
    });
  });

  test("04 - tenant cannot read Hub Three", async () => {
    const client = await signedInClient(TENANT_EMAIL);

    await expect(getSingleHubDetails(client, HUB_THREE_ID)).rejects.toThrow();
  });

  test("05 - hub user can read Hub One", async () => {
    const client = await signedInClient(HUB_USER_EMAIL);
    const hub = await getSingleHubDetails(client, HUB_ONE_ID);

    expect(hub).toMatchObject({
      id: HUB_ONE_ID,
      display_name: "Hub One",
      tenant_id: TENANT_ONE_ID,
    });
  });

  test("06 - hub user cannot read Hub Two", async () => {
    const client = await signedInClient(HUB_USER_EMAIL);

    await expect(getSingleHubDetails(client, HUB_TWO_ID)).rejects.toThrow();
  });

  test("07 - unknown hub id throws", async () => {
    const client = await signedInClient(OPERATOR_EMAIL);

    await expect(getSingleHubDetails(client, UNKNOWN_ID)).rejects.toThrow();
  });
});
