"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { categories, getCategoryMeta } from "@/lib/categories";
import { utilityCategories } from "@/lib/utilities/catalog";
import {
  QUICK_SEARCH_TERMS,
  scoreSearchMatch,
  matchSearchQuery,
} from "@/lib/search-index";
import { CloseIcon, SearchIcon } from "./icons";

export interface SearchItem {
  kind?: "tool" | "deployment" | "utility" | "cheatsheet" | "runbook" | "compare" | "error" | "snippet" | "flow";
  slug: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  categoryName: string;
  simpleTitle?: string;
  keywords?: string[];
  href?: string;
}

interface SearchProps {
  items: SearchItem[];
  variant?: "hero" | "header";
  onSelect?: (item: SearchItem) => void;
}

type CategoryFilter = "all" | "config" | "utilities" | string;

function itemHref(item: SearchItem): string {
  if (item.href) return item.href;
  if (item.kind === "deployment") return `/deployments/${item.slug}/`;
  if (item.kind === "utility") return `/utilities/${item.slug}/`;
  if (item.kind === "cheatsheet") return `/cheatsheets/${item.slug}/`;
  if (item.kind === "runbook") return `/runbooks/${item.slug}/`;
  if (item.kind === "compare") return `/compare/${item.slug}/`;
  return `/tools/${item.slug}/`;
}

function highlightText(text: string, query: string) {
  const q = query.trim();
  if (!q) return text;
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-amber-200/80 dark:bg-amber-500/30 text-inherit rounded px-0.5">{text.slice(idx, idx + q.length)}</mark>
      {text.slice(idx + q.length)}
    </>
  );
}

function SearchResultRow({
  item,
  query,
  selected,
  onClick,
  onMouseEnter,
}: {
  item: SearchItem;
  query: string;
  selected: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
}) {
  const meta = getCategoryMeta(item.category);
  const isDeployment = item.kind === "deployment";
  const isUtility = item.kind === "utility";
  const isCheatsheet = item.kind === "cheatsheet";
  const isRunbook = item.kind === "runbook";
  const isCompare = item.kind === "compare";
  const isError = item.kind === "error";
  const isSnippet = item.kind === "snippet";
  const isFlow = item.kind === "flow";

  const kindLabel = isDeployment
    ? "Config"
    : isUtility
      ? "Utility"
      : isCheatsheet
        ? "Quick ref"
        : isRunbook
          ? "Runbook"
          : isCompare
            ? "Compare"
            : isError
              ? "Error fix"
              : isSnippet
                ? "Snippet"
                : isFlow
                  ? "Flow"
                  : item.categoryName;

  const badgeClass = isDeployment
    ? "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300"
    : isUtility
      ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300"
      : isCheatsheet
        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
        : isRunbook
          ? "bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300"
          : isCompare
            ? "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300"
            : isError
              ? "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300"
              : isSnippet
                ? "bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300"
                : isFlow
                  ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300"
                  : `${meta.bg} ${meta.color}`;

  const prefix = isDeployment ? "Config · " : isUtility ? "Utility · " : isCheatsheet ? "Cheat sheet · " : isRunbook ? "Runbook · " : isCompare ? "Compare · " : isError ? "Fix · " : isSnippet ? "Snippet · " : isFlow ? "Flow · " : "";

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
        selected ? "bg-indigo-50 dark:bg-indigo-950/50" : "hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
      }`}
    >
      <span className="text-xl w-9 h-9 flex items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 shrink-0">
        {item.icon}
      </span>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm text-zinc-900 dark:text-white truncate">
          {highlightText(item.name, query)}
        </p>
        <p className="text-xs text-zinc-500 truncate">
          {prefix}
          {highlightText(item.description, query)}
        </p>
      </div>
      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 ${badgeClass}`}>
        {kindLabel}
      </span>
    </button>
  );
}

