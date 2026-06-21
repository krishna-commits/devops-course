"use client";

import { useCallback, useState } from "react";
import { CheckIcon, CopyIcon } from "./icons";

export function CopyScriptBlock({
  title,
  filename,
  script,
}: {
  title: string;
  filename: string;
  script: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [script]);

  const download = useCallback(() => {
    const blob = new Blob([script], { type: "text/x-shellscript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }, [script, filename]);

  return (
    <article className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      <div className="flex items-center justify-between gap-2 px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-800">
        <div className="min-w-0">
          <h3 className="font-semibold text-sm text-zinc-900 dark:text-white">{title}</h3>
          <p className="text-[10px] text-zinc-400 font-mono truncate">{filename}</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            type="button"
            onClick={download}
            className="text-xs px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            Download
          </button>
          <button
            type="button"
            onClick={copy}
            className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
          >
            {copied ? <CheckIcon className="w-3.5 h-3.5" /> : <CopyIcon className="w-3.5 h-3.5" />}
            {copied ? "Copied" : "Copy script"}
          </button>
        </div>
      </div>
      <pre className="p-4 text-xs font-mono text-zinc-700 dark:text-zinc-300 overflow-x-auto whitespace-pre-wrap max-h-96 overflow-y-auto bg-zinc-900/5 dark:bg-black/20">
        {script}
      </pre>
    </article>
  );
}
