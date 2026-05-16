import { describe, expect, it } from "vitest";
import { deepMerge } from "./deepMerge.js";

describe("deepMerge", () => {
	it("should merge simple objects", () => {
		const obj1: Record<string, unknown> = { a: 1 };
		const obj2: Record<string, unknown> = { b: 2 };
		expect(deepMerge(obj1, obj2)).toEqual({ a: 1, b: 2 });
	});

	it("should overwrite primitive values", () => {
		const obj1 = { a: 1 };
		const obj2 = { a: 2 };
		expect(deepMerge(obj1, obj2)).toEqual({ a: 2 });
	});

	it("should deeply merge nested objects", () => {
		const obj1: Record<string, unknown> = { a: { b: 1, c: 2 } };
		const obj2: Record<string, unknown> = { a: { c: 3, d: 4 } };
		expect(deepMerge(obj1, obj2)).toEqual({ a: { b: 1, c: 3, d: 4 } });
	});

	it("should overwrite arrays completely", () => {
		const obj1: Record<string, unknown> = { a: [1, 2] };
		const obj2: Record<string, unknown> = { a: [3, 4] };
		expect(deepMerge(obj1, obj2)).toEqual({ a: [3, 4] });
	});
});