export function Search({ items, variant = "header", onSelect }: SearchProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const toolCount = items.filter((i) => !i.kind || i.kind === "tool").length;
  const configCount = items.filter((i) => i.kind === "deployment").length;
  const utilityCount = items.filter((i) => i.kind === "utility").length;
  const cheatsheetCount = items.filter((i) => i.kind === "cheatsheet").length;

  const filteredItems = useMemo(() => {
    if (categoryFilter === "all") return items;
    if (categoryFilter === "config") return items.filter((i) => i.kind === "deployment");
    if (categoryFilter === "utilities") return items.filter((i) => i.kind === "utility");
    if (categoryFilter === "cheatsheet") return items.filter((i) => i.kind === "cheatsheet");
    return items.filter((i) => i.kind === "tool" && i.category === categoryFilter);
  }, [items, categoryFilter]);

  const flatResults = useMemo(() => {
    const q = query.trim();
    if (!q) return [];
    return filteredItems
      .filter((item) =>
        matchSearchQuery(q, [
          item.slug,
          item.name,
          item.simpleTitle ?? "",
          item.description,
          item.categoryName,
          ...(item.keywords ?? []),
        ])
      )
      .sort((a, b) =>
        scoreSearchMatch(q, {
          slug: b.slug,
          name: b.name,
          simpleTitle: b.simpleTitle,
          description: b.description,
          categoryName: b.categoryName,
          keywords: b.keywords,
          kind: b.kind,
        }) -
        scoreSearchMatch(q, {
          slug: a.slug,
          name: a.name,
          simpleTitle: a.simpleTitle,
          description: a.description,
          categoryName: a.categoryName,
          keywords: a.keywords,
          kind: a.kind,
        })
      )
      .slice(0, 25);
  }, [query, filteredItems]);

  const browseGroups = useMemo(() => {
    const empty = {
      byCategory: [] as { id: string; name: string; icon: string; items: SearchItem[] }[],
      configs: [] as SearchItem[],
      utilities: [] as SearchItem[],
      cheatsheets: [] as SearchItem[],
    };
    if (query.trim()) return empty;

    const tools = filteredItems.filter((i) => i.kind === "tool" || !i.kind);
    const utilityItems = filteredItems.filter((i) => i.kind === "utility");
    const cheatsheetItems = filteredItems.filter((i) => i.kind === "cheatsheet");
    const configs = categoryFilter === "all" || categoryFilter === "config"
      ? items.filter((i) => i.kind === "deployment").slice(0, categoryFilter === "config" ? 20 : 6)
      : [];
    const cheatsheets =
      categoryFilter === "all" || categoryFilter === "cheatsheet"
        ? (categoryFilter === "cheatsheet" ? cheatsheetItems : items.filter((i) => i.kind === "cheatsheet")).slice(
            0,
            categoryFilter === "cheatsheet" ? 20 : 6
          )
        : [];

    const byCategory = categories
      .map((cat) => ({
        id: cat.id,
        name: cat.name,
        icon: getCategoryMeta(cat.id).icon,
        items: tools.filter((t) => t.category === cat.id).sort((a, b) => a.name.localeCompare(b.name)),
      }))
      .filter((g) => g.items.length > 0);

    const utilitiesByCategory =
      categoryFilter === "all" || categoryFilter === "utilities"
        ? utilityCategories
            .map((cat) => ({
              id: `utility-${cat.id}`,
              name: cat.name,
              icon: cat.icon,
              items: utilityItems.filter((u) => u.category === cat.id).sort((a, b) => a.name.localeCompare(b.name)),
            }))
            .filter((g) => g.items.length > 0)
        : [];

    return {
      byCategory:
        categoryFilter === "utilities"
          ? utilitiesByCategory
          : categoryFilter === "cheatsheet"
            ? []
            : byCategory,
      configs,
      utilities: categoryFilter === "all" ? utilitiesByCategory.flatMap((g) => g.items).slice(0, 6) : [],
      cheatsheets,
    };
  }, [query, filteredItems, items, categoryFilter]);

  const browseFlat = useMemo(() => {
    if (query.trim()) return [];
    const list: SearchItem[] = [];
    browseGroups.byCategory.forEach((g) => list.push(...g.items));
    if (browseGroups.configs.length) list.push(...browseGroups.configs);
    if (browseGroups.cheatsheets.length) list.push(...browseGroups.cheatsheets);
    if (browseGroups.utilities.length) list.push(...browseGroups.utilities);
    return list;
  }, [query, browseGroups]);

  const activeList = query.trim() ? flatResults : browseFlat;

  const openPalette = useCallback(() => {
    setOpen(true);
    setQuery("");
    setCategoryFilter("all");
    setSelected(0);
  }, []);

  const closePalette = useCallback(() => {
    setOpen(false);
    setQuery("");
    setCategoryFilter("all");
    setSelected(0);
  }, []);

  const navigate = useCallback(
    (item: SearchItem) => {
      closePalette();
      if (onSelect) onSelect(item);
      else router.push(itemHref(item));
    },
    [closePalette, onSelect, router]
  );

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        openPalette();
      }
      if (e.key === "Escape") closePalette();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openPalette, closePalette]);

  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  useEffect(() => setSelected(0), [query, categoryFilter]);

  useEffect(() => {
    if (!listRef.current || activeList.length === 0) return;
    const el = listRef.current.querySelector(`[data-index="${selected}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [selected, activeList.length]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, activeList.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter" && activeList[selected]) {
      navigate(activeList[selected]);
    }
  }

  const triggerClass =
    variant === "hero"
      ? "w-full flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white/70 hover:bg-white/15 hover:border-white/30 transition-all shadow-2xl shadow-black/20"
      : "flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-indigo-300 dark:hover:border-indigo-600 hover:text-zinc-700 dark:hover:text-zinc-200 text-sm transition-all min-w-[180px] lg:min-w-[260px]";

  const filterPills: { id: CategoryFilter; label: string; icon?: string; count?: number }[] = [
    { id: "all", label: "All", count: toolCount + configCount + utilityCount + cheatsheetCount },
    ...categories.filter((c) => items.some((i) => i.category === c.id && i.kind === "tool")).map((c) => ({
      id: c.id,
      label: c.name.split(" & ")[0],
      icon: getCategoryMeta(c.id).icon,
      count: items.filter((i) => i.category === c.id && i.kind === "tool").length,
    })),
    { id: "cheatsheet", label: "Quick ref", icon: "📄", count: cheatsheetCount },
    { id: "config", label: "Configs", icon: "📋", count: configCount },
    { id: "utilities", label: "Utilities", icon: "🧰", count: utilityCount },
  ];

  let rowIndex = 0;

  return (
    <>
      <button type="button" onClick={openPalette} className={triggerClass}>
        <SearchIcon className={variant === "hero" ? "w-5 h-5 shrink-0" : "w-4 h-4 shrink-0"} />
        <span className={variant === "hero" ? "text-base flex-1 text-left" : "flex-1 text-left truncate"}>
          Search guides & configs…
        </span>
        <kbd
          className={`hidden sm:inline-flex items-center px-2 py-0.5 rounded-md text-xs font-mono ${
            variant === "hero"
              ? "bg-black/20 border border-white/10 text-white/50"
              : "bg-zinc-200 dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-600 text-zinc-400"
          }`}
        >
          ⌘K
        </kbd>
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[8vh] px-3 sm:px-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm print:hidden" onClick={closePalette} />
          <div className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-700 overflow-hidden flex flex-col max-h-[80vh]">
            <div className="px-4 pt-4 pb-3 border-b border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <SearchIcon className="w-5 h-5 text-indigo-500 shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Tool name or keyword — docker, nginx, k8s, terraform…"
                  className="flex-1 py-2 bg-transparent text-zinc-900 dark:text-white placeholder:text-zinc-400 outline-none text-base"
                />
                <button type="button" onClick={closePalette} className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400">
                  <CloseIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="px-4 py-2 border-b border-zinc-100 dark:border-zinc-800 overflow-x-auto flex gap-1.5 shrink-0">
              {filterPills.map((pill) => (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => setCategoryFilter(pill.id)}
                  className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full whitespace-nowrap transition-colors shrink-0 ${
                    categoryFilter === pill.id
                      ? pill.id === "config"
                        ? "bg-violet-600 text-white"
                        : pill.id === "cheatsheet"
                          ? "bg-emerald-600 text-white"
                          : "bg-indigo-600 text-white"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-indigo-50 dark:hover:bg-indigo-950"
                  }`}
                >
                  {pill.icon && <span>{pill.icon}</span>}
                  {pill.label}
                  {pill.count !== undefined && (
                    <span className={`text-[10px] opacity-70`}>{pill.count}</span>
                  )}
                </button>
              ))}
            </div>

            {!query && (
              <div className="px-4 py-2 border-b border-zinc-100 dark:border-zinc-800 shrink-0">
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_SEARCH_TERMS.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setQuery(term)}
                      className="px-2.5 py-1 text-xs rounded-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:border-indigo-400 hover:text-indigo-600 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={listRef} className="flex-1 overflow-y-auto min-h-0">
              {query.trim() && (
                <p className="px-4 py-2 text-xs text-zinc-400 sticky top-0 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-100 dark:border-zinc-800 z-10">
                  {flatResults.length === 0
                    ? `No results for “${query}”`
                    : `${flatResults.length} result${flatResults.length === 1 ? "" : "s"}`}
                </p>
              )}

              {query.trim() ? (
                flatResults.length === 0 ? (
                  <div className="px-4 py-12 text-center">
                    <p className="text-zinc-600 dark:text-zinc-300 font-medium mb-2">Nothing found</p>
                    <p className="text-sm text-zinc-400">Try docker, kubernetes, nginx, jenkins, vault</p>
                  </div>
                ) : (
                  flatResults.map((item, i) => (
                    <div key={`${item.kind}-${item.slug}`} data-index={i}>
                      <SearchResultRow
                        item={item}
                        query={query}
                        selected={i === selected}
                        onClick={() => navigate(item)}
                        onMouseEnter={() => setSelected(i)}
                      />
                    </div>
                  ))
                )
              ) : (
                <>
                  {browseGroups.byCategory.map((group) => (
                    <div key={group.id}>
                      <div className="sticky top-0 z-10 px-4 py-1.5 bg-zinc-50/95 dark:bg-zinc-800/95 backdrop-blur-sm border-b border-zinc-100 dark:border-zinc-800 flex items-center gap-2">
                        <span className="text-sm">{group.icon}</span>
                        <span className="text-xs font-semibold text-zinc-500">{group.name}</span>
                        <span className="text-[10px] text-zinc-400 ml-auto">{group.items.length}</span>
                      </div>
                      {group.items.map((item) => {
                        const idx = rowIndex++;
                        return (
                          <div key={item.slug} data-index={idx}>
                            <SearchResultRow
                              item={item}
                              query=""
                              selected={idx === selected}
                              onClick={() => navigate(item)}
                              onMouseEnter={() => setSelected(idx)}
                            />
                          </div>
                        );
                      })}
                    </div>
                  ))}
                  {browseGroups.configs.length > 0 && (
                    <div>
                      <div className="sticky top-0 z-10 px-4 py-1.5 bg-violet-50/95 dark:bg-violet-950/40 backdrop-blur-sm border-b border-violet-100 dark:border-violet-900 flex items-center gap-2">
                        <span>📋</span>
                        <span className="text-xs font-semibold text-violet-600 dark:text-violet-400">Config templates</span>
                        <span className="text-[10px] text-violet-400 ml-auto">{browseGroups.configs.length}</span>
                      </div>
                      {browseGroups.configs.map((item) => {
                        const idx = rowIndex++;
                        return (
                          <div key={item.slug} data-index={idx}>
                            <SearchResultRow
                              item={item}
                              query=""
                              selected={idx === selected}
                              onClick={() => navigate(item)}
                              onMouseEnter={() => setSelected(idx)}
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {browseGroups.cheatsheets.length > 0 && (
                    <div>
                      <div className="sticky top-0 z-10 px-4 py-1.5 bg-emerald-50/95 dark:bg-emerald-950/40 backdrop-blur-sm border-b border-emerald-100 dark:border-emerald-900 flex items-center gap-2">
                        <span>📄</span>
                        <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">Cheat sheets</span>
                        <span className="text-[10px] text-emerald-500 ml-auto">{browseGroups.cheatsheets.length}</span>
                      </div>
                      {browseGroups.cheatsheets.map((item) => {
                        const idx = rowIndex++;
                        return (
                          <div key={item.slug} data-index={idx}>
                            <SearchResultRow
                              item={item}
                              query=""
                              selected={idx === selected}
                              onClick={() => navigate(item)}
                              onMouseEnter={() => setSelected(idx)}
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {browseGroups.utilities.length > 0 && (
                    <div>
                      <div className="sticky top-0 z-10 px-4 py-1.5 bg-indigo-50/95 dark:bg-indigo-950/40 backdrop-blur-sm border-b border-indigo-100 dark:border-indigo-900 flex items-center gap-2">
                        <span>🧰</span>
                        <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-400">Utilities</span>
                        <span className="text-[10px] text-indigo-500 ml-auto">{browseGroups.utilities.length}</span>
                      </div>
                      {browseGroups.utilities.map((item) => {
                        const idx = rowIndex++;
                        return (
                          <div key={item.slug} data-index={idx}>
                            <SearchResultRow
                              item={item}
                              query=""
                              selected={idx === selected}
                              onClick={() => navigate(item)}
                              onMouseEnter={() => setSelected(idx)}
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700 flex items-center gap-4 text-xs text-zinc-400 shrink-0">
              <span><kbd className="px-1 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 border font-mono text-[10px]">↑↓</kbd> move</span>
              <span><kbd className="px-1 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 border font-mono text-[10px]">↵</kbd> open</span>
              <span><kbd className="px-1 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 border font-mono text-[10px]">esc</kbd> close</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function SidebarSearch({
  filter,
  onFilterChange,
}: {
  items?: SearchItem[];
  filter: string;
  onFilterChange: (v: string) => void;
}) {
  return (
    <div className="relative mb-4">
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
      <input
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
        placeholder="Filter sidebar…"
        className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50"
      />
    </div>
  );
}
