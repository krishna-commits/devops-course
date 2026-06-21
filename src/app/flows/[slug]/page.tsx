import { notFound } from "next/navigation";
import Link from "next/link";
import { getNavigation, getSearchItems } from "@/lib/content";
import { shipFlows, getShipFlow } from "@/lib/flows";
import { AppShell, Footer } from "@/components/AppShell";
import { FlowView } from "@/components/FlowView";
import { ContentTrustStrip, VersionMismatchCallout } from "@/components/ContentTrustStrip";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return shipFlows.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const flow = getShipFlow(slug);
  if (!flow) return { title: "Not Found" };
  return { title: flow.title, description: flow.description };
}

export default async function FlowPage({ params }: PageProps) {
  const { slug } = await params;
  const flow = getShipFlow(slug);
  if (!flow) notFound();

  const navigation = getNavigation();
  const searchItems = getSearchItems();

  return (
    <>
      <AppShell navigation={navigation} searchItems={searchItems}>
        <main className="flex-1 p-6 lg:p-8 min-w-0 max-w-3xl">
          <nav className="text-sm text-zinc-400 mb-4">
            <Link href="/flows/" className="hover:text-indigo-600">Ship-it flows</Link>
            <span> / </span>
            <span className="text-zinc-600 dark:text-zinc-300">{flow.title}</span>
          </nav>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-1">{flow.icon} {flow.title}</h1>
          <p className="text-sm text-zinc-500 mb-2">{flow.description} · {flow.duration}</p>
          <ContentTrustStrip compact />
          <VersionMismatchCallout topics={["kubernetes", "terraform"]} />
          <div className="mb-6" />
          <FlowView flow={flow} />
        </main>
      </AppShell>
      <Footer />
    </>
  );
}
