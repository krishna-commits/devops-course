"use client";

import { useCallback, useEffect, useState } from "react";
import { isBookmarked, toggleBookmark, type BookmarkKind } from "@/lib/bookmarks";

interface BookmarkButtonProps {
  kind: BookmarkKind;
  slug: string;
  name: string;
  icon: string;
  href: string;
  className?: string;
}

export function BookmarkButton({ kind, slug, name, icon, href, className = "" }: BookmarkButtonProps) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(isBookmarked(kind, slug));
    const onUpdate = () => setSaved(isBookmarked(kind, slug));
    window.addEventListener("bookmarks-updated", onUpdate);
    return () => window.removeEventListener("bookmarks-updated", onUpdate);
  }, [kind, slug]);

  const toggle = useCallback(() => {
    const nowSaved = toggleBookmark({ kind, slug, name, icon, href });
    setSaved(nowSaved);
  }, [kind, slug, name, icon, href]);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={saved ? "Remove bookmark" : "Save bookmark"}
      title={saved ? "Remove from saved" : "Save for later"}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium border transition-all print:hidden ${
        saved
          ? "bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300"
          : "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-500 hover:text-amber-600 hover:border-amber-300"
      } ${className}`}
    >
      <span className={saved ? "text-amber-500" : "opacity-70"}>{saved ? "★" : "☆"}</span>
      <span className="hidden sm:inline">{saved ? "Saved" : "Save"}</span>
    </button>
  );
}
