export type BookmarkKind = "tool" | "deployment" | "cheatsheet";

export interface Bookmark {
  kind: BookmarkKind;
  slug: string;
  name: string;
  icon: string;
  href: string;
  savedAt: number;
}

const STORAGE_KEY = "devops-world-bookmarks";

export function getBookmarks(): Bookmark[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Bookmark[];
    return Array.isArray(parsed) ? parsed.sort((a, b) => b.savedAt - a.savedAt) : [];
  } catch {
    return [];
  }
}

export function saveBookmarks(items: Bookmark[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("bookmarks-updated"));
}

export function isBookmarked(kind: BookmarkKind, slug: string): boolean {
  return getBookmarks().some((b) => b.kind === kind && b.slug === slug);
}

export function toggleBookmark(item: Omit<Bookmark, "savedAt">): boolean {
  const list = getBookmarks();
  const idx = list.findIndex((b) => b.kind === item.kind && b.slug === item.slug);
  if (idx >= 0) {
    list.splice(idx, 1);
    saveBookmarks(list);
    return false;
  }
  saveBookmarks([{ ...item, savedAt: Date.now() }, ...list]);
  return true;
}

export function removeBookmark(kind: BookmarkKind, slug: string) {
  saveBookmarks(getBookmarks().filter((b) => !(b.kind === kind && b.slug === slug)));
}
