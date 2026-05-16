type DeepMergeable = Record<string, unknown>;

/**
 * Checks if a value is a plain object (not an array, null, or other type).
 */
const isObject = (value: unknown): value is DeepMergeable =>
  typeof value === "object" && value !== null && !Array.isArray(value);

/**
 * Deeply merges two or more objects. Later sources override earlier ones.
 * Arrays are replaced, not merged. Only plain objects are recursively merged.
 */
export const deepMerge = <T extends DeepMergeable>(
  target: T,
  ...sources: Partial<T>[]
): T => {
  const result = { ...target } as Record<string, unknown>;

  for (const source of sources) {
    if (!isObject(source)) continue;

    for (const key of Object.keys(source)) {
      const targetValue = result[key];
      const sourceValue = (source as Record<string, unknown>)[key];

      if (isObject(targetValue) && isObject(sourceValue)) {
        result[key] = deepMerge(
          targetValue as DeepMergeable,
          sourceValue as DeepMergeable
        );
      } else {
        result[key] = sourceValue;
      }
    }
  }

  return result as T;
};
