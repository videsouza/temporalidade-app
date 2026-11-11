import { describe, expect, it } from "vitest";

import { HOME_CATEGORIES } from "./home-categories";

describe("home categories", () => {
  it("keeps temporalidade and setores as the two entry options", () => {
    expect(HOME_CATEGORIES).toHaveLength(2);
    expect(HOME_CATEGORIES.map((category) => category.key)).toEqual(["temporalidade", "setores"]);
    expect(HOME_CATEGORIES.map((category) => category.route)).toEqual(["/temporalidade", "/setores"]);
  });
});
