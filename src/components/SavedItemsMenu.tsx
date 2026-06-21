"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { getBookmarks, removeBookmark, type Bookmark } from "@/lib/bookmarks";

export function SavedItemsMenu() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Bookmark[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = () => setItems(getBookmarks());
    load();
    window.addEventListener("bookmarks-updated", load);
    return () => window.removeEventListener("bookmarks-updated", load);
  }, []);

  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  if (items.length === 0) return null;

  return (
    <div className="relative print:hidden" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900 transition-colors"
      >
        <span>★</span>
        <span className="hidden sm:inline">Saved</span>
        <span className="text-xs font-mono opacity-80">{items.length}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-72 max-h-80 overflow-y-auto rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl z-50">
          <div className="px-3 py-2 border-b border-zinc-100 dark:border-zinc-800">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Your saved items</p>
          </div>
          <ul className="py-1">
            {items.map((item) => (
              <li key={`${item.kind}-${item.slug}`} className="flex items-center gap-2 px-2 py-1 hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex-1 flex items-center gap-2 px-2 py-1.5 text-sm text-zinc-700 dark:text-zinc-300 min-w-0"
                >
                  <span className="shrink-0">{item.icon}</span>
                  <span className="truncate">{item.name}</span>
                </Link>
                <button
                  type="button"
                  onClick={() => removeBookmark(item.kind, item.slug)}
                  className="p-1.5 text-zinc-400 hover:text-red-500 rounded-md shrink-0"
                  aria-label="Remove"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
