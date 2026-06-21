import { redirect } from "next/navigation";
import { tools } from "@/lib/content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export default async function SetupRedirectPage({ params }: PageProps) {
  const { slug } = await params;
  redirect(`/tools/${slug}/`);
}
