"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { deployments, deploymentTypes } from "@/lib/deployments";
import { matchSearchQuery } from "@/lib/search-index";
import { SidebarSearch } from "./Search";
import { ChevronIcon } from "./icons";

const typeStyles: Record<string, { color: string; bg: string }> = {
  "docker-compose": { color: "text-teal-700 dark:text-teal-300", bg: "bg-teal-50 dark:bg-teal-950/50" },
  kubernetes: { color: "text-violet-700 dark:text-violet-300", bg: "bg-violet-50 dark:bg-violet-950/50" },
  dockerfile: { color: "text-fuchsia-700 dark:text-fuchsia-300", bg: "bg-fuchsia-50 dark:bg-fuchsia-950/50" },
};

interface ConfigSidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function ConfigSidebar({ mobileOpen = false, onMobileClose }: ConfigSidebarProps) {
  const pathname = usePathname();
  const [filter, setFilter] = useState("");
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const q = filter.trim();

  const activeSlug = pathname.startsWith("/deployments/")
    ? pathname.replace("/deployments/", "").replace(/\/$/, "")
    : null;

  const filtered = deploymentTypes
    .map((type) => ({
      ...type,
      items: deployments.filter((d) => {
        if (d.type !== type.id) return false;
        if (!q) return true;
        return matchSearchQuery(q, [d.slug, d.name, d.description, type.name, d.type]);
      }),
    }))
    .filter((g) => g.items.length > 0);

  function toggleType(id: string) {
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  const content = (
    <div className="flex flex-col h-full">
      <SidebarSearch filter={filter} onFilterChange={setFilter} />

      <nav className="flex-1 overflow-y-auto space-y-1 pr-1 -mr-1">
        {filtered.length === 0 ? (
          <p className="text-sm text-zinc-500 px-2 py-4">No configs match your filter.</p>
        ) : (
          filtered.map((group) => {
            const style = typeStyles[group.id] ?? typeStyles.kubernetes;
            const isOpen = q ? true : !collapsed[group.id];

            return (
              <div key={group.id} className="mb-3">
                <button
                  type="button"
                  onClick={() => toggleType(group.id)}
                  className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left ${style.color}`}
                >
                  <ChevronIcon open={isOpen} className="w-3.5 h-3.5 opacity-50" />
                  <span className="text-xs font-bold uppercase tracking-wider flex-1">
                    {group.icon} {group.name}
                  </span>
                  <span className={`text-[10px] font-mono opacity-70 px-1.5 py-0.5 rounded ${style.bg}`}>
                    {group.items.length}
                  </span>
                </button>

                {isOpen && (
                  <ul className="mt-1 space-y-0.5 pl-1">
                    {group.items.map((recipe) => (
                      <li key={recipe.slug}>
                        <Link
                          href={`/deployments/${recipe.slug}/`}
                          onClick={onMobileClose}
                          className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
                            activeSlug === recipe.slug
                              ? "bg-violet-600 text-white font-medium shadow-md shadow-violet-500/25"
                              : "text-zinc-600 dark:text-zinc-400 hover:bg-violet-50 dark:hover:bg-violet-950/50 hover:text-violet-700 dark:hover:text-violet-300"
                          }`}
                        >
                          <span className="text-base shrink-0">{recipe.icon}</span>
                          <span className="truncate">{recipe.name}</span>
                        </Link>
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
          href="/deployments/"
          onClick={onMobileClose}
          className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-lg bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 hover:bg-violet-200 dark:hover:bg-violet-900 transition-colors"
        >
          All configs
        </Link>
        <Link
          href="/tools/"
          onClick={onMobileClose}
          className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-indigo-50 dark:hover:bg-indigo-950 hover:text-indigo-600 transition-colors"
        >
          ← Tools
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
      <aside className="hidden lg:flex w-72 shrink-0 flex-col border-r border-violet-200/60 dark:border-violet-900/40 bg-violet-50/30 dark:bg-violet-950/20 backdrop-blur-sm print:hidden">
        <div className="sticky top-[65px] h-[calc(100vh-65px)] overflow-hidden flex flex-col p-4">
          <p className="text-xs font-semibold text-violet-500 dark:text-violet-400 uppercase tracking-widest mb-3 px-1">
            Configs
          </p>
          {content}
        </div>
      </aside>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onMobileClose} />
          <aside className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white dark:bg-zinc-900 shadow-2xl flex flex-col p-4 animate-slide-in">
            <div className="flex items-center justify-between mb-4">
              <p className="font-bold text-violet-700 dark:text-violet-300">Configs</p>
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
