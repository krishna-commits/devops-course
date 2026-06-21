import Link from "next/link";
import { getCheatsheetForTool } from "@/lib/cheatsheets";

export function QuickReferenceLink({ toolSlug }: { toolSlug: string }) {
  const sheet = getCheatsheetForTool(toolSlug);
  if (!sheet) return null;

  return (
    <Link
      href={`/cheatsheets/${sheet.slug}/`}
      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors print:hidden"
    >
      📋 Quick reference →
    </Link>
  );
}
