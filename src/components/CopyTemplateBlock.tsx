"use client";

import { useCallback, useState } from "react";
import { CheckIcon, CopyIcon } from "./icons";

export function CopyTemplateBlock({ title, markdown }: { title: string; markdown: string }) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [markdown]);

  return (
    <article className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-800">
        <h3 className="font-semibold text-sm text-zinc-900 dark:text-white">{title}</h3>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
        >
          {copied ? <CheckIcon className="w-3.5 h-3.5" /> : <CopyIcon className="w-3.5 h-3.5" />}
          {copied ? "Copied" : "Copy Markdown"}
        </button>
      </div>
      <pre className="p-4 text-xs font-mono text-zinc-700 dark:text-zinc-300 overflow-x-auto whitespace-pre-wrap max-h-80 overflow-y-auto">
        {markdown}
      </pre>
    </article>
  );
}
