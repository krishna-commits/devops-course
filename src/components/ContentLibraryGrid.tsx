import Link from "next/link";
import { contentLibrary, formatContentCount } from "@/lib/site-content";

type Variant = "cards" | "stats";

export function ContentLibraryGrid({ variant = "cards" }: { variant?: Variant }) {
  if (variant === "stats") {
    return (
      <div className="flex flex-wrap gap-2 sm:gap-2.5">
        {contentLibrary.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="group relative flex items-baseline gap-2 px-3.5 py-2.5 rounded-xl bg-white border border-zinc-200/90 shadow-sm hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-100/40 transition-all min-w-[5.5rem]"
          >
            <span
              aria-hidden
              className={`absolute top-0 left-3 right-3 h-0.5 rounded-full bg-gradient-to-r ${item.statColor} opacity-80`}
            />
            <span className="text-lg font-bold text-zinc-900 tabular-nums group-hover:text-indigo-700 transition-colors">
              {formatContentCount(item)}
            </span>
            <span className="text-[11px] font-medium text-zinc-500 group-hover:text-indigo-600 transition-colors whitespace-nowrap">
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {contentLibrary.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className={`group p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm transition-all ${item.borderHover} hover:shadow-md`}
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <span className="text-2xl">{item.icon}</span>
            <span className={`text-sm font-bold tabular-nums ${item.accent}`}>{formatContentCount(item)}</span>
          </div>
          <p className="font-semibold text-sm text-zinc-900 dark:text-white">{item.label}</p>
          <p className="text-xs text-zinc-500 mt-0.5 line-clamp-2">{item.description}</p>
        </Link>
      ))}
    </div>
  );
}
