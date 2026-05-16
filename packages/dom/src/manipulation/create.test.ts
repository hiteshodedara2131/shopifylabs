// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { create } from "./create.js";

describe("create", () => {
	it("should create an element with tag name", () => {
		const el = create("div");
		expect(el.tagName.toLowerCase()).toBe("div");
	});

	it("should add attributes", () => {
		const el = create("span", { class: "test-class", id: "test-id" });
		expect(el.className).toBe("test-class");
		expect(el.id).toBe("test-id");
	});

	it("should set innerHTML", () => {
		const el = create("button", {}, "Click me");
		expect(el.innerHTML).toBe("Click me");
	});
});
