import type { ToolGuide } from "../types";
import { getToolConfigFiles } from "../tool-config-files";
import { TOOL_SECTION_ORDER, type ToolSectionId } from "./guide-utils";

const STEP_NUM_RE = /^\(\d{2}\)\s+/;

export interface ToolFormatIssue {
  slug: string;
  message: string;
  severity: "error" | "warn";
}

export function validateAllTools(tools: ToolGuide[]): ToolFormatIssue[] {
  const issues: ToolFormatIssue[] = [];
  const slugs = new Set<string>();

  for (const tool of tools) {
    if (slugs.has(tool.slug)) {
      issues.push({ slug: tool.slug, message: "Duplicate slug", severity: "error" });
    }
    slugs.add(tool.slug);

    if (!tool.name?.trim()) {
      issues.push({ slug: tool.slug, message: "Missing name", severity: "error" });
    }

    let lastIndex = -1;

    for (const id of TOOL_SECTION_ORDER) {
      const section = tool[id];
      if (!section) continue;
      const idx = TOOL_SECTION_ORDER.indexOf(id);
      if (idx < lastIndex) {
        issues.push({ slug: tool.slug, message: `Section "${id}" out of order`, severity: "error" });
      }
      lastIndex = idx;
      if (section.id !== id) {
        issues.push({
          slug: tool.slug,
          message: `Section id mismatch: expected "${id}", got "${section.id}"`,
          severity: "error",
        });
      }
      if (!section.steps?.length) {
        issues.push({ slug: tool.slug, message: `Section "${id}" has no steps`, severity: "error" });
        continue;
      }

      section.steps.forEach((step, stepIdx) => {
        const expected = `(0${stepIdx + 1})`;
        if (!STEP_NUM_RE.test(step.title)) {
          issues.push({
            slug: tool.slug,
            message: `Step in "${id}" missing "(NN)" prefix: "${step.title}"`,
            severity: "warn",
          });
        } else if (section.steps.length > 1 && !step.title.startsWith(expected)) {
          issues.push({
            slug: tool.slug,
            message: `Step numbering in "${id}": expected ${expected}, got "${step.title.slice(0, 4)}"`,
            severity: "warn",
          });
        }

        const hasCmd = step.commands && Object.values(step.commands).some((c) => c?.trim());
        if (!hasCmd) {
          issues.push({
            slug: tool.slug,
            message: `Empty commands in "${id}" → "${step.title}"`,
            severity: "error",
          });
        }
      });
    }

    if (!tool.install?.steps?.length) {
      issues.push({ slug: tool.slug, message: "Missing required install section", severity: "error" });
    }

    if (tool.configure && getToolConfigFiles(tool.slug).length === 0) {
      issues.push({
        slug: tool.slug,
        message: "Has configure section but no entries in tool-config-files.ts",
        severity: "warn",
      });
    }
  }

  return issues;
}
