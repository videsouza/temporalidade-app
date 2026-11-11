import { describe, expect, it } from "vitest";

import { APP_DEVELOPER } from "./app-info";

describe("app information", () => {
  it("identifies the developer shown on the About screen", () => {
    expect(APP_DEVELOPER).toBe("Vinicius A. de Souza");
  });
});
