import prompts from "prompts";
import { createSection } from "../commands/create-section.js";

const HELP_TEXT = `
  ⚡ ShopifyLabs CLI

  Usage:
    shopifylabs <command> <type> [name]

  Commands:
    create section [name]   Create a new Shopify section

  Options:
    --help, -h              Show this help message
    --version, -v           Show version

  Examples:
    shopifylabs create section hero-banner
    shopifylabs create section product-tabs
`;

const VERSION = "0.1.0";

const run = async (): Promise<void> => {
  const args = process.argv.slice(2);

  // Handle flags
  if (args.includes("--help") || args.includes("-h") || args.length === 0) {
    console.log(HELP_TEXT);
    process.exit(0);
  }

  if (args.includes("--version") || args.includes("-v")) {
    console.log(`  shopifylabs v${VERSION}`);
    process.exit(0);
  }

  const [command, type, name] = args;

  if (command !== "create") {
    console.error(`\n  ✖ Unknown command: "${command}"\n`);
    console.log(HELP_TEXT);
    process.exit(1);
  }

  if (type !== "section") {
    console.error(`\n  ✖ Unknown type: "${type}". Supported: section\n`);
    process.exit(1);
  }

  let sectionName = name;

  // If no name provided, prompt the user
  if (!sectionName) {
    const response = await prompts({
      type: "text",
      name: "sectionName",
      message: "Section name (e.g. hero-banner)",
      validate: (value: string) =>
        value.trim().length > 0 ? true : "Section name is required",
    });

    if (!response.sectionName) {
      console.log("\n  ✖ Cancelled.\n");
      process.exit(0);
    }

    sectionName = response.sectionName;
  }

  await createSection({ name: sectionName });
};

run().catch((error: unknown) => {
  console.error("\n  ✖ An error occurred:\n");
  console.error(error);
  process.exit(1);
});
