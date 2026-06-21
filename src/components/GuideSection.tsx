"use client";

import { useState } from "react";
import type { GuideSection as GuideSectionType } from "@/lib/types";
import { OSTabs } from "./OSTabs";
import { sectionCommandsForOS, sectionToMarkdown } from "@/lib/guide-export";
import { CheckIcon, CopyIcon } from "./icons";

interface GuideSectionProps {
  section: GuideSectionType;
  index: number;
  toolSlug?: string;
  /** Page URL path for share links, e.g. /tools/docker/ */
  pagePath?: string;
}

const sectionIcons: Record<string, string> = {
  install: "📥",
  configure: "⚙️",
  verify: "✅",
  manage: "⚡",
  uninstall: "🗑️",
  troubleshoot: "🔧",
};

export function GuideSection({ section, index, toolSlug = "", pagePath }: GuideSectionProps) {
  const sharePath = pagePath ?? (toolSlug ? `/tools/${toolSlug}/` : "");
  const icon = sectionIcons[section.id] ?? "📄";

  return (
    <section id={section.id} className="scroll-mt-24 mb-12">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-lg">
            {icon}
          </span>
          <div>
            <p className="text-xs font-mono text-indigo-500 dark:text-indigo-400 mb-0.5">
              Step {String(index + 1).padStart(2, "0")}
            </p>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">{section.title}</h2>
          </div>
        </div>
        <SectionCopyBar section={section} />
      </div>

      <div className="space-y-6">
        {section.steps.map((step, i) => {
          const stepId = `${section.id}-step-${i}`;
          return (
            <article
              key={stepId}
              id={stepId}
              className="scroll-mt-28 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                      <span className="text-xs font-mono text-zinc-400 bg-zinc-200 dark:bg-zinc-700 px-1.5 py-0.5 rounded">
                        {step.title.match(/^\(\d+\)/)?.[0] ?? `#${i + 1}`}
                      </span>
                      {step.title.replace(/^\(\d+\)\s*/, "")}
                    </h3>
                    {step.description && (
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1.5">{step.description}</p>
                    )}
                  </div>
                  <ShareStepButton pagePath={sharePath} stepId={stepId} />
                </div>
              </div>
              <div className="p-4">
                <OSTabs commands={step.commands} />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function SectionCopyBar({ section }: { section: GuideSectionType }) {
  return (
    <div className="flex flex-wrap gap-2 print:hidden">
      <CopyActionButton label="Copy Linux" getText={() => sectionCommandsForOS(section, "linux")} />
      <CopyActionButton label="Copy Markdown" getText={() => sectionToMarkdown(section, "linux")} />
    </div>
  );
}

function CopyActionButton({ label, getText }: { label: string; getText: () => string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(getText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors"
    >
      {copied ? <CheckIcon className="w-3.5 h-3.5 text-emerald-500" /> : <CopyIcon className="w-3.5 h-3.5" />}
      {copied ? "Copied" : label}
    </button>
  );
}

function ShareStepButton({ pagePath, stepId }: { pagePath: string; stepId: string }) {
  const [copied, setCopied] = useState(false);

  if (!pagePath) return null;

  async function share() {
    const url = `${window.location.origin}${pagePath}#${stepId}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={share}
      className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md text-zinc-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-colors print:hidden shrink-0"
    >
      {copied ? "Link copied" : "Share step ↗"}
    </button>
  );
}
