"use client";

import { useCallback, useState } from "react";
import type { Cheatsheet } from "@/lib/cheatsheets";
import { CheckIcon, CopyIcon } from "./icons";
import { PrintButton } from "./PrintButton";

export function CheatsheetView({ sheet }: { sheet: Cheatsheet }) {
  return (
    <div className="space-y-8">
      {sheet.categories.map((cat) => (
        <section key={cat.name}>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-4 pb-2 border-b border-zinc-200 dark:border-zinc-800">
            {cat.name}
          </h2>
          <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 dark:bg-zinc-900 text-left">
                  <th className="px-4 py-2.5 font-semibold text-zinc-600 dark:text-zinc-400 w-[45%]">Command</th>
                  <th className="px-4 py-2.5 font-semibold text-zinc-600 dark:text-zinc-400">Description</th>
                  <th className="px-4 py-2.5 w-16 print:hidden" />
                </tr>
              </thead>
              <tbody>
                {cat.commands.map((row) => (
                  <tr key={row.cmd} className="border-t border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50">
                    <td className="px-4 py-3 align-top">
                      <code className="font-mono text-xs sm:text-sm text-indigo-700 dark:text-indigo-300 break-all">{row.cmd}</code>
                    </td>
                    <td className="px-4 py-3 align-top text-zinc-600 dark:text-zinc-400">{row.desc}</td>
                    <td className="px-2 py-3 align-top print:hidden">
                      <CopyCmdButton text={row.cmd} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </div>
  );
}

function CopyCmdButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);

  return (
    <button
      type="button"
      onClick={copy}
      className="p-1.5 rounded-md text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-colors"
      aria-label="Copy command"
    >
      {copied ? <CheckIcon className="w-4 h-4 text-emerald-500" /> : <CopyIcon className="w-4 h-4" />}
    </button>
  );
}

export function CheatsheetToolbar() {
  return <PrintButton />;
}
