import { notFound } from "next/navigation";
import Link from "next/link";
import { deployments, getDeployment } from "@/lib/deployments";
import { getNavigation, getSearchItems } from "@/lib/content";
import { AppShell, Footer } from "@/components/AppShell";
import { YamlBlock } from "@/components/YamlBlock";
import { GuideSection } from "@/components/GuideSection";
import { BookmarkButton } from "@/components/BookmarkButton";
import { DeepLinkMeta } from "@/components/DeepLinkMeta";
import { ProdConfigDeltaPanel } from "@/components/ProdConfigDeltaPanel";
import { getConfigProdDelta } from "@/lib/config-prod-delta";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return deployments.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const recipe = getDeployment(slug);
  if (!recipe) return { title: "Not Found" };
  return {
    title: `${recipe.name} — Deployment Config`,
    description: recipe.description,
    openGraph: {
      title: `${recipe.name} — Deployment Config`,
      description: recipe.description,
    },
  };
}

const typeLabels = {
  "docker-compose": "Docker Compose",
  kubernetes: "Kubernetes",
  dockerfile: "Dockerfile",
};

export default async function DeploymentPage({ params }: PageProps) {
  const { slug } = await params;
  const recipe = getDeployment(slug);
  if (!recipe) notFound();

  const navigation = getNavigation();
  const searchItems = getSearchItems();
  const pageTitle = `${recipe.name} — Deployment Config | DevOps World`;
  const sectionMeta = [
    {
      id: recipe.apply.id,
      title: recipe.apply.title,
      steps: recipe.apply.steps.map((s) => ({ title: s.title })),
    },
  ];
  const prodDelta = getConfigProdDelta(slug);

  return (
    <>
      <DeepLinkMeta pageTitle={pageTitle} sections={sectionMeta} />
      <AppShell navigation={navigation} searchItems={searchItems}>
        <main className="flex-1 px-4 py-6 sm:p-6 lg:p-8 min-w-0 max-w-4xl">
          <nav className="flex items-center gap-2 text-sm text-zinc-400 mb-6">
            <Link href="/deployments/" className="hover:text-violet-600 dark:hover:text-violet-400">
              Configs
            </Link>
            <span>/</span>
            <span className="text-zinc-700 dark:text-zinc-300">{recipe.name}</span>
          </nav>

          <div className="rounded-2xl border border-violet-200 dark:border-violet-900/50 bg-gradient-to-br from-violet-50 to-white dark:from-violet-950/30 dark:to-zinc-900 p-6 mb-8">
            <div className="flex items-start gap-4">
              <span className="text-4xl">{recipe.icon}</span>
              <div>
                <span className="inline-flex text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full mb-2 bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300">
                  {typeLabels[recipe.type]}
                </span>
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
                  {recipe.name}
                </h1>
                <p className="text-zinc-500">{recipe.description}</p>
                <div className="flex flex-wrap items-center gap-2 mt-4">
                  <BookmarkButton
                    kind="deployment"
                    slug={slug}
                    name={recipe.name}
                    icon={recipe.icon}
                    href={`/deployments/${slug}/`}
                  />
                  {recipe.relatedTools.map((tool) => (
                    <Link
                      key={tool}
                      href={`/tools/${tool}`}
                      className="text-xs px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-violet-50 dark:hover:bg-violet-950 hover:text-violet-600 transition-colors"
                    >
                      {tool}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <section className="mb-10">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-950 flex items-center justify-center text-sm">📋</span>
              Configuration Files
            </h2>
            {recipe.files.map((file) => (
              <YamlBlock
                key={file.filename}
                filename={file.filename}
                description={file.description}
                content={file.content}
              />
            ))}
          </section>

          {prodDelta && <ProdConfigDeltaPanel delta={prodDelta} />}

          <GuideSection section={recipe.apply} index={0} pagePath={`/deployments/${slug}/`} />
        </main>
      </AppShell>
      <Footer />
    </>
  );
}
