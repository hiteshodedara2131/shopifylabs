// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from "vitest";
import { $all } from "./$all.js";

describe("$all", () => {
	beforeEach(() => {
		document.body.innerHTML = `
      <div class="item">1</div>
      <div class="item">2</div>
      <div class="item">3</div>
    `;
	});

	it("should return all matching elements as an array", () => {
		const els = $all(".item");
		expect(els.length).toBe(3);
		expect(Array.isArray(els)).toBe(true);
		expect(els[0].textContent).toBe("1");
	});

	it("should return an empty array if no match", () => {
		const els = $all(".non-existent");
		expect(els).toEqual([]);
		expect(Array.isArray(els)).toBe(true);
	});
});
