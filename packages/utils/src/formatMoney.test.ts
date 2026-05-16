import { describe, it, expect } from "vitest";
import { formatMoney } from "./formatMoney.js";

describe("formatMoney", () => {
  it("should format string numbers", () => {
    expect(formatMoney("1999")).toBe("$19.99");
  });

  it("should format numeric values", () => {
    expect(formatMoney(2500)).toBe("$25.00");
  });

  it("should handle custom formats", () => {
    expect(formatMoney(1999, "€{{amount_with_comma_separator}}")).toBe("€19,99");
    expect(formatMoney(1999, "${{amount_no_decimals}}")).toBe("$20");
  });

  it("should return empty string for invalid inputs", () => {
    expect(formatMoney("abc")).toBe("");
  });
});
