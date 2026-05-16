let counter = 0;

/**
 * Generates a unique string ID with an optional prefix.
 * IDs are sequential and unique within the current runtime session.
 */
export const uniqueId = (prefix = "sl"): string => {
	counter += 1;
	return `${prefix}_${counter}_${Date.now().toString(36)}`;
};
