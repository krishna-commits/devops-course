"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { goLiveChecklist, type GoLiveItem } from "@/lib/go-live-checklist";

const STORAGE_KEY = "devops-go-live-checklist";

function loadChecked(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
  } catch {
    return {};
  }
}

export function GoLiveChecklistPanel() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setChecked(loadChecked());
  }, []);

  const toggle = useCallback((id: string) => {
    setChecked((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const done = goLiveChecklist.filter((i) => checked[i.id]).length;
  const allDone = done === goLiveChecklist.length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-zinc-500">
          {done}/{goLiveChecklist.length} complete
          {allDone && <span className="ml-2 text-emerald-600 font-medium">— ready for prod</span>}
        </p>
        <button
          type="button"
          onClick={() => {
            localStorage.removeItem(STORAGE_KEY);
            setChecked({});
          }}
          className="text-xs text-zinc-400 hover:text-zinc-600"
        >
          Reset
        </button>
      </div>
      <ul className="space-y-3">
        {goLiveChecklist.map((item) => (
          <ChecklistRow key={item.id} item={item} isChecked={!!checked[item.id]} onToggle={() => toggle(item.id)} />
        ))}
      </ul>
    </div>
  );
}

function ChecklistRow({
  item,
  isChecked,
  onToggle,
}: {
  item: GoLiveItem;
  isChecked: boolean;
  onToggle: () => void;
}) {
  return (
    <li
      className={`rounded-xl border p-4 transition-colors ${
        isChecked
          ? "border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-950/20"
          : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
      }`}
    >
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={onToggle}
          className="mt-1 w-4 h-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500"
        />
        <div className="flex-1 min-w-0">
          <p className={`font-medium text-sm ${isChecked ? "text-zinc-500 line-through" : "text-zinc-900 dark:text-white"}`}>
            {item.label}
          </p>
          <p className="text-xs text-zinc-500 mt-0.5">{item.detail}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {item.href && (
              <Link href={item.href} className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">
                Guide →
              </Link>
            )}
            {item.prodDeltaSlug && (
              <Link
                href={`/deployments/${item.prodDeltaSlug}/#prod-delta`}
                className="text-xs text-amber-600 dark:text-amber-400 hover:underline"
              >
                Prod delta →
              </Link>
            )}
            {item.snippetId && (
              <Link href={`/snippets/#${item.snippetId}`} className="text-xs text-teal-600 dark:text-teal-400 hover:underline">
                Snippet →
              </Link>
            )}
          </div>
        </div>
      </label>
    </li>
  );
}
