import {
  getContentTrust,
  getVersionWarningsForTopics,
  type VersionTopic,
  type VersionWarning,
} from "@/lib/guide-trust";

export function ContentTrustStrip({ compact = false }: { compact?: boolean }) {
  const trust = getContentTrust();

  if (compact) {
    return (
      <p className="text-xs text-zinc-500 mb-4 print:hidden">
        <span className="text-zinc-400">Reviewed:</span>{" "}
        <time dateTime={trust.lastReviewed}>{trust.lastReviewed}</time>
        <span className="mx-2 text-zinc-300 dark:text-zinc-700">·</span>
        <span className="text-zinc-400">Tested on:</span> {trust.testedOn.join(", ")}
      </p>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-500 mb-4 print:hidden">
      <span>
        <span className="text-zinc-400">Reviewed:</span>{" "}
        <time dateTime={trust.lastReviewed}>{trust.lastReviewed}</time>
      </span>
      <span className="hidden sm:inline text-zinc-300 dark:text-zinc-700">|</span>
      <span>
        <span className="text-zinc-400">Tested on:</span> {trust.testedOn.join(" · ")}
      </span>
    </div>
  );
}

export function VersionMismatchCallout({
  topics,
  warnings,
}: {
  topics?: VersionTopic[];
  warnings?: VersionWarning[];
}) {
  const items = warnings ?? (topics ? getVersionWarningsForTopics(topics) : []);
  if (items.length === 0) return null;

  return (
    <div className="space-y-3 mb-4 print:hidden">
      {items.map((w) => (
        <div
          key={`${w.topic}-${w.belowVersion}`}
          className="rounded-xl border border-sky-200 dark:border-sky-900/50 bg-sky-50/80 dark:bg-sky-950/30 px-4 py-3"
        >
          <p className="text-xs font-semibold text-sky-800 dark:text-sky-300 mb-1.5">{w.title}</p>
          <ul className="text-xs text-sky-900 dark:text-sky-100 space-y-1 list-disc list-inside">
            {w.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
