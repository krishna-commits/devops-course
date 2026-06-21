"use client";

import { useCallback, useMemo, useState } from "react";
import { snippets, snippetTags, filterSnippets } from "@/lib/snippets";
import { CheckIcon, CopyIcon } from "./icons";

export function SnippetLibrary({
  fixedTag,
  hideTagFilters = false,
}: {
  fixedTag?: string;
  hideTagFilters?: boolean;
}) {
  const [tag, setTag] = useState<string | undefined>(fixedTag);
  const [query, setQuery] = useState("");

  const activeTag = fixedTag ?? tag;
  const list = useMemo(() => filterSnippets(activeTag, query), [activeTag, query]);

  return (
    <div>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by task — ECR push, debug DNS, force-unlock…"
        className="w-full mb-4 px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 outline-none focus:border-indigo-400 text-sm"
      />
      {!hideTagFilters && !fixedTag && (
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            type="button"
            onClick={() => setTag(undefined)}
            className={`text-xs px-3 py-1 rounded-full border transition-colors ${!tag ? "bg-indigo-600 text-white border-indigo-600" : "border-zinc-200 dark:border-zinc-700 text-zinc-600"}`}
          >
            All ({snippets.length})
          </button>
          {snippetTags.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTag(t.id)}
              className={`text-xs px-3 py-1 rounded-full border transition-colors ${tag === t.id ? "bg-indigo-600 text-white border-indigo-600" : "border-zinc-200 dark:border-zinc-700 text-zinc-600"}`}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      )}
      <div className="space-y-3">
        {list.map((s) => (
          <SnippetRow
            key={s.id}
            id={s.id}
            task={s.task}
            cmd={s.cmd}
            tags={s.tags}
            destructive={s.destructive}
            destructiveNote={s.destructiveNote}
          />
        ))}
      </div>
    </div>
  );
}

function SnippetRow({ id, task, cmd, tags, destructive, destructiveNote }: { id: string; task: string; cmd: string; tags: string[]; destructive?: boolean; destructiveNote?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [cmd]);

  return (
    <article
      id={id}
      className={`scroll-mt-24 rounded-xl border bg-white dark:bg-zinc-900 ${
        destructive
          ? "border-amber-300 dark:border-amber-800/60 ring-1 ring-amber-200/50 dark:ring-amber-900/30"
          : "border-zinc-200 dark:border-zinc-800"
      }`}
    >
      {destructive && (
        <div className="px-4 py-2 bg-amber-50 dark:bg-amber-950/40 border-b border-amber-200 dark:border-amber-900/50 text-xs text-amber-900 dark:text-amber-100">
          <span className="font-semibold">⚠️ Destructive</span>
          {" — "}
          {destructiveNote ?? "Run in staging first. Can cause data loss or outage in production."}
        </div>
      )}
      <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-zinc-100 dark:border-zinc-800">
        <div>
          <h3 className="font-medium text-sm text-zinc-900 dark:text-white">{task}</h3>
          <p className="text-[10px] text-zinc-400 mt-0.5">{tags.join(" · ")}</p>
        </div>
        <button type="button" onClick={copy} className="p-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-950 text-zinc-400">
          {copied ? <CheckIcon className="w-4 h-4 text-emerald-500" /> : <CopyIcon className="w-4 h-4" />}
        </button>
      </div>
      <pre className="px-4 py-3 text-xs font-mono text-indigo-800 dark:text-indigo-200 overflow-x-auto whitespace-pre-wrap">{cmd}</pre>
    </article>
  );
}
