"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { searchErrorFixes, type ErrorFix } from "@/lib/error-fix-index";
import { CheckIcon, CopyIcon, SearchIcon } from "./icons";

const POPULAR_ERRORS = [
  "502 Bad Gateway",
  "ImagePullBackOff",
  "CrashLoopBackOff",
  "Error acquiring the state lock",
  "Vault is sealed",
];

export function ErrorFixSearch({ autoFocus = false, large = false }: { autoFocus?: boolean; large?: boolean }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ErrorFix[]>([]);
  const router = useRouter();

  useEffect(() => {
    setResults(searchErrorFixes(query));
  }, [query]);

  const inputClass = large
    ? "w-full pl-12 pr-4 py-4 text-base rounded-2xl bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-700 focus:border-red-400 dark:focus:border-red-600 outline-none shadow-lg"
    : "w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:border-red-400 outline-none";

  return (
    <div className="w-full">
      <div className="relative">
        <SearchIcon className={`absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 ${large ? "w-5 h-5" : "w-4 h-4"}`} />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && results[0]) router.push(results[0].href);
          }}
          placeholder="Paste error — 502 Bad Gateway, ImagePullBackOff, state lock…"
          className={inputClass}
          autoFocus={autoFocus}
        />
      </div>

      {!query && (
        <div className="flex flex-wrap gap-2 mt-3">
          {POPULAR_ERRORS.map((err) => (
            <button
              key={err}
              type="button"
              onClick={() => setQuery(err)}
              className="text-xs px-2.5 py-1 rounded-full bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900 hover:bg-red-100 transition-colors"
            >
              {err}
            </button>
          ))}
        </div>
      )}

      {query && results.length > 0 && (
        <ul className="mt-4 space-y-3">
          {results.map((fix) => (
            <ErrorFixResult key={fix.id} fix={fix} />
          ))}
        </ul>
      )}

      {query && results.length === 0 && (
        <p className="mt-4 text-sm text-zinc-500">No match — try ⌘K or browse <Link href="/runbooks/" className="text-indigo-600 hover:underline">runbooks</Link>.</p>
      )}
    </div>
  );
}

function ErrorFixResult({ fix }: { fix: ErrorFix }) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(fix.commands);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [fix.commands]);

  return (
    <li className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
      <div className="flex items-start justify-between gap-3 px-4 py-3 border-b border-zinc-100 dark:border-zinc-800">
        <div>
          <Link href={fix.href} className="font-semibold text-zinc-900 dark:text-white hover:text-indigo-600">
            {fix.icon} {fix.error}
          </Link>
          <p className="text-xs text-zinc-500 mt-0.5">{fix.sourceName} · {fix.source === "runbook" ? "Runbook" : "Troubleshoot"}</p>
        </div>
        <button type="button" onClick={copy} className="shrink-0 p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400" aria-label="Copy commands">
          {copied ? <CheckIcon className="w-4 h-4 text-emerald-500" /> : <CopyIcon className="w-4 h-4" />}
        </button>
      </div>
      <pre className="px-4 py-3 text-xs font-mono text-zinc-700 dark:text-zinc-300 overflow-x-auto whitespace-pre-wrap">{fix.commands}</pre>
    </li>
  );
}
