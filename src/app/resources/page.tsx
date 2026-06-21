import Link from "next/link";
import { getNavigation, getSearchItems } from "@/lib/content";
import { curriculumItems } from "@/lib/curriculum";
import { AppShell, Footer } from "@/components/AppShell";
import { ContentTrustStrip } from "@/components/ContentTrustStrip";
import { CurriculumBrowser, StackPillarsPanel, StandardReposPanel } from "@/components/CurriculumBrowser";
import { DevOpsProjectsPanel } from "@/components/DevOpsProjectsPanel";
import { devopsProjects } from "@/lib/devops-projects";

export const metadata = {
  title: "DevOps curriculum | DevOps World",
  description:
    "Curriculum, hands-on projects, and server foundations — Ansible, AWS, K8s, Terraform, monitoring, and Linux ops.",
};

export default function ResourcesPage() {
  const navigation = getNavigation();
  const searchItems = getSearchItems();

  return (
    <>
      <AppShell navigation={navigation} searchItems={searchItems} showSidebar={false}>
        <main className="flex-1 p-6 lg:p-8 min-w-0 max-w-4xl mx-auto w-full">
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-1">
            DevOps curriculum
          </h1>
          <p className="text-sm text-zinc-500 mb-2">
            {curriculumItems.length} topics — install guides, flows, deployments, snippets, and scripts on DevOps World.
          </p>
          <ContentTrustStrip compact />

          <section className="mb-12 mt-8">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-1">
              Hands-on projects
            </h2>
            <p className="text-sm text-zinc-500 mb-4">
              {devopsProjects.length} projects — beginner to advanced, each linked to a guide, script, or flow on DevOps World.
            </p>
            <DevOpsProjectsPanel />
          </section>

          <section className="mb-12">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-4">
              Full curriculum map
            </h2>
            <CurriculumBrowser />
          </section>

          <section className="mb-12">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-4">
              Stack pillars
            </h2>
            <StackPillarsPanel />
          </section>

          <section className="mb-10">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-4">
              Standard repos — clone and deploy
            </h2>
            <StandardReposPanel />
          </section>

          <div className="flex flex-wrap gap-4 text-sm pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <Link href="/standards/" className="text-violet-600 hover:underline">
              Standard layouts →
            </Link>
            <Link href="/contribute/" className="text-indigo-600 hover:underline">
              Contribute a guide →
            </Link>
            <Link href="/tools/" className="text-indigo-600 hover:underline">
              All tool guides →
            </Link>
          </div>
        </main>
      </AppShell>
      <Footer />
    </>
  );
}
