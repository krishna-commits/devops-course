"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { UtilityCategory, UtilityDefinition } from "@/lib/utilities/catalog";
import { utilityCategories } from "@/lib/utilities/catalog";
import { matchSearchQuery, scoreSearchMatch } from "@/lib/search-index";
import { UtilityCard } from "@/components/UtilityCard";
import { SearchIcon } from "@/components/icons";

function searchFields(u: UtilityDefinition): string[] {
  return [u.slug, u.name, u.description, u.category, ...(u.keywords ?? [])];
}

interface UtilitiesGridProps {
  utilities: UtilityDefinition[];
}

export function UtilitiesGrid({ utilities }: UtilitiesGridProps) {
  const [filter, setFilter] = useState("");
  const [activeCategory, setActiveCategory] = useState<UtilityCategory | null>(null);

  const q = filter.trim();

  const filtered = useMemo(() => {
    let items = utilities;
    if (activeCategory) items = items.filter((u) => u.category === activeCategory);
    if (q) {
      items = items
        .filter((u) => matchSearchQuery(q, searchFields(u)))
        .sort((a, b) => scoreSearchMatch(q, b) - scoreSearchMatch(q, a));
    } else {
      items = [...items].sort((a, b) => a.name.localeCompare(b.name));
    }
    return items;
  }, [utilities, activeCategory, q]);

  const hasFilters = Boolean(q || activeCategory);

  return (
    <>
      <div className="sticky top-16 z-30 -mx-4 px-4 py-4 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-lg border-b border-zinc-200 dark:border-zinc-800 mb-6 space-y-3">
        <div className="relative max-w-2xl">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 pointer-events-none" />
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search utilities — json, base64, jwt, uuid, docker, hash…"
            className="w-full pl-10 pr-24 py-3 text-base rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400"
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className="hidden sm:inline-flex absolute right-3 top-1/2 -translate-y-1/2 items-center px-2 py-0.5 rounded-md text-[10px] font-mono bg-zinc-200 dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-600 text-zinc-500">
            ⌘K
          </kbd>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory(null)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              !activeCategory
                ? "bg-indigo-600 text-white"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            }`}
          >
            All ({utilities.length})
          </button>
          {utilityCategories.map((cat) => {
            const count = utilities.filter((u) => u.category === cat.id).length;
            if (count === 0) return null;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeCategory === cat.id
                    ? "bg-indigo-600 text-white"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                }`}
              >
                {cat.icon} {cat.name.split(" & ")[0]} ({count})
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 mb-6">
        <p className="text-sm text-zinc-500">
          {filtered.length} utilit{filtered.length !== 1 ? "ies" : "y"}
          {q ? ` matching “${q}”` : activeCategory ? ` in ${utilityCategories.find((c) => c.id === activeCategory)?.name}` : ""}
        </p>
        {hasFilters && (
          <button
            type="button"
            onClick={() => {
              setFilter("");
              setActiveCategory(null);
            }}
            className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline shrink-0"
          >
            Clear
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700">
          <p className="text-zinc-600 dark:text-zinc-300 font-medium mb-1">No utilities found</p>
          <p className="text-sm text-zinc-400 mb-4">Try json, base64, jwt, uuid, or docker</p>
          <button
            type="button"
            onClick={() => {
              setFilter("");
              setActiveCategory(null);
            }}
            className="text-sm text-indigo-600 hover:underline"
          >
            Show all utilities
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((u) => (
            <UtilityCard key={u.slug} {...u} />
          ))}
        </div>
      )}

      {!hasFilters && (
        <p className="text-center text-sm text-zinc-400 mt-8">
          Need setup guides?{" "}
          <Link href="/tools/" className="text-indigo-600 dark:text-indigo-400 hover:underline">
            Tools →
          </Link>
        </p>
      )}
    </>
  );
}
