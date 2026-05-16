import { describe, expect, it, vi } from "vitest";
import { throttle } from "./throttle.js";

describe("throttle", () => {
	it("should throttle function execution", () => {
		vi.useFakeTimers();
		const mockFn = vi.fn();
		const throttled = throttle(mockFn, 100);

		throttled();
		throttled();
		throttled();

		// First call happens immediately
		expect(mockFn).toBeCalledTimes(1);

		vi.advanceTimersByTime(50);
		throttled();
		// Still 1 because we are within 100ms
		expect(mockFn).toBeCalledTimes(1);

		vi.advanceTimersByTime(50);
		// After 100ms, the trailing call should happen
		expect(mockFn).toBeCalledTimes(2);

		vi.useRealTimers();
	});

	it("should pass arguments to the inner function", () => {
		const mockFn = vi.fn();
		const throttled = throttle(mockFn, 100);

		throttled("hello");
		expect(mockFn).toBeCalledWith("hello");
	});
});
