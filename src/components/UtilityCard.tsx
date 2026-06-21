import Link from "next/link";
import type { UtilityCategory } from "@/lib/utilities/catalog";
import { getUtilityCategoryMeta, getUtilityCategoryName } from "@/lib/utilities/catalog";
import { ArrowRightIcon } from "./icons";

interface UtilityCardProps {
  slug: string;
  name: string;
  description: string;
  icon: string;
  category: UtilityCategory;
}

export function UtilityCard({ slug, name, description, icon, category }: UtilityCardProps) {
  const meta = getUtilityCategoryMeta(category);
  const categoryName = getUtilityCategoryName(category);

  return (
    <Link
      href={`/utilities/${slug}/`}
      className={`group relative flex flex-col rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/10 ${meta.border} hover:border-indigo-300 dark:hover:border-indigo-700`}
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
        Open tool
        <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </div>
    </Link>
  );
}

export function UtilityCardCompact({
  slug,
  name,
  icon,
  active = false,
  onClick,
}: {
  slug: string;
  name: string;
  icon: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={`/utilities/${slug}/`}
      onClick={onClick}
      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
        active
          ? "bg-indigo-600 text-white font-medium shadow-md shadow-indigo-500/25"
          : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white"
      }`}
    >
      <span className="text-base shrink-0 w-6 text-center">{icon}</span>
      <span className="truncate">{name}</span>
    </Link>
  );
}
