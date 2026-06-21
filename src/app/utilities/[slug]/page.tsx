import { notFound } from "next/navigation";
import Link from "next/link";
import { getNavigation, getSearchItems } from "@/lib/content";
import {
  getUtility,
  getUtilityCategoryMeta,
  getUtilityCategoryName,
  utilities,
} from "@/lib/utilities/catalog";
import { AppShell, Footer } from "@/components/AppShell";
import { UtilityRunner } from "@/components/utilities/UtilityRunner";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return utilities.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const u = getUtility(slug);
  if (!u) return { title: "Not Found" };
  return { title: `${u.name} | IT Utilities`, description: u.description };
}

export default async function UtilityPage({ params }: PageProps) {
  const { slug } = await params;
  const utility = getUtility(slug);
  if (!utility) notFound();

  const meta = getUtilityCategoryMeta(utility.category);
  const categoryName = getUtilityCategoryName(utility.category);
  const navigation = getNavigation();
  const searchItems = getSearchItems();

  return (
    <>
      <AppShell navigation={navigation} searchItems={searchItems}>
        <main className="flex-1 min-w-0">
          <div className="px-4 py-6 sm:p-6 lg:p-8 max-w-3xl">
            <nav className="flex items-center gap-2 text-sm text-zinc-400 mb-6 print:hidden">
              <Link href="/utilities/" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                Utilities
              </Link>
              <span>/</span>
              <span className="text-zinc-700 dark:text-zinc-300">{utility.name}</span>
            </nav>

            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 p-4 sm:p-6 mb-6 shadow-sm">
              <div className="flex items-start gap-3 sm:gap-4">
                <span className="text-4xl sm:text-5xl w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800 shrink-0">
                  {utility.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${meta.bg} ${meta.color}`}>
                      {categoryName}
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white leading-tight">
                    {utility.name}
                  </h1>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
                    {utility.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 sm:p-6">
              <UtilityRunner componentId={utility.component} />
            </div>
          </div>
        </main>
      </AppShell>
      <Footer />
    </>
  );
}
