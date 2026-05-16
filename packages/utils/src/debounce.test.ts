import { describe, expect, it, vi } from "vitest";
import { debounce } from "./debounce.js";

describe("debounce", () => {
	it("should delay function execution", () => {
		vi.useFakeTimers();
		const mockFn = vi.fn();
		const debounced = debounce(mockFn, 100);

		debounced();
		debounced();
		debounced();

		expect(mockFn).not.toBeCalled();

		vi.advanceTimersByTime(50);
		expect(mockFn).not.toBeCalled();

		vi.advanceTimersByTime(50);
		expect(mockFn).toBeCalledTimes(1);

		vi.useRealTimers();
	});

	it("should pass arguments to the inner function", () => {
		vi.useFakeTimers();
		const mockFn = vi.fn();
		const debounced = debounce(mockFn, 100);

		debounced("test", 123);
		vi.runAllTimers();

		expect(mockFn).toBeCalledWith("test", 123);
		vi.useRealTimers();
	});
});
