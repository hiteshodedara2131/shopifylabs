import { describe, expect, it } from "vitest";
import { uniqueId } from "./uniqueId.js";

describe("uniqueId", () => {
	it("should generate a unique id", () => {
		const id1 = uniqueId();
		const id2 = uniqueId();
		expect(id1).not.toBe(id2);
		expect(id1).toMatch(/^sl_/);
	});

	it("should use custom prefix", () => {
		const id = uniqueId("cart");
		expect(id).toMatch(/^cart_/);
	});
});
