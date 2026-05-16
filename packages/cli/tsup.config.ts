import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts", "src/bin/index.ts"],
	format: ["esm"],
	dts: true,
	sourcemap: true,
	clean: true,
	splitting: false,
	banner: {
		js: "#!/usr/bin/env node",
	},
});
