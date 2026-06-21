import Link from "next/link";
import type { ShipFlow } from "@/lib/flows";

export function FlowView({ flow }: { flow: ShipFlow }) {
  return (
    <div className="space-y-6">
      {flow.checkpoints.map((cp, i) => (
        <section key={cp.title} id={`step-${i}`} className="scroll-mt-24 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
          <div className="px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-800">
            <h2 className="font-bold text-zinc-900 dark:text-white">{cp.title}</h2>
            {cp.body && <p className="text-sm text-zinc-500 mt-1">{cp.body}</p>}
          </div>
          {cp.commands && (
            <pre className="px-4 py-3 text-xs font-mono text-zinc-800 dark:text-zinc-200 overflow-x-auto whitespace-pre-wrap border-b border-zinc-100 dark:border-zinc-800">{cp.commands}</pre>
          )}
          <div className="px-4 py-3 flex flex-wrap gap-2">
            {cp.configHref && (
              <Link href={cp.configHref} className="text-xs px-2.5 py-1 rounded-lg bg-violet-50 dark:bg-violet-950 text-violet-600">
                Config →
              </Link>
            )}
            {cp.toolHref && (
              <Link href={cp.toolHref} className="text-xs px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600">
                Guide →
              </Link>
            )}
            {cp.repoHref && (
              <a href={cp.repoHref} target="_blank" rel="noopener noreferrer" className="text-xs px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600">
                GitHub repo ↗
              </a>
            )}
          </div>
        </section>
      ))}
      {flow.relatedRunbook && (
        <p className="text-sm text-zinc-500">
          Related runbook:{" "}
          <Link href={`/runbooks/${flow.relatedRunbook}/`} className="text-orange-600 hover:underline">
            Open runbook →
          </Link>
        </p>
      )}
    </div>
  );
}
