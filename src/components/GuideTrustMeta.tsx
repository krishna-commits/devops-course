import { getGuideTrust, getVersionWarningsForTool } from "@/lib/guide-trust";
import { VersionMismatchCallout } from "@/components/ContentTrustStrip";

export function GuideTrustMeta({ toolSlug }: { toolSlug: string }) {
  const trust = getGuideTrust(toolSlug);
  const versionWarnings = getVersionWarningsForTool(toolSlug);

  return (
    <>
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
      <VersionMismatchCallout warnings={versionWarnings} />
    </>
  );
}
