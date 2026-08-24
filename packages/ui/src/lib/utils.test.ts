import { describe, expect, it } from "vitest";
import { cn } from "@repo/ui/lib/utils";

describe("cn utility", () => {
  it("merges class names", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("handles conditional classes", () => {
    const hidden = false;
    expect(cn("base", hidden && "hidden", "visible")).toBe("base visible");
  });
});
