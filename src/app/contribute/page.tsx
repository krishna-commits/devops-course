import Link from "next/link";
import { getNavigation, getSearchItems } from "@/lib/content";
import { AppShell, Footer } from "@/components/AppShell";
import { ContentTrustStrip } from "@/components/ContentTrustStrip";
import { CONTACT_URL, REPO_URL } from "@/lib/site";

const REPO = REPO_URL;

export const metadata = {
  title: "Contribute | DevOps World",
  description: "PR a snippet, error fix, or runbook. Help keep DevOps docs fresh for engineers worldwide.",
};

export default function ContributePage() {
  const navigation = getNavigation();
  const searchItems = getSearchItems();

  return (
    <>
      <AppShell navigation={navigation} searchItems={searchItems} showSidebar={false}>
        <main className="flex-1 p-6 lg:p-8 min-w-0 max-w-3xl mx-auto w-full">
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-1">Contribute</h1>
          <p className="text-sm text-zinc-500 mb-6">
            This site stays useful when engineers worldwide add fixes — not when one person maintains 360 pages alone.
          </p>
          <ContentTrustStrip compact />

          <section className="mb-10">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-3">Add a command snippet</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
              Edit <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">src/lib/snippets.ts</code>{" "}
              and open a PR:
            </p>
            <pre className="rounded-xl bg-zinc-900 text-zinc-100 p-4 text-xs font-mono overflow-x-auto mb-3">{`{
  id: "my-snippet-id",           // unique, kebab-case
  task: "Short task description",
  tags: ["k8s", "debug"],         // aws | docker | k8s | terraform | ci | debug | finops | observe | gcp | azure
  cmd: \`kubectl get pods -A\`,
  destructive: false,             // true + destructiveNote for dangerous cmds
}`}</pre>
            <a
              href={`${REPO}/blob/main/src/lib/snippets.ts`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-indigo-600 hover:underline"
            >
              View snippets.ts on GitHub ↗
            </a>
          </section>

          <section className="mb-10">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-3">Submit an error → fix mapping</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
              Add entries to{" "}
              <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">src/lib/error-fix-index.ts</code>{" "}
              so ⌘K search and <Link href="/fix/" className="text-red-600 hover:underline">/fix/</Link> surface your fix:
            </p>
            <pre className="rounded-xl bg-zinc-900 text-zinc-100 p-4 text-xs font-mono overflow-x-auto mb-3">{`{
  match: ["ImagePullBackOff", "ErrImagePull"],
  title: "ImagePullBackOff",
  fix: "kubectl describe pod … check imagePullSecrets",
  href: "/runbooks/imagepull-backoff/",
  toolSlug: "kubernetes",
}`}</pre>
          </section>

          <section className="mb-10">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-3">Add or update a runbook</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
              Edit <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">src/lib/runbooks.ts</code>.
              Follow symptom → steps → commands → links. Test commands on a real cluster before PR.
            </p>
            <Link href="/runbooks/" className="text-sm text-orange-600 hover:underline">
              Browse existing runbooks →
            </Link>
          </section>

          <section className="mb-10 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20 p-5">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Report stale documentation</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
              Wrong version pin? Broken command? Open a GitHub issue with the page URL and what you expected.
            </p>
            <a
              href={`${REPO}/issues/new?labels=documentation&title=Stale%20doc%3A%20`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-amber-600 text-white hover:bg-amber-700"
            >
              Report stale doc ↗
            </a>
            <p className="text-sm text-zinc-500 mt-4">
              Prefer a direct message?{" "}
              <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                Contact ↗
              </a>
            </p>
          </section>

          <section className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-3">Questions?</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
              For consulting, partnerships, or guide ideas that are not a GitHub PR, use the{" "}
              <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                contact form ↗
              </a>
              .
            </p>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-3">PR checklist</h2>
            <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-2 list-disc list-inside">
              <li>Run <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1 rounded">npm run build</code> — static export must pass</li>
              <li>Mark destructive snippets with <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1 rounded">destructive: true</code></li>
              <li>Link to prod-delta or runbook when relevant</li>
              <li>Set tested versions if different from defaults (2026-06, K8s 1.29)</li>
            </ul>
          </section>
        </main>
      </AppShell>
      <Footer />
    </>
  );
}
