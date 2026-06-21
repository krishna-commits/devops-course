import Link from "next/link";
import { getNavigation, getSearchItems } from "@/lib/content";
import { AppShell, Footer } from "@/components/AppShell";
import { ErrorFixSearch } from "@/components/ErrorFixSearch";
import { shipFlows } from "@/lib/flows";
import { runbooks } from "@/lib/runbooks";

const quickLinks = [
  { href: "/oncall/", label: "On-call", desc: "Pager bookmark", icon: "🚨", color: "hover:border-orange-400" },
  { href: "/network/", label: "Network", desc: "DNS → pod trace", icon: "🌐", color: "hover:border-teal-400" },
  { href: "/scripts/", label: "Scripts", desc: "Pre/post deploy", icon: "📜", color: "hover:border-indigo-400" },
  { href: "/rotate/", label: "Rotate", desc: "Secrets zero-downtime", icon: "🔑", color: "hover:border-violet-400" },
  { href: "/certs/", label: "Certs", desc: "HTTP-01 vs DNS-01", icon: "🔒", color: "hover:border-sky-400" },
  { href: "/backup/", label: "Backup", desc: "DB, K8s, RDS restore", icon: "💾", color: "hover:border-lime-400" },
  { href: "/observe/", label: "Observe", desc: "Alert → logs", icon: "📊", color: "hover:border-rose-400" },
  { href: "/go-live/", label: "Go-live", desc: "Pre-prod checklist", icon: "✅", color: "hover:border-emerald-400" },
  { href: "/flows/", label: "Ship to K8s", desc: "End-to-end deploy flows", icon: "🚀", color: "hover:border-indigo-400" },
  { href: "/fix/", label: "Fix prod issue", desc: "Error → commands", icon: "🔧", color: "hover:border-red-400" },
  { href: "/resources/", label: "Curriculum", desc: "45+ topics mapped", icon: "🎓", color: "hover:border-sky-400" },
  { href: "/standards/", label: "Standards", desc: "Clone, don't invent", icon: "📐", color: "hover:border-violet-400" },
  { href: "/snippets/", label: "Snippets", desc: "50+ copy-paste cmds", icon: "📋", color: "hover:border-teal-400" },
  { href: "/deploy/", label: "CI/CD YAML", desc: "Pipeline templates", icon: "🔄", color: "hover:border-violet-400" },
  { href: "/runbooks/", label: "Runbooks", desc: `${runbooks.length} incident flows`, icon: "📖", color: "hover:border-orange-400" },
  { href: "/templates/", label: "Templates", desc: "Incident + change MD", icon: "📝", color: "hover:border-indigo-400" },
];

export function EngineerHomePage() {
  const navigation = getNavigation();
  const searchItems = getSearchItems();

  return (
    <>
      <AppShell navigation={navigation} searchItems={searchItems}>
        <main className="flex-1 p-6 lg:p-8 min-w-0 max-w-4xl mx-auto w-full">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-1">
              What broke?
            </h1>
            <p className="text-zinc-500 text-sm mb-5">Paste an error or symptom — get commands, not a lecture.</p>
            <ErrorFixSearch large autoFocus={false} />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 transition-all ${link.color} hover:shadow-md`}
              >
                <span className="text-2xl">{link.icon}</span>
                <p className="font-semibold text-sm text-zinc-900 dark:text-white mt-2">{link.label}</p>
                <p className="text-xs text-zinc-500">{link.desc}</p>
              </Link>
            ))}
          </div>

          <section className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">Ship it — end to end</h2>
              <Link href="/flows/" className="text-xs text-indigo-600 hover:underline">All flows →</Link>
            </div>
            <div className="space-y-2">
              {shipFlows.map((f) => (
                <Link
                  key={f.slug}
                  href={`/flows/${f.slug}/`}
                  className="flex items-center gap-3 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-indigo-300 dark:hover:border-indigo-700 bg-white dark:bg-zinc-900 transition-colors"
                >
                  <span className="text-xl">{f.icon}</span>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm text-zinc-900 dark:text-white truncate">{f.title}</p>
                    <p className="text-xs text-zinc-500 truncate">{f.description}</p>
                  </div>
                  <span className="text-[10px] text-zinc-400 shrink-0">{f.duration}</span>
                </Link>
              ))}
            </div>
          </section>

          <section className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <Link href="/tools/" className="text-sm text-zinc-500 hover:text-indigo-600 transition-colors">
              Browse all tool install guides →
            </Link>
          </section>
        </main>
      </AppShell>
      <Footer />
    </>
  );
}
