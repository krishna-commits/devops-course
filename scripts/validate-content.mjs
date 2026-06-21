#!/usr/bin/env node
/**
 * Light-touch content validation for CI.
 * Flags empty command blocks, CRLF line endings, and empty YAML/deployment files.
 *
 * Usage: node scripts/validate-content.mjs
 */

import { readFileSync, readdirSync, statSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const errors = [];

function walk(dir, ext, files = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory() && name !== "node_modules") walk(p, ext, files);
    else if (p.endsWith(ext)) files.push(p);
  }
  return files;
}

function checkFile(path) {
  const content = readFileSync(path, "utf8");
  const rel = path.replace(root + "/", "");

  if (content.includes("\r\n")) {
    errors.push(`${rel}: contains CRLF line endings (use LF)`);
  }

  // Empty commands: commands: { linux: "" } or multiline empty
  const emptyCmd = /commands:\s*\{[^}]*?(linux|mac|windows):\s*""/g;
  if (emptyCmd.test(content)) {
    errors.push(`${rel}: empty command string in commands block`);
  }

  // Triple-backtick blocks that are empty or whitespace-only in tool files
  const emptyBlocks = content.match(/commands:\s*\{\s*(linux|mac|windows):\s*`[\s\n]*`/g);
  if (emptyBlocks?.length) {
    errors.push(`${rel}: empty template literal in commands (${emptyBlocks.length} block(s))`);
  }
}

// Scan tool and deployment source files
const dirs = [
  join(root, "src/lib/tools"),
  join(root, "src/lib/deployments"),
];

for (const dir of dirs) {
  for (const file of walk(dir, ".ts")) {
    checkFile(file);
    const rel = file.replace(root + "/", "");
    if (rel === "src/lib/tools/guide-utils.ts") continue;
    const content = readFileSync(file, "utf8");
    if (/\nfunction guide\s*\(/.test(content)) {
      errors.push(`${rel}: duplicate guide() — import from guide-utils.ts`);
    }
  }
}

// Check deployment YAML content strings aren't empty
const recipeFiles = walk(join(root, "src/lib/deployments"), ".ts");
for (const file of recipeFiles) {
  const content = readFileSync(file, "utf8");
  const rel = file.replace(root + "/", "");
  const emptyYaml = content.match(/content:\s*`[\s\n]*`/g);
  if (emptyYaml?.length) {
    errors.push(`${rel}: empty deployment file content block`);
  }
}

if (errors.length) {
  console.error("Content validation failed:\n");
  for (const e of errors) console.error(`  ✗ ${e}`);
  process.exit(1);
}

console.log(`Content validation passed (${recipeFiles.length} deployment files, tools scanned).`);
