import type { Runbook } from "./runbooks";

const BASE = "https://devops.krishnaneupane.com";

export function runbookToMarkdown(runbook: Runbook): string {
  const lines: string[] = [
    `# ${runbook.title}`,
    "",
    runbook.description,
    "",
    `> Source: ${BASE}/runbooks/${runbook.slug}/`,
    "",
    "## Symptoms",
    "",
    ...runbook.symptoms.map((s) => `- ${s}`),
    "",
    "## Steps",
    "",
  ];

  runbook.steps.forEach((step, i) => {
    lines.push(`### ${i + 1}. ${step.title}`);
    lines.push("");
    if (step.body) {
      lines.push(step.body);
      lines.push("");
    }
    if (step.commands) {
      lines.push("```bash");
      lines.push(step.commands);
      lines.push("```");
      lines.push("");
    }
    if (step.links?.length) {
      lines.push("**Links:**");
      step.links.forEach((l) => {
        const href = l.href.startsWith("http") ? l.href : `${BASE}${l.href}`;
        lines.push(`- [${l.label}](${href})`);
      });
      lines.push("");
    }
  });

  if (runbook.relatedTools.length > 0 || runbook.relatedConfigs.length > 0) {
    lines.push("## Related");
    lines.push("");
    runbook.relatedTools.forEach((t) => lines.push(`- Tool: ${BASE}/tools/${t}/`));
    runbook.relatedConfigs.forEach((c) => lines.push(`- Config: ${BASE}/deployments/${c}/`));
    lines.push("");
  }

  return lines.join("\n").trimEnd() + "\n";
}
