import type { OS } from "./types";

const STORAGE_KEY = "devops-world-preferred-os";

export function getPreferredOS(): OS | null {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(STORAGE_KEY);
  if (v === "linux" || v === "mac" || v === "windows") return v;
  return null;
}

export function setPreferredOS(os: OS): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, os);
}
