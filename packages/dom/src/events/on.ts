type EventHandler<T extends Event = Event> = (event: T) => void;

/**
 * Attaches an event listener to a target element or delegates to matching children.
 *
 * @param eventName - The DOM event name (e.g., 'click', 'input')
 * @param selectorOrElement - A CSS selector string for delegation, or an HTMLElement for direct binding
 * @param handler - The event handler callback
 * @param options - Optional addEventListener options
 * @returns A cleanup function that removes the listener
 */
export const on = <T extends Event = Event>(
  eventName: string,
  selectorOrElement: string | HTMLElement,
  handler: EventHandler<T>,
  options?: AddEventListenerOptions
): (() => void) => {
  if (typeof selectorOrElement === "string") {
    // Delegated event — listen on document, match selector
    const delegatedHandler = (event: Event) => {
      const target = (event.target as HTMLElement)?.closest(selectorOrElement);
      if (target) {
        handler(event as T);
      }
    };

    document.addEventListener(eventName, delegatedHandler, options);
    return () =>
      document.removeEventListener(eventName, delegatedHandler, options);
  }

  // Direct binding
  selectorOrElement.addEventListener(
    eventName,
    handler as EventListener,
    options
  );
  return () =>
    selectorOrElement.removeEventListener(
      eventName,
      handler as EventListener,
      options
    );
};
