import { $ } from "../query/$.js";

/**
 * Appends HTML content to the element matching the given selector.
 *
 * @param selector - CSS selector to find the target element
 * @param html - The HTML string to append
 * @returns The updated element, or null if not found
 */
export const append = (selector: string, html: string): HTMLElement | null => {
	const element = $(selector);
	if (element) {
		element.insertAdjacentHTML("beforeend", html);
	}
	return element;
};
