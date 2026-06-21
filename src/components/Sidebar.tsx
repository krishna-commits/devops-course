"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getCategoryMeta } from "@/lib/categories";
import { matchSearchQuery } from "@/lib/search-index";
import type { SearchItem } from "./Search";
import { SidebarSearch } from "./Search";
import { ToolCardCompact } from "./ToolCard";
import { ChevronIcon } from "./icons";

interface NavCategory {
  id: string;
  name: string;
  description: string;
  tools: { slug: string; name: string; icon: string }[];
}

interface SidebarProps {
  navigation: NavCategory[];
  searchItems: SearchItem[];
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function SidebarClient({
  navigation,
  searchItems,
  mobileOpen = false,
  onMobileClose,
}: SidebarProps) {
  const pathname = usePathname();
  const [filter, setFilter] = useState("");
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const q = filter.trim();

  const searchable = Object.fromEntries(
    searchItems.map((item) => [item.slug, item])
  );

  const filteredNav = navigation
    .map((cat) => ({
      ...cat,
      tools: cat.tools.filter((t) => {
        if (!q) return true;
        const item = searchable[t.slug];
        return matchSearchQuery(q, [
          t.name,
          item?.simpleTitle ?? "",
          item?.description ?? "",
          cat.name,
          ...(item?.keywords ?? []),
        ]);
      }),
    }))
    .filter((cat) => cat.tools.length > 0);

  const activeSlug = pathname.startsWith("/tools/")
    ? pathname.replace("/tools/", "").replace(/\/$/, "")
    : null;

  function toggleCategory(id: string) {
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  const content = (
    <div className="flex flex-col h-full">
      <SidebarSearch items={searchItems} filter={filter} onFilterChange={setFilter} />

      <nav className="flex-1 overflow-y-auto space-y-1 pr-1 -mr-1">
        {filteredNav.length === 0 ? (
          <p className="text-sm text-zinc-500 px-2 py-4">No tools match your filter.</p>
        ) : (
          filteredNav.map((category) => {
            const meta = getCategoryMeta(category.id);
            const isOpen = q ? true : !collapsed[category.id];

            return (
              <div key={category.id} className="mb-3">
                <button
                  type="button"
                  onClick={() => toggleCategory(category.id)}
                  className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left group/cat ${meta.color}`}
                >
                  <ChevronIcon open={isOpen} className="w-3.5 h-3.5 opacity-50" />
                  <span className="text-xs font-bold uppercase tracking-wider flex-1">
                    {category.name}
                  </span>
                  <span className="text-[10px] font-mono opacity-50 bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
                    {category.tools.length}
                  </span>
                </button>

                {isOpen && (
                  <ul className="mt-1 space-y-0.5 pl-1">
                    {category.tools.map((tool) => (
                      <li key={tool.slug}>
                        <ToolCardCompact
                          slug={tool.slug}
                          name={tool.name}
                          icon={tool.icon}
                          active={activeSlug === tool.slug}
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })
        )}
      </nav>

      <div className="pt-4 mt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-2">
        <Link
          href="/tools/"
          onClick={onMobileClose}
          className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-900 transition-colors"
        >
          All tools
        </Link>
        <Link
          href="/deployments/"
          onClick={onMobileClose}
          className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-violet-50 dark:hover:bg-violet-950 hover:text-violet-600 transition-colors"
        >
          Configs →
        </Link>
        <Link
          href="/utilities/"
          onClick={onMobileClose}
          className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-indigo-50 dark:hover:bg-indigo-950 hover:text-indigo-600 transition-colors"
        >
          Utilities →
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-72 shrink-0 flex-col border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-950/80 backdrop-blur-sm print:hidden">
        <div className="sticky top-[65px] h-[calc(100vh-65px)] overflow-hidden flex flex-col p-4">
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3 px-1">
            Tools
          </p>
          {content}
        </div>
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onMobileClose}
          />
          <aside className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white dark:bg-zinc-900 shadow-2xl flex flex-col p-4 animate-slide-in">
            <div className="flex items-center justify-between mb-4">
              <p className="font-bold text-zinc-900 dark:text-white">Tools</p>
              <button
                type="button"
                onClick={onMobileClose}
                className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                ✕
              </button>
            </div>
            {content}
          </aside>
        </div>
      )}
    </>
  );
}
