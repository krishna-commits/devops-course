"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { SearchItem } from "./Search";
import { Search } from "./Search";
import { SidebarClient } from "./Sidebar";
import { ConfigSidebar } from "./ConfigSidebar";
import { UtilitiesSidebar } from "./UtilitiesSidebar";
import { MenuIcon, TerminalIcon } from "./icons";
import { SavedItemsMenu } from "./SavedItemsMenu";
export { Footer } from "./Footer";

interface NavCategory {
  id: string;
  name: string;
  description: string;
  tools: { slug: string; name: string; icon: string }[];
}

interface AppShellProps {
  children: React.ReactNode;
  navigation: NavCategory[];
  searchItems: SearchItem[];
  showSidebar?: boolean;
}

export function AppShell({
  children,
  navigation,
  searchItems,
  showSidebar,
}: AppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === "/" || pathname === "";
  const isToolsSection =
    pathname === "/tools" || pathname === "/tools/" || pathname.startsWith("/tools/");
  const isConfigSection = pathname.startsWith("/deployments");
  const isUtilitiesSection = pathname.startsWith("/utilities");
  const isCheatsheetsSection = pathname.startsWith("/cheatsheets");
  const isRunbooksSection = pathname.startsWith("/runbooks");
  const isCompareSection = pathname.startsWith("/compare");
  const isAboutSection = pathname.startsWith("/about");
  const isFixSection =
    pathname.startsWith("/fix") ||
    pathname.startsWith("/snippets") ||
    pathname.startsWith("/flows") ||
    pathname.startsWith("/deploy") ||
    pathname.startsWith("/oncall") ||
    pathname.startsWith("/go-live") ||
    pathname.startsWith("/standards") ||
    pathname.startsWith("/templates") ||
    pathname.startsWith("/observe") ||
    pathname.startsWith("/contribute") ||
    pathname.startsWith("/backup") ||
    pathname.startsWith("/rotate") ||
    pathname.startsWith("/network") ||
    pathname.startsWith("/certs") ||
    pathname.startsWith("/scripts") ||
    pathname.startsWith("/resources");

  const sidebarVisible = showSidebar ?? isToolsSection;

  const navLinks = [
    { href: "/", label: "Home", active: isHomePage },
    { href: "/tools/", label: "Tools", active: isToolsSection },
    { href: "/deployments/", label: "Configs", active: isConfigSection },
    { href: "/utilities/", label: "Utilities", active: isUtilitiesSection },
    { href: "/cheatsheets/", label: "Quick ref", active: isCheatsheetsSection },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl print:hidden">
        <div className="max-w-[1600px] mx-auto px-4 h-16 flex items-center gap-4">
          {sidebarVisible && (
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
              aria-label="Open menu"
            >
              <MenuIcon />
            </button>
          )}

          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-shadow">
              <TerminalIcon className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <p className="font-bold text-zinc-900 dark:text-white leading-tight">
                DevOps World
              </p>
              <p className="text-[10px] text-zinc-500 leading-tight">
                Commands · runbooks · flows
              </p>
            </div>
          </Link>

          <div className="flex-1 flex justify-center max-w-md mx-auto">
            <Search items={searchItems} variant="header" />
          </div>

          <SavedItemsMenu />

          <nav className="hidden md:flex items-center gap-1 shrink-0">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  link.active
                    ? link.href === "/"
                      ? "bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400"
                      : link.href.startsWith("/deployments")
                      ? "bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-400"
                      : link.href.startsWith("/cheatsheets")
                        ? "bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400"
                        : link.href.startsWith("/utilities")
                          ? "bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400"
                          : "bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400"
                    : link.href === "/"
                      ? "text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50"
                      : link.href.startsWith("/deployments")
                      ? "text-zinc-600 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/50"
                      : link.href.startsWith("/cheatsheets")
                        ? "text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/50"
                        : link.href.startsWith("/utilities")
                          ? "text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50"
                          : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <div className="flex flex-1 max-w-[1600px] mx-auto w-full">
        {sidebarVisible && (
          isConfigSection ? (
            <ConfigSidebar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />
          ) : isUtilitiesSection ? (
            <UtilitiesSidebar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />
          ) : (
            <SidebarClient
              navigation={navigation}
              searchItems={searchItems}
              mobileOpen={mobileOpen}
              onMobileClose={() => setMobileOpen(false)}
            />
          )
        )}
        {children}
      </div>
    </>
  );
}
