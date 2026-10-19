import { afterAll, beforeAll, describe, expect, test, vi } from "vitest";
import { OPERATOR_EMAIL } from "../../integration-tests/fixtures";
import {
  createTestClient,
  signedInClient,
} from "../../integration-tests/test-helpers";
import getCurrentUserProfile from "./get-current-user-profile";

vi.mock("next/navigation", () => ({
  redirect: (url: string) => {
    throw new Error(`REDIRECT:${url}`);
  },
}));

const AUTH_URL = "http://auth.spokes.test";
const previousAuthUrl = process.env.AUTH_URL;

beforeAll(() => {
  process.env.AUTH_URL = AUTH_URL;
});

afterAll(() => {
  if (previousAuthUrl === undefined) {
    delete process.env.AUTH_URL;
    return;
  }
  process.env.AUTH_URL = previousAuthUrl;
});

describe("getCurrentUserProfile", () => {
  test("01 - signed-in operator returns seed profile fields", async () => {
    const client = await signedInClient(OPERATOR_EMAIL);
    const profile = await getCurrentUserProfile(client);

    expect(profile).toEqual({
      name: "Harriet",
      email: OPERATOR_EMAIL,
      avatarUrl: undefined,
      phone: "",
      displayName: "",
    });
  });

  test("02 - unsigned client redirects to AUTH_URL", async () => {
    const client = createTestClient();

    await expect(getCurrentUserProfile(client)).rejects.toThrow(
      `REDIRECT:${AUTH_URL}`,
    );
  });
});
