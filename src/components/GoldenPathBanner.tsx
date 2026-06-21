import Link from "next/link";
import { getGoldenPathForTool, goldenPathGroups } from "@/lib/golden-paths";

export function GoldenPathBanner({ toolSlug }: { toolSlug: string }) {
  const match = getGoldenPathForTool(toolSlug);
  if (!match) return null;

  if (match.role === "recommended") {
    return (
      <div className="rounded-xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/80 dark:bg-emerald-950/30 px-4 py-3 mb-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
          ✓ Team golden path — {match.group.title}
        </p>
        <p className="text-sm text-emerald-900 dark:text-emerald-100">{match.entry.reason ?? "Recommended standard for this category."}</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 px-4 py-3 mb-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
        Alternative — team standard for {match.group.title}
      </p>
      <div className="flex flex-wrap gap-2">
        {match.group.recommended.map((r) => (
          <Link
            key={r.slug}
            href={`/tools/${r.slug}/`}
            className="text-sm px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 hover:underline"
          >
            Recommended: {r.name} →
          </Link>
        ))}
      </div>
    </div>
  );
}

export function GoldenPathOverview() {
  return (
    <div className="space-y-4">
      {goldenPathGroups.map((g) => (
        <section key={g.id} className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
          <h3 className="font-semibold text-zinc-900 dark:text-white">{g.title}</h3>
          <p className="text-sm text-zinc-500 mt-1">{g.description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {g.recommended.map((r) => (
              <Link
                key={r.slug}
                href={`/tools/${r.slug}/`}
                className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300"
              >
                ✓ {r.name}
              </Link>
            ))}
            {g.alternatives.map((a) => (
              <Link
                key={a.slug}
                href={`/tools/${a.slug}/`}
                className="text-xs px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600"
              >
                {a.name}
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
