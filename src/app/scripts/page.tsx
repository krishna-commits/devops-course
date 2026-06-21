import Link from "next/link";
import { getNavigation, getSearchItems } from "@/lib/content";
import { bashScripts } from "@/lib/bash-scripts";
import { AppShell, Footer } from "@/components/AppShell";
import { ContentTrustStrip } from "@/components/ContentTrustStrip";
import { CopyScriptBlock } from "@/components/CopyScriptBlock";

export const metadata = {
  title: "Bash scripts | DevOps World",
  description: "Pre-deploy checks, smoke tests, cluster health reports, staging vs prod diffs — copy or download.",
};

export default function ScriptsPage() {
  const navigation = getNavigation();
  const searchItems = getSearchItems();
  const deployScripts = bashScripts.filter((s) => s.tags.includes("deploy") || s.tags.includes("debug") || s.tags.includes("oncall"));
  const linuxScripts = bashScripts.filter((s) => s.tags.includes("linux") || s.tags.includes("monitor") || s.tags.includes("security") || s.tags.includes("backup"));
  const diffScripts = bashScripts.filter((s) => s.tags.includes("diff"));

  return (
    <>
      <AppShell navigation={navigation} searchItems={searchItems} showSidebar={false}>
        <main className="flex-1 p-6 lg:p-8 min-w-0 max-w-3xl mx-auto w-full">
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-1">
            Bash scripts
          </h1>
          <p className="text-sm text-zinc-500 mb-2">
            Full scripts — not one-liners. Copy, download, run in CI or locally.
          </p>
          <ContentTrustStrip compact />

          <section className="mb-10">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-4">
              Deploy & health
            </h2>
            <div className="space-y-6">
              {deployScripts.map((s) => (
                <div key={s.id} id={s.id} className="scroll-mt-24">
                  <p className="text-sm text-zinc-500 mb-2">{s.description}</p>
                  <CopyScriptBlock title={s.title} filename={s.filename} script={s.script} />
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10 pt-8 border-t border-zinc-200 dark:border-zinc-800">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-2">
              Linux & server ops
            </h2>
            <p className="text-sm text-zinc-500 mb-4">
              Performance stats, log archive, Nginx analysis, integrity checks — skills every DevOps engineer uses daily.
            </p>
            <div className="space-y-6">
              {linuxScripts.map((s) => (
                <div key={s.id} id={s.id} className="scroll-mt-24">
                  <p className="text-sm text-zinc-500 mb-2">{s.description}</p>
                  <CopyScriptBlock title={s.title} filename={s.filename} script={s.script} />
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10 pt-8 border-t border-zinc-200 dark:border-zinc-800">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-2">
              Staging ↔ prod diff
            </h2>
            <p className="text-sm text-zinc-500 mb-4">
              Compare kube contexts or Terraform workspaces before drift becomes an incident.
            </p>
            <div className="flex flex-wrap gap-2 mb-6 text-sm">
              <Link href="/snippets/#kube-context-diff" className="text-teal-600 hover:underline">
                Quick image diff snippet →
              </Link>
              <Link href="/snippets/#tf-workspace-list" className="text-teal-600 hover:underline">
                Terraform workspace snippet →
              </Link>
            </div>
            <div className="space-y-6">
              {diffScripts.map((s) => (
                <div key={s.id} id={s.id} className="scroll-mt-24">
                  <p className="text-sm text-zinc-500 mb-2">{s.description}</p>
                  <CopyScriptBlock title={s.title} filename={s.filename} script={s.script} />
                </div>
              ))}
            </div>
          </section>

          <div className="flex flex-wrap gap-4 text-sm pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <Link href="/go-live/" className="text-emerald-600 hover:underline">
              Go-live checklist →
            </Link>
            <Link href="/flows/" className="text-indigo-600 hover:underline">
              Ship-it flows →
            </Link>
            <Link href="/resources/#projects" className="text-sky-600 hover:underline">
              Hands-on projects →
            </Link>
          </div>
        </main>
      </AppShell>
      <Footer />
    </>
  );
}
