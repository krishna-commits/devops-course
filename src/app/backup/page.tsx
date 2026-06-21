import Link from "next/link";
import { getNavigation, getSearchItems } from "@/lib/content";
import { backupPlaybooks } from "@/lib/backup-restore";
import { snippets } from "@/lib/snippets";
import { AppShell, Footer } from "@/components/AppShell";
import { ContentTrustStrip } from "@/components/ContentTrustStrip";
import { SnippetLibrary } from "@/components/SnippetLibrary";
import { BackupDrillChecklist } from "@/components/BackupDrillChecklist";

export const metadata = {
  title: "Backup & restore | DevOps World",
  description: "What to back up, copy-paste commands, restore drills — DB, K8s, Terraform state, RDS, files.",
};

export default function BackupPage() {
  const navigation = getNavigation();
  const searchItems = getSearchItems();
  const backupCount = snippets.filter((s) => s.tags.includes("backup")).length;

  return (
    <>
      <AppShell navigation={navigation} searchItems={searchItems} showSidebar={false}>
        <main className="flex-1 p-6 lg:p-8 min-w-0 max-w-4xl mx-auto w-full">
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-1">
            Backup & restore
          </h1>
          <p className="text-sm text-zinc-500 mb-2">
            {backupCount} commands — backup, restore, verify. Backups you never restore are wishful thinking.
          </p>
          <ContentTrustStrip compact />

          <div className="my-8">
            <BackupDrillChecklist />
          </div>

          <section className="space-y-4 mb-10">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">By system</h2>
            {backupPlaybooks.map((p) => (
              <article
                key={p.id}
                className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden"
              >
                <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 flex items-start gap-3">
                  <span className="text-2xl">{p.icon}</span>
                  <div>
                    <h3 className="font-bold text-zinc-900 dark:text-white">{p.title}</h3>
                    <p className="text-xs text-zinc-500 mt-0.5">{p.what}</p>
                    <p className="text-xs text-lime-700 dark:text-lime-400 mt-1">{p.scheduleHint}</p>
                  </div>
                </div>
                <div className="px-4 py-3 flex flex-wrap gap-2">
                  <Link
                    href={`/snippets/#${p.backupSnippetId}`}
                    className="text-xs px-2.5 py-1 rounded-lg bg-lime-50 dark:bg-lime-950 text-lime-700 dark:text-lime-300 hover:underline"
                  >
                    Backup →
                  </Link>
                  <Link
                    href={`/snippets/#${p.restoreSnippetId}`}
                    className="text-xs px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 hover:underline"
                  >
                    Restore →
                  </Link>
                  {p.verifySnippetId && (
                    <Link
                      href={`/snippets/#${p.verifySnippetId}`}
                      className="text-xs px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 hover:underline"
                    >
                      Verify →
                    </Link>
                  )}
                  {p.toolHref && (
                    <Link href={p.toolHref} className="text-xs text-indigo-600 hover:underline">
                      Install guide
                    </Link>
                  )}
                  {p.configHref && (
                    <Link href={p.configHref} className="text-xs text-violet-600 hover:underline">
                      Config / prod delta
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </section>

          <section className="mb-10">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-4">
              All backup snippets
            </h2>
            <SnippetLibrary fixedTag="backup" hideTagFilters />
          </section>

          <section className="rounded-xl border border-orange-200 dark:border-orange-900/50 bg-orange-50/30 dark:bg-orange-950/20 p-4 mb-8">
            <h2 className="font-semibold text-sm text-zinc-900 dark:text-white mb-2">When restore fails</h2>
            <div className="flex flex-wrap gap-3 text-sm">
              <Link href="/runbooks/database-restore-drill/" className="text-orange-600 hover:underline">
                Restore drill runbook →
              </Link>
              <Link href="/runbooks/velero-restore-failed/" className="text-orange-600 hover:underline">
                Velero restore failed →
              </Link>
            </div>
          </section>

          <div className="flex flex-wrap gap-4 text-sm pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <Link href="/go-live/" className="text-emerald-600 hover:underline">
              Go-live checklist (backups item) →
            </Link>
            <Link href="/tools/velero/" className="text-indigo-600 hover:underline">
              Velero install guide →
            </Link>
          </div>
        </main>
      </AppShell>
      <Footer />
    </>
  );
}
