/**
 * Transforms a Shopify CDN image URL by appending a size suffix before the file extension.
 * 
 * @param src - The original image URL (e.g., "//cdn.shopify.com/s/files/1/0000/0000/products/image.jpg")
 * @param size - The desired size suffix (e.g., "500x", "100x100", "pico", "master")
 * @returns The resized image URL
 */
export const getSizedImageUrl = (src: string | null | undefined, size: string): string => {
  if (!src) return "";
  if (!size || size === "master") return src;

  const match = src.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif|webp)(?:\?.*)?$/i);
  
  if (match) {
    const prefix = src.slice(0, match.index);
    const suffix = src.slice(match.index);
    return `${prefix}_${size}${suffix}`;
  }

  return src;
};
