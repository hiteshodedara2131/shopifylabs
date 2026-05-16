/**
 * Creates a debounced version of a function that delays invocation
 * until after `delay` milliseconds have elapsed since the last call.
 */
export const debounce = <T extends (...args: unknown[]) => void>(
	fn: T,
	delay: number,
): ((...args: Parameters<T>) => void) => {
	let timeoutId: ReturnType<typeof setTimeout> | undefined;

	return (...args: Parameters<T>) => {
		if (timeoutId !== undefined) {
			clearTimeout(timeoutId);
		}
		timeoutId = setTimeout(() => {
			fn(...args);
			timeoutId = undefined;
		}, delay);
	};
};
