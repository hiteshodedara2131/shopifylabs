/**
 * Selects the first element matching the given CSS selector.
 * Returns null if no match is found.
 */
export const $ = <T extends HTMLElement = HTMLElement>(
  selector: string,
  context: Document | HTMLElement = document
): T | null => context.querySelector<T>(selector);
