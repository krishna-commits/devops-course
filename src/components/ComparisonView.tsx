import Link from "next/link";
import type { Comparison } from "@/lib/comparisons";

export function ComparisonView({ comparison }: { comparison: Comparison }) {
  const colCount = comparison.tools.length;

  return (
    <div className="space-y-8">
      <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-zinc-50 dark:bg-zinc-900 text-left">
              <th className="px-4 py-3 font-semibold text-zinc-600 dark:text-zinc-400 w-[22%]">Aspect</th>
              {comparison.tools.map((t) => (
                <th key={t.slug} className="px-4 py-3 font-semibold text-zinc-900 dark:text-white">
                  <Link href={`/tools/${t.slug}/`} className="hover:text-indigo-600 dark:hover:text-indigo-400">
                    {t.icon} {t.name}
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparison.rows.map((row) => (
              <tr key={row.aspect} className="border-t border-zinc-100 dark:border-zinc-800">
                <td className="px-4 py-3 font-medium text-zinc-700 dark:text-zinc-300 align-top">{row.aspect}</td>
                {row.values.slice(0, colCount).map((val, i) => (
                  <td key={i} className="px-4 py-3 text-zinc-600 dark:text-zinc-400 align-top">
                    {val}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section>
        <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">When to use which</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {comparison.whenToUse.map((pick) => (
            <div
              key={pick.tool}
              className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 bg-white dark:bg-zinc-900"
            >
              <p className="font-semibold text-zinc-900 dark:text-white mb-1">{pick.tool}</p>
              <p className="text-sm text-zinc-500">{pick.reason}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-3">Templates & guides</h3>
        <div className="flex flex-wrap gap-2">
          {comparison.relatedTools.map((slug) => (
            <Link
              key={slug}
              href={`/tools/${slug}/`}
              className="text-xs px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 transition-colors"
            >
              {slug}
            </Link>
          ))}
          {comparison.relatedConfigs.map((slug) => (
            <Link
              key={slug}
              href={`/deployments/${slug}/`}
              className="text-xs px-2.5 py-1 rounded-full bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-400"
            >
              {slug}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
