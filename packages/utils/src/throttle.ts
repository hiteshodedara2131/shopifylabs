/**
 * Creates a throttled version of a function that only invokes
 * at most once per `limit` milliseconds.
 */
export const throttle = <T extends (...args: unknown[]) => void>(
  fn: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let lastCall = 0;
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return (...args: Parameters<T>) => {
    const now = Date.now();
    const remaining = limit - (now - lastCall);

    if (remaining <= 0) {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
        timeoutId = undefined;
      }
      lastCall = now;
      fn(...args);
    } else if (timeoutId === undefined) {
      timeoutId = setTimeout(() => {
        lastCall = Date.now();
        timeoutId = undefined;
        fn(...args);
      }, remaining);
    }
  };
};
