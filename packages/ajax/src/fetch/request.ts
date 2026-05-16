export interface RequestOptions {
	method?: "GET" | "POST" | "PUT" | "DELETE";
	headers?: Record<string, string>;
	body?: unknown;
}

/**
 * A lightweight fetch wrapper with JSON defaults suited for Shopify AJAX APIs.
 *
 * - Automatically sets Content-Type and Accept headers for JSON.
 * - Serializes request body as JSON.
 * - Throws on non-ok responses with status info.
 */
export const request = async <T = unknown>(
	url: string,
	options: RequestOptions = {},
): Promise<T> => {
	const { method = "GET", headers = {}, body } = options;

	const response = await fetch(url, {
		method,
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			...headers,
		},
		body: body !== undefined ? JSON.stringify(body) : undefined,
	});

	if (!response.ok) {
		const errorText = await response.text().catch(() => "Unknown error");
		throw new Error(
			`[ShopifyLabs] Request failed: ${response.status} ${response.statusText} — ${errorText}`,
		);
	}

	return response.json() as Promise<T>;
};
