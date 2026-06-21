"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { backupDrillChecklist } from "@/lib/backup-restore";

const STORAGE_KEY = "devops-backup-drill";

function loadChecked(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
  } catch {
    return {};
  }
}

export function BackupDrillChecklist() {
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

  const done = backupDrillChecklist.filter((i) => checked[i.id]).length;

  return (
    <div className="rounded-xl border border-lime-200 dark:border-lime-900/50 bg-lime-50/50 dark:bg-lime-950/20 p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold text-zinc-900 dark:text-white">Quarterly restore drill</p>
        <span className="text-xs text-zinc-500">
          {done}/{backupDrillChecklist.length}
        </span>
      </div>
      <ul className="space-y-2">
        {backupDrillChecklist.map((item) => (
          <li key={item.id}>
            <label className="flex items-start gap-2 cursor-pointer text-sm text-zinc-700 dark:text-zinc-300">
              <input
                type="checkbox"
                checked={!!checked[item.id]}
                onChange={() => toggle(item.id)}
                className="mt-0.5 w-4 h-4 rounded"
              />
              <span className={checked[item.id] ? "line-through text-zinc-400" : ""}>{item.label}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
