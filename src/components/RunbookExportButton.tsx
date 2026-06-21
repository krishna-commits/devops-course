"use client";

import { useCallback, useState } from "react";
import { CheckIcon, CopyIcon } from "./icons";

export function RunbookExportButton({ markdown }: { markdown: string }) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [markdown]);

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 hover:border-orange-300 dark:hover:border-orange-700 transition-colors print:hidden"
    >
      {copied ? <CheckIcon className="w-3.5 h-3.5 text-emerald-500" /> : <CopyIcon className="w-3.5 h-3.5" />}
      {copied ? "Copied" : "Copy runbook (Markdown)"}
    </button>
  );
}
