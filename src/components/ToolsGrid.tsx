"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { getCategoryMeta } from "@/lib/categories";
import { matchSearchQuery, scoreSearchMatch } from "@/lib/search-index";
import { ToolCard } from "@/components/ToolCard";
import { SearchIcon } from "@/components/icons";

interface ToolItem {
  slug: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  categoryName: string;
  simpleTitle?: string;
  keywords?: string[];
}

interface CategoryGroup {
  id: string;
  name: string;
  description: string;
  tools: ToolItem[];
}

interface ToolsGridProps {
  navigation: CategoryGroup[];
  allTools: ToolItem[];
}

function searchFields(tool: ToolItem): string[] {
  return [
    tool.slug,
    tool.name,
    tool.simpleTitle ?? "",
    tool.description,
    tool.categoryName,
    ...(tool.keywords ?? []),
  ];
}

export function ToolsGrid({ navigation, allTools }: ToolsGridProps) {
  const [filter, setFilter] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const q = filter.trim();

  const filtered = useMemo(() => {
    let items = allTools;
    if (activeCategory) items = items.filter((t) => t.category === activeCategory);
    if (q) {
      items = items
        .filter((t) => matchSearchQuery(q, searchFields(t)))
        .sort((a, b) => scoreSearchMatch(q, b) - scoreSearchMatch(q, a));
    } else {
      items = [...items].sort((a, b) => a.name.localeCompare(b.name));
    }
    return items;
  }, [allTools, activeCategory, q]);

  const hasFilters = Boolean(q || activeCategory);

  return (
    <>
      <div className="sticky top-16 z-30 -mx-4 px-4 py-4 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-lg border-b border-zinc-200 dark:border-zinc-800 mb-6 space-y-3">
        <div className="relative max-w-2xl">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 pointer-events-none" />
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search by tool name or keyword — docker, nginx, k8s, terraform…"
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
              !activeCategory ? "bg-indigo-600 text-white" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            }`}
          >
            All ({allTools.length})
          </button>
          {navigation.map((cat) => {
            const meta = getCategoryMeta(cat.id);
            const count = allTools.filter((t) => t.category === cat.id).length;
            if (count === 0) return null;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeCategory === cat.id ? "bg-indigo-600 text-white" : `${meta.bg} ${meta.color} hover:opacity-90`
                }`}
              >
                {meta.icon} {cat.name.split(" & ")[0]} ({count})
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 mb-6">
        <p className="text-sm text-zinc-500">
          {filtered.length} guide{filtered.length !== 1 ? "s" : ""}
          {q ? ` matching “${q}”` : activeCategory ? ` in ${navigation.find((c) => c.id === activeCategory)?.name}` : ""}
        </p>
        {hasFilters && (
          <button
            type="button"
            onClick={() => { setFilter(""); setActiveCategory(null); }}
            className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline shrink-0"
          >
            Clear
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700">
          <p className="text-zinc-600 dark:text-zinc-300 font-medium mb-1">No guides found</p>
          <p className="text-sm text-zinc-400 mb-4">Try a tool name like docker, nginx, or jenkins</p>
          <button
            type="button"
            onClick={() => { setFilter(""); setActiveCategory(null); }}
            className="text-sm text-indigo-600 hover:underline"
          >
            Show all guides
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((tool) => (
            <ToolCard key={tool.slug} {...tool} />
          ))}
        </div>
      )}

      {!hasFilters && (
        <p className="text-center text-sm text-zinc-400 mt-8">
          Need YAML templates?{" "}
          <Link href="/deployments/" className="text-violet-600 dark:text-violet-400 hover:underline">
            Configs →
          </Link>
        </p>
      )}
    </>
  );
}
