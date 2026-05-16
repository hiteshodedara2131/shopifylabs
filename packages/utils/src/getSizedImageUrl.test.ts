import { describe, expect, it } from "vitest";
import { getSizedImageUrl } from "./getSizedImageUrl.js";

describe("getSizedImageUrl", () => {
	it("should append size suffix before extension", () => {
		const url = "//cdn.shopify.com/s/files/1/0000/0000/products/image.jpg";
		expect(getSizedImageUrl(url, "500x")).toBe(
			"//cdn.shopify.com/s/files/1/0000/0000/products/image_500x.jpg",
		);
	});

	it("should handle URLs with query parameters", () => {
		const url = "//cdn.shopify.com/s/files/1/image.png?v=123456";
		expect(getSizedImageUrl(url, "100x100")).toBe(
			"//cdn.shopify.com/s/files/1/image_100x100.png?v=123456",
		);
	});

	it("should return original url if size is master", () => {
		const url = "//cdn.shopify.com/image.jpg";
		expect(getSizedImageUrl(url, "master")).toBe(url);
	});

	it("should return empty string if url is falsy", () => {
		expect(getSizedImageUrl(null, "500x")).toBe("");
	});
});
