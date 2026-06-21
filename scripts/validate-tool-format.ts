import { tools } from "../src/lib/content";
import { validateAllTools } from "../src/lib/tools/validate-tools";

const issues = validateAllTools(tools);
const errors = issues.filter((i) => i.severity === "error");
const warnings = issues.filter((i) => i.severity === "warn");

if (warnings.length) {
  console.warn(`Tool format warnings (${warnings.length}):\n`);
  for (const w of warnings) console.warn(`  ⚠ ${w.slug}: ${w.message}`);
}

if (errors.length) {
  console.error(`\nTool format errors (${errors.length}):\n`);
  for (const e of errors) console.error(`  ✗ ${e.slug}: ${e.message}`);
  process.exit(1);
}

console.log(`Tool format OK — ${tools.length} guides validated${warnings.length ? ` (${warnings.length} warnings)` : ""}.`);
