import { $ } from "../query/$.js";

/**
 * Replaces the innerHTML of the element matching the given selector.
 *
 * @param selector - CSS selector to find the target element
 * @param html - The HTML string to set as innerHTML
 * @returns The updated element, or null if not found
 */
export const replace = (
  selector: string,
  html: string
): HTMLElement | null => {
  const element = $(selector);
  if (element) {
    element.innerHTML = html;
  }
  return element;
};
