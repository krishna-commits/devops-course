import Link from "next/link";
import type { Runbook } from "@/lib/runbooks";

export function RunbookView({ runbook }: { runbook: Runbook }) {
  return (
    <div className="space-y-8">
      <section className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-2">
          Symptoms
        </p>
        <ul className="list-disc list-inside text-sm text-amber-900 dark:text-amber-100 space-y-1">
          {runbook.symptoms.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>

      {runbook.steps.map((step, i) => (
        <section key={step.title} id={`step-${i}`} className="scroll-mt-24">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-2 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-950 flex items-center justify-center text-sm font-mono">
              {i + 1}
            </span>
            {step.title}
          </h2>
          {step.body && (
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3 leading-relaxed">{step.body}</p>
          )}
          {step.commands && (
            <pre className="rounded-xl bg-zinc-900 dark:bg-zinc-950 text-zinc-100 p-4 text-xs sm:text-sm font-mono overflow-x-auto mb-3">
              <code>{step.commands}</code>
            </pre>
          )}
          {step.links && step.links.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {step.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-colors"
                >
                  {link.label} →
                </Link>
              ))}
            </div>
          )}
        </section>
      ))}

      <RelatedRunbookLinks runbook={runbook} />
    </div>
  );
}

function RelatedRunbookLinks({ runbook }: { runbook: Runbook }) {
  return (
    <section className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
      <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-3">Related</h3>
      <div className="flex flex-wrap gap-2">
        {runbook.relatedTools.map((slug) => (
          <Link
            key={slug}
            href={`/tools/${slug}/`}
            className="text-xs px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 transition-colors"
          >
            {slug}
          </Link>
        ))}
        {runbook.relatedConfigs.map((slug) => (
          <Link
            key={slug}
            href={`/deployments/${slug}/`}
            className="text-xs px-2.5 py-1 rounded-full bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-400 hover:underline"
          >
            {slug}
          </Link>
        ))}
      </div>
    </section>
  );
}
