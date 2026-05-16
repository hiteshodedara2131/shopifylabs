import { writeFile as fsWriteFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";

/**
 * Writes content to a file, creating parent directories if they don't exist.
 *
 * @param filePath - The path to write to
 * @param content - The file content
 */
export const writeFile = async (
	filePath: string,
	content: string,
): Promise<void> => {
	await mkdir(dirname(filePath), { recursive: true });
	await fsWriteFile(filePath, content, "utf-8");
};
