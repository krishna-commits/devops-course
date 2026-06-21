"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { utilities, utilityCategories, getUtilityCategoryMeta } from "@/lib/utilities/catalog";
import { matchSearchQuery } from "@/lib/search-index";
import { SidebarSearch } from "./Search";
import { UtilityCardCompact } from "./UtilityCard";
import { ChevronIcon } from "./icons";

interface UtilitiesSidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function UtilitiesSidebar({ mobileOpen = false, onMobileClose }: UtilitiesSidebarProps) {
  const pathname = usePathname();
  const [filter, setFilter] = useState("");
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const q = filter.trim();
  const activeSlug = pathname.startsWith("/utilities/")
    ? pathname.replace("/utilities/", "").replace(/\/$/, "")
    : null;

  const filtered = useMemo(() => {
    return utilityCategories
      .map((cat) => ({
        ...cat,
        items: utilities.filter((u) => {
          if (u.category !== cat.id) return false;
          if (!q) return true;
          return matchSearchQuery(q, [u.slug, u.name, u.description, cat.name, ...(u.keywords ?? [])]);
        }),
      }))
      .filter((g) => g.items.length > 0);
  }, [q]);

  function toggleCategory(id: string) {
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  const content = (
    <div className="flex flex-col h-full">
      <SidebarSearch filter={filter} onFilterChange={setFilter} />

      <nav className="flex-1 overflow-y-auto space-y-1 pr-1 -mr-1">
        {filtered.length === 0 ? (
          <p className="text-sm text-zinc-500 px-2 py-4">No utilities match your filter.</p>
        ) : (
          filtered.map((group) => {
            const meta = getUtilityCategoryMeta(group.id);
            const isOpen = q ? true : !collapsed[group.id];

            return (
              <div key={group.id} className="mb-3">
                <button
                  type="button"
                  onClick={() => toggleCategory(group.id)}
                  className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left ${meta.color}`}
                >
                  <ChevronIcon open={isOpen} className="w-3.5 h-3.5 opacity-50" />
                  <span className="text-xs font-bold uppercase tracking-wider flex-1">
                    {group.icon} {group.name}
                  </span>
                  <span className={`text-[10px] font-mono opacity-70 px-1.5 py-0.5 rounded ${meta.bg}`}>
                    {group.items.length}
                  </span>
                </button>
                {isOpen && (
                  <ul className="mt-1 space-y-0.5 pl-1">
                    {group.items.map((u) => (
                      <li key={u.slug}>
                        <UtilityCardCompact
                          slug={u.slug}
                          name={u.name}
                          icon={u.icon}
                          active={activeSlug === u.slug}
                          onClick={onMobileClose}
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
          href="/utilities/"
          onClick={onMobileClose}
          className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-900 transition-colors"
        >
          All utilities
        </Link>
        <Link
          href="/tools/"
          onClick={onMobileClose}
          className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-indigo-50 dark:hover:bg-indigo-950 hover:text-indigo-600 transition-colors"
        >
          ← Tools
        </Link>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:flex w-72 shrink-0 flex-col border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-950/80 backdrop-blur-sm print:hidden">
        <div className="sticky top-[65px] h-[calc(100vh-65px)] overflow-hidden flex flex-col p-4">
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3 px-1">
            Utilities
          </p>
          {content}
        </div>
      </aside>
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onMobileClose} />
          <aside className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white dark:bg-zinc-900 shadow-2xl flex flex-col p-4 animate-slide-in">
            <div className="flex items-center justify-between mb-4">
              <p className="font-bold text-zinc-900 dark:text-white">Utilities</p>
              <button type="button" onClick={onMobileClose} className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800">
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
