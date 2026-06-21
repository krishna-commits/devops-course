import Link from "next/link";
import { getNavigation, getSearchItems } from "@/lib/content";
import { leadTemplates } from "@/lib/lead-templates";
import { AppShell, Footer } from "@/components/AppShell";
import { CopyTemplateBlock } from "@/components/CopyTemplateBlock";

export const metadata = {
  title: "Incident + change templates | DevOps World",
  description: "Copy-paste Markdown for post-incident reports and change requests. Links back to runbooks.",
};

export default function TemplatesPage() {
  const navigation = getNavigation();
  const searchItems = getSearchItems();

  return (
    <>
      <AppShell navigation={navigation} searchItems={searchItems} showSidebar={false}>
        <main className="flex-1 p-6 lg:p-8 min-w-0 max-w-3xl mx-auto w-full">
          <nav className="text-sm text-zinc-400 mb-4">
            <Link href="/oncall/" className="hover:text-orange-600">
              On-call
            </Link>
            <span className="mx-2">/</span>
            <span className="text-zinc-600 dark:text-zinc-300">Templates</span>
          </nav>

          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-1">
            Post-incident + change templates
          </h1>
          <p className="text-sm text-zinc-500 mb-8">
            Copy into Confluence, Notion, or a ticket. Repeatability after outages — leads care about this.
          </p>

          <div className="space-y-6">
            {leadTemplates.map((t) => (
              <div key={t.id}>
                <p className="text-sm text-zinc-500 mb-3">{t.description}</p>
                <CopyTemplateBlock title={t.title} markdown={t.markdown} />
              </div>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap gap-4 text-sm">
            <Link href="/runbooks/" className="text-orange-600 hover:underline">
              Link a runbook in your report →
            </Link>
            <Link href="/go-live/" className="text-emerald-600 hover:underline">
              Go-live checklist for change pre-checks →
            </Link>
          </div>
        </main>
      </AppShell>
      <Footer />
    </>
  );
}
