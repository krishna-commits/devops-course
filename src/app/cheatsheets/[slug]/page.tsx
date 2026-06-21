import { notFound } from "next/navigation";
import Link from "next/link";
import { getNavigation, getSearchItems } from "@/lib/content";
import { cheatsheets, getCheatsheet } from "@/lib/cheatsheets";
import { AppShell, Footer } from "@/components/AppShell";
import { CheatsheetView, CheatsheetToolbar } from "@/components/CheatsheetView";
import { BookmarkButton } from "@/components/BookmarkButton";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return cheatsheets.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const sheet = getCheatsheet(slug);
  if (!sheet) return { title: "Not Found" };
  return { title: sheet.title, description: sheet.description };
}

export default async function CheatsheetPage({ params }: PageProps) {
  const { slug } = await params;
  const sheet = getCheatsheet(slug);
  if (!sheet) notFound();

  const navigation = getNavigation();
  const searchItems = getSearchItems();

  return (
    <>
      <AppShell navigation={navigation} searchItems={searchItems}>
        <main className="flex-1 p-6 lg:p-8 min-w-0 max-w-4xl cheatsheet-page">
          <nav className="flex items-center gap-2 text-sm text-zinc-400 mb-6 print:hidden">
            <Link href="/cheatsheets/" className="hover:text-indigo-600 dark:hover:text-indigo-400">
              Cheat sheets
            </Link>
            <span>/</span>
            <span className="text-zinc-700 dark:text-zinc-300">{sheet.title}</span>
          </nav>

          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 p-5 sm:p-6 mb-8 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <span className="text-4xl">{sheet.icon}</span>
                <div>
                  <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">{sheet.title}</h1>
                  <p className="text-sm text-zinc-500 mt-1">{sheet.description}</p>
                  {sheet.relatedTools.length > 0 && (
                    <p className="text-xs text-zinc-400 mt-3 print:hidden">
                      Related:{" "}
                      {sheet.relatedTools.slice(0, 4).map((t, i) => (
                        <span key={t}>
                          {i > 0 && " · "}
                          <Link href={`/tools/${t}/`} className="text-indigo-600 dark:text-indigo-400 hover:underline">
                            {t}
                          </Link>
                        </span>
                      ))}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 print:hidden shrink-0">
                <BookmarkButton
                  kind="cheatsheet"
                  slug={sheet.slug}
                  name={sheet.title}
                  icon={sheet.icon}
                  href={`/cheatsheets/${sheet.slug}/`}
                />
                <CheatsheetToolbar />
              </div>
            </div>
          </div>

          <CheatsheetView sheet={sheet} />
        </main>
      </AppShell>
      <Footer />
    </>
  );
}
