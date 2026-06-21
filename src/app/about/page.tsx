import Link from "next/link";
import { getNavigation, getSearchItems, tools } from "@/lib/content";
import { deployments } from "@/lib/deployments";
import { cheatsheets } from "@/lib/cheatsheets";
import { AppShell, Footer } from "@/components/AppShell";
import { GitHubIcon, LinkedInIcon, GlobeIcon, MailIcon } from "@/components/icons";
import { AUTHOR_URL, CONTACT_URL, GITHUB_ORG_URL } from "@/lib/site";

export const metadata = {
  title: "About DevOps World",
  description:
    "What DevOps World is, how guides are built, and links to standard repos and templates.",
};

export default function AboutPage() {
  const navigation = getNavigation();
  const searchItems = getSearchItems();

  return (
    <>
      <AppShell navigation={navigation} searchItems={searchItems}>
        <main className="flex-1 p-6 lg:p-8 min-w-0 max-w-3xl">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">About DevOps World</h1>
          <p className="text-zinc-500 mb-8">Pager-first DevOps reference — commands, runbooks, and ship-it flows.</p>

          <div className="prose prose-zinc dark:prose-invert max-w-none space-y-6 text-sm leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">What this site is</h2>
              <p className="text-zinc-600 dark:text-zinc-400">
                DevOps World is a static reference for installing and operating tools on Linux, macOS, and Windows.
                It includes {tools.length}+ tool guides, {deployments.length} config templates, {cheatsheets.length} printable
                cheat sheets, scenario runbooks, and browser utilities — all copy-paste friendly.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">How guides are maintained</h2>
              <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-400 space-y-2">
                <li>Commands are tested patterns from production and lab environments.</li>
                <li>Config templates tie to real GitHub repos where possible (see Related resources on CI/CD and cloud tool pages).</li>
                <li>Troubleshooting blocks follow symptom → cause → fix with runnable commands.</li>
                <li>Content is validated at build time; the site exports as static HTML for speed and offline use.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Author</h2>
              <p className="text-zinc-600 dark:text-zinc-400">
                <strong className="text-zinc-900 dark:text-white">Krishna Neupane</strong> — DevOps engineer sharing
                hands-on server, cloud, Kubernetes, and CI/CD guides.
              </p>
              <div className="flex flex-wrap gap-3 mt-4 not-prose">
                <a
                  href={GITHUB_ORG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-sm hover:border-indigo-400 transition-colors"
                >
                  <GitHubIcon className="w-4 h-4" /> GitHub repos
                </a>
                <a
                  href="https://www.linkedin.com/in/krishna-neupane-50082091/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-sm hover:border-indigo-400 transition-colors"
                >
                  <LinkedInIcon className="w-4 h-4" /> LinkedIn
                </a>
                <a
                  href={AUTHOR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-sm hover:border-indigo-400 transition-colors"
                >
                  <GlobeIcon className="w-4 h-4" /> krishnaneupane.com
                </a>
                <a
                  href={CONTACT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-sm hover:border-indigo-400 transition-colors"
                >
                  <MailIcon className="w-4 h-4" /> Contact
                </a>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Explore</h2>
              <div className="flex flex-wrap gap-2 not-prose">
                <Link href="/tools/" className="text-xs px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                  Tools
                </Link>
                <Link href="/deployments/" className="text-xs px-3 py-1.5 rounded-lg bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-400">
                  Configs
                </Link>
                <Link href="/cheatsheets/" className="text-xs px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                  Cheat sheets
                </Link>
                <Link href="/runbooks/" className="text-xs px-3 py-1.5 rounded-lg bg-orange-50 dark:bg-orange-950 text-orange-600 dark:text-orange-400">
                  Runbooks
                </Link>
                <Link href="/compare/" className="text-xs px-3 py-1.5 rounded-lg bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400">
                  Comparisons
                </Link>
              </div>
            </section>
          </div>
        </main>
      </AppShell>
      <Footer />
    </>
  );
}
