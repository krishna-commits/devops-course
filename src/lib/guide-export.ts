import type { GuideSection, OS } from "./types";

export function sectionToMarkdown(section: GuideSection, os: OS = "linux"): string {
  const lines: string[] = [`## ${section.title}`, ""];
  section.steps.forEach((step, i) => {
    lines.push(`### ${step.title}`);
    if (step.description) {
      lines.push("");
      lines.push(step.description);
    }
    lines.push("");
    const cmd = step.commands[os] ?? step.commands.linux ?? step.commands.mac ?? step.commands.windows ?? "";
    lines.push("```bash");
    lines.push(cmd);
    lines.push("```");
    lines.push("");
  });
  return lines.join("\n").trim();
}

export function sectionCommandsForOS(section: GuideSection, os: OS = "linux"): string {
  return section.steps
    .map((step) => {
      const cmd = step.commands[os] ?? step.commands.linux ?? "";
      const header = step.title.replace(/^\(\d+\)\s*/, "");
      return `# ${header}\n${cmd}`;
    })
    .join("\n\n");
}
