/**
 * Removes an event listener from an element.
 *
 * @param element - The target element
 * @param eventName - The DOM event name
 * @param handler - The handler to remove
 * @param options - Optional event listener options
 */
export const off = (
	element: HTMLElement | Document,
	eventName: string,
	handler: EventListener,
	options?: EventListenerOptions,
): void => {
	element.removeEventListener(eventName, handler, options);
};
