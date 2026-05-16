/**
 * Formats a Shopify price (in cents) into a formatted currency string.
 * Uses the native Intl.NumberFormat API.
 *
 * @param cents - The price in cents (e.g., 1999 for $19.99)
 * @param formatString - Optional. A format string like "${{amount}}" or "€{{amount_with_comma_separator}}"
 * @returns Formatted money string
 */
// biome-ignore lint/suspicious/noTemplateCurlyInString: Shopify uses this exact syntax for template placeholders
export const formatMoney = (
	cents: string | number,
	formatString = "${{amount}}",
): string => {
	if (typeof cents === "string") {
		cents = cents.replace(/[^0-9]/g, "");
	}

	const value = typeof cents === "string" ? parseInt(cents, 10) : cents;

	if (Number.isNaN(value)) {
		return "";
	}

	const amount = (value / 100).toFixed(2);
	const amountNoDecimals = (value / 100).toFixed(0);
	const amountWithCommaSeparator = amount
		.replace(/\./g, ",")
		.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");

	let formattedString = formatString.replace(/\{\{\s*amount\s*\}\}/, amount);
	formattedString = formattedString.replace(
		/\{\{\s*amount_no_decimals\s*\}\}/,
		amountNoDecimals,
	);
	formattedString = formattedString.replace(
		/\{\{\s*amount_with_comma_separator\s*\}\}/,
		amountWithCommaSeparator,
	);

	return formattedString;
};
