/**
 * Selects all elements matching the given CSS selector.
 * Returns a real array (not a NodeList) for easy iteration.
 */
export const $all = <T extends HTMLElement = HTMLElement>(
	selector: string,
	context: Document | HTMLElement = document,
): T[] => Array.from(context.querySelectorAll<T>(selector));
