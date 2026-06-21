import Link from "next/link";
import { getCategoryMeta } from "@/lib/categories";
import { ArrowRightIcon } from "./icons";

interface ToolCardProps {
  slug: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  categoryName: string;
  featured?: boolean;
}

export function ToolCard({
  slug,
  name,
  description,
  icon,
  category,
  categoryName,
  featured = false,
}: ToolCardProps) {
  const meta = getCategoryMeta(category);

  return (
    <Link
      href={`/tools/${slug}/`}
      className={`group relative flex flex-col rounded-2xl border bg-white dark:bg-zinc-900 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/10 ${
        featured ? "p-6 border-zinc-200 dark:border-zinc-700" : "p-5 border-zinc-200/80 dark:border-zinc-800"
      } ${meta.border} hover:border-indigo-300 dark:hover:border-indigo-700`}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <span className="text-3xl w-12 h-12 flex items-center justify-center rounded-xl bg-zinc-50 dark:bg-zinc-800 group-hover:scale-105 transition-transform shrink-0">
          {icon}
        </span>
        <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${meta.bg} ${meta.color}`}>
          {categoryName}
        </span>
      </div>
      <h3 className="font-bold text-zinc-900 dark:text-white text-base mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
        {name}
      </h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 flex-1">
        {description}
      </p>
      <div className="flex items-center gap-1 mt-3 text-sm font-medium text-indigo-600 dark:text-indigo-400">
        Open guide
        <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </div>
    </Link>
  );
}

export function ToolCardCompact({
  slug,
  name,
  icon,
  active = false,
}: {
  slug: string;
  name: string;
  icon: string;
  active?: boolean;
}) {
  return (
    <Link
      href={`/tools/${slug}/`}
      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
        active
          ? "bg-indigo-600 text-white font-medium shadow-md shadow-indigo-500/25"
          : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white"
      }`}
    >
      <span className="text-base shrink-0">{icon}</span>
      <span className="truncate">{name}</span>
    </Link>
  );
}
