type Attributes = Record<string, string>;

/**
 * Creates a new DOM element with optional attributes and inner HTML.
 *
 * @param tag - The HTML tag name (e.g., 'div', 'span')
 * @param attributes - Optional key/value pairs for element attributes
 * @param innerHTML - Optional HTML string for the element's content
 * @returns The newly created element
 */
export const create = <T extends HTMLElement = HTMLElement>(
	tag: string,
	attributes?: Attributes,
	innerHTML?: string,
): T => {
	const element = document.createElement(tag) as T;

	if (attributes) {
		for (const [key, value] of Object.entries(attributes)) {
			element.setAttribute(key, value);
		}
	}

	if (innerHTML !== undefined) {
		element.innerHTML = innerHTML;
	}

	return element;
};
