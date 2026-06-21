import { notFound } from "next/navigation";
import Link from "next/link";
import { getTool, tools, getNavigation, getSearchItems } from "@/lib/content";
import { getCategory, getCategoryMeta } from "@/lib/categories";
import { getWhatIsThis, getTroubleshoot } from "@/lib/tool-extras";
import { getToolConfigFiles } from "@/lib/tool-config-files";
import { getRelatedGithubRepos } from "@/lib/related-repos";
import { getDeploymentsForTool } from "@/lib/setup";
import { AppShell, Footer } from "@/components/AppShell";
import { GuideSection } from "@/components/GuideSection";
import { ConfigFilesPanel } from "@/components/ConfigFilesPanel";
import { RelatedResourcesPanel } from "@/components/RelatedResourcesPanel";
import { QuickReferenceLink } from "@/components/QuickReferenceLink";
import { BookmarkButton } from "@/components/BookmarkButton";
import { DeepLinkMeta } from "@/components/DeepLinkMeta";
import { TableOfContents } from "@/components/TableOfContents";
import { PrintButton } from "@/components/PrintButton";
import { SetupConfigsPanel } from "@/components/SetupConfigsPanel";
import { GoldenPathBanner } from "@/components/GoldenPathBanner";
import { GuideTrustMeta } from "@/components/GuideTrustMeta";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return { title: "Not Found" };
  return {
    title: `${tool.name} — Install & Manage | DevOps World`,
    description: tool.description,
    openGraph: {
      title: `${tool.name} — Install & Manage`,
      description: tool.description,
      type: "article",
    },
  };
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();

  const troubleshoot = getTroubleshoot(slug);
  const sections = [
    tool.install,
    tool.configure,
    tool.verify,
    tool.manage,
    troubleshoot,
    tool.uninstall,
  ].filter(Boolean);
  const category = getCategory(tool.category);
  const meta = getCategoryMeta(tool.category);
  const navigation = getNavigation();
  const searchItems = getSearchItems();
  const whatIsThis = getWhatIsThis(slug);
  const configFiles = getToolConfigFiles(slug);
  const configs = getDeploymentsForTool(slug);
  const githubRepos = getRelatedGithubRepos(slug);

  const tocSections = [
    ...(configFiles.length > 0 ? [{ id: "config-files", title: "Config files", steps: [] as { title: string }[] }] : []),
    ...(configs.length > 0 || githubRepos.length > 0
      ? [{ id: "related-resources", title: "Related resources", steps: [] as { title: string }[] }]
      : []),
    ...sections.map((s) => ({
      id: s!.id,
      title: s!.title,
      steps: s!.steps.map((step) => ({ title: step.title })),
    })),
    ...(configs.length > 0 ? [{ id: "configs", title: "Config templates", steps: [] as { title: string }[] }] : []),
  ];
  const deepLinkSections = sections.map((s) => ({
    id: s!.id,
    title: s!.title,
    steps: s!.steps.map((step) => ({ title: step.title })),
  }));
  const pageTitle = `${tool.name} — Install & Manage | DevOps World`;

  return (
    <>
      <DeepLinkMeta pageTitle={pageTitle} sections={deepLinkSections} />
      <AppShell navigation={navigation} searchItems={searchItems}>
        <main className="flex-1 min-w-0">
          <div className="flex">
            <div id="guide-content" className="flex-1 px-4 py-6 sm:p-6 lg:p-8 max-w-3xl">
              <nav className="flex items-center gap-2 text-sm text-zinc-400 mb-6 print:hidden">
                <Link href="/tools/" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Tools
                </Link>
                <span>/</span>
                <span className="text-zinc-700 dark:text-zinc-300">{tool.name}</span>
              </nav>

              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 p-4 sm:p-6 mb-6 shadow-sm">
                <div className="flex items-start gap-3 sm:gap-4">
                  <span className="text-4xl sm:text-5xl w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800 shrink-0">
                    {tool.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${meta.bg} ${meta.color}`}>
                        {category?.name}
                      </span>
                    </div>
                    <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white mb-2 leading-snug">
                      {tool.name}
                    </h1>
                    <p className="text-zinc-500 text-sm leading-relaxed">{tool.description}</p>
                    <div className="flex flex-wrap items-center gap-2 mt-4">
                      {["🐧 Linux", "🍎 Mac", "🪟 Windows"].map((os) => (
                        <span key={os} className="text-xs px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                          {os}
                        </span>
                      ))}
                      <QuickReferenceLink toolSlug={slug} />
                      <BookmarkButton
                        kind="tool"
                        slug={slug}
                        name={tool.name}
                        icon={tool.icon}
                        href={`/tools/${slug}/`}
                      />
                      <PrintButton />
                    </div>
                  </div>
                </div>
              </div>

              <GuideTrustMeta toolSlug={slug} />
              <GoldenPathBanner toolSlug={slug} />

              {whatIsThis && (
                <div className="rounded-xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-900 p-4 mb-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-1">
                    What is this?
                  </p>
                  <p className="text-sm text-sky-900 dark:text-sky-100 leading-relaxed">{whatIsThis}</p>
                </div>
              )}

              <ConfigFilesPanel files={configFiles} toolName={tool.name} />

              <RelatedResourcesPanel toolName={tool.name} configs={configs} repos={githubRepos} />

              {sections.map((section, i) => (
                <GuideSection key={section!.id} section={section!} index={i} toolSlug={slug} />
              ))}

              {configs.length > 0 && (
                <section id="configs" className="scroll-mt-24 mt-12 pt-8 border-t border-violet-200 dark:border-violet-900 print:hidden">
                  <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-2 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-950 flex items-center justify-center text-sm">📋</span>
                    Config templates
                  </h2>
                  <p className="text-sm text-zinc-500 mb-6">
                    {configs.length} YAML template{configs.length !== 1 ? "s" : ""} for {tool.name}. Copy and deploy after setup.
                  </p>
                  <SetupConfigsPanel configs={configs} />
                </section>
              )}

              <ToolNav currentSlug={slug} />
            </div>

            <aside className="hidden xl:block w-56 shrink-0 p-6 pt-8 print:hidden">
              <TableOfContents sections={tocSections} />
            </aside>
          </div>
        </main>
      </AppShell>
      <Footer />
    </>
  );
}

function ToolNav({ currentSlug }: { currentSlug: string }) {
  const idx = tools.findIndex((t) => t.slug === currentSlug);
  const prev = idx > 0 ? tools[idx - 1] : null;
  const next = idx < tools.length - 1 ? tools[idx + 1] : null;

  if (!prev && !next) return null;

  return (
    <nav className="flex flex-col sm:flex-row items-stretch gap-4 mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800 print:hidden">
      {prev ? (
        <Link
          href={`/tools/${prev.slug}`}
          className="flex-1 group p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
        >
          <p className="text-xs text-zinc-400 mb-1">← Previous</p>
          <p className="font-semibold text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
            {prev.icon} {prev.name}
          </p>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
      {next ? (
        <Link
          href={`/tools/${next.slug}`}
          className="flex-1 group p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors sm:text-right"
        >
          <p className="text-xs text-zinc-400 mb-1">Next →</p>
          <p className="font-semibold text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
            {next.icon} {next.name}
          </p>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  );
}
