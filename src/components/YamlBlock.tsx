"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon } from "./icons";

interface YamlBlockProps {
  filename: string;
  description?: string;
  content: string;
}

export function YamlBlock({ filename, description, content }: YamlBlockProps) {
  const [copied, setCopied] = useState(false);
  const lines = content.split("\n");
  const ext = filename.split(".").pop()?.toLowerCase();
  const lang = ext === "dockerfile" || filename.startsWith("Dockerfile") ? "dockerfile" : "yaml";

  async function copy() {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-700 shadow-sm mb-6">
      <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-100 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
        <div>
          <p className="font-mono text-sm font-semibold text-zinc-800 dark:text-zinc-200">
            {filename}
          </p>
          {description && (
            <p className="text-xs text-zinc-500 mt-0.5">{description}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-400 bg-zinc-200 dark:bg-zinc-700 px-2 py-0.5 rounded">
            {lang}
          </span>
          <button
            type="button"
            onClick={copy}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
              copied
                ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                : "bg-white dark:bg-zinc-900 text-zinc-500 hover:text-zinc-800 dark:hover:text-white border border-zinc-200 dark:border-zinc-600"
            }`}
          >
            {copied ? <><CheckIcon className="w-3.5 h-3.5" /> Copied</> : <><CopyIcon className="w-3.5 h-3.5" /> Copy</>}
          </button>
        </div>
      </div>
      <pre className="bg-[#0d1117] p-4 overflow-x-auto text-[13px] leading-relaxed font-mono">
        <code>
          {lines.map((line, i) => (
            <div key={i} className="flex hover:bg-white/[0.03] -mx-4 px-4">
              <span className="select-none text-zinc-600 w-8 shrink-0 text-right pr-4">{i + 1}</span>
              <span className="text-sky-300/90">{line || " "}</span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}
