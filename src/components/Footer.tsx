import Link from "next/link";
import { contentLibrary, formatContentCount } from "@/lib/site-content";
import { AUTHOR_URL, CONTACT_URL, GITHUB_ORG_URL, REPO_URL } from "@/lib/site";
import { TerminalIcon, GitHubIcon, LinkedInIcon, GlobeIcon, MailIcon } from "./icons";

const linkGroups = [
  {
    title: "On-call",
    icon: "🚨",
    dot: "bg-orange-400",
    links: [
      { href: "/oncall/", label: "On-call hub" },
      { href: "/fix/", label: "Error → fix" },
      { href: "/network/", label: "Network debug" },
      { href: "/observe/", label: "Observability triage" },
      { href: "/templates/", label: "Incident templates" },
    ],
  },
  {
    title: "Ship",
    icon: "🚀",
    dot: "bg-indigo-500",
    links: [
      { href: "/go-live/", label: "Go-live checklist" },
      { href: "/deploy/", label: "CI/CD hub" },
      { href: "/standards/", label: "Standard repos" },
      { href: "/contribute/", label: "Contribute" },
      { href: "/about/", label: "About" },
    ],
  },
  {
    title: "Operate",
    icon: "⚙️",
    dot: "bg-teal-500",
    links: [
      { href: "/backup/", label: "Backup & restore" },
      { href: "/rotate/", label: "Secrets rotation" },
      { href: "/certs/", label: "Certificates" },
      { href: "/scripts/", label: "Bash scripts" },
    ],
  },
  {
    title: "Learn",
    icon: "📚",
    dot: "bg-violet-500",
    links: [
      { href: "/resources/", label: "Curriculum map" },
      { href: "/compare/", label: "Tool comparisons" },
      { href: "/flows/", label: "All ship-it flows" },
    ],
  },
];

const socialLinks = [
  { href: GITHUB_ORG_URL, label: "GitHub", icon: GitHubIcon },
  { href: "https://www.linkedin.com/in/krishna-neupane-50082091/", label: "LinkedIn", icon: LinkedInIcon },
  { href: AUTHOR_URL, label: "Website", icon: GlobeIcon },
  { href: CONTACT_URL, label: "Contact", icon: MailIcon },
];

function FooterLink({ href, label, dot }: { href: string; label: string; dot: string }) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-2.5 text-[13px] text-zinc-600 hover:text-indigo-700 transition-colors py-0.5"
    >
      <span className={`w-1 h-1 rounded-full ${dot} opacity-40 group-hover:opacity-100 group-hover:scale-125 transition-all shrink-0`} />
      <span className="group-hover:translate-x-0.5 transition-transform">{label}</span>
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="relative mt-auto print:hidden border-t border-zinc-200/80">
      {/* Single stats strip — counts live here only, not repeated in nav columns */}
      <div className="bg-gradient-to-r from-zinc-50 via-indigo-50/40 to-violet-50/30 border-b border-zinc-200/80">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-3">What&apos;s inside</p>
          <div className="flex flex-wrap gap-2 sm:gap-2.5">
            {contentLibrary.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                className="group relative flex items-baseline gap-2 px-3.5 py-2.5 rounded-xl bg-white border border-zinc-200/90 shadow-sm hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-100/40 transition-all min-w-[5.5rem]"
              >
                <span
                  aria-hidden
                  className={`absolute top-0 left-3 right-3 h-0.5 rounded-full bg-gradient-to-r ${s.statColor} opacity-80`}
                />
                <span className="text-lg font-bold text-zinc-900 tabular-nums group-hover:text-indigo-700 transition-colors">
                  {formatContentCount(s)}
                </span>
                <span className="text-[11px] font-medium text-zinc-500 group-hover:text-indigo-600 transition-colors whitespace-nowrap">
                  {s.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-10 lg:py-12">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            {/* Brand + author — one block, no duplicate stats */}
            <div className="lg:col-span-4">
              <Link href="/" className="inline-flex items-center gap-3 group mb-4">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-200 group-hover:shadow-indigo-300 transition-all">
                  <TerminalIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-lg text-zinc-900">DevOps World</p>
                  <p className="text-xs text-zinc-500">Commands · runbooks · flows</p>
                </div>
              </Link>
              <p className="text-sm text-zinc-600 leading-relaxed mb-6 max-w-sm">
                Install guides, YAML templates, incident runbooks, and copy-paste snippets — Linux, Mac, and Windows.
              </p>

              <div className="flex items-center gap-3 p-4 rounded-2xl border border-zinc-200/80 bg-zinc-50/50">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-xs shrink-0">
                  KN
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-sm text-zinc-900 truncate">Krishna Neupane</p>
                  <p className="text-xs text-zinc-500">DevOps · Cloud · CI/CD</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  {socialLinks.map(({ href, label, icon: Icon }) => (
                    <a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      title={label}
                      className="flex items-center justify-center w-8 h-8 rounded-lg text-zinc-500 hover:text-indigo-600 hover:bg-white transition-all"
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                <a
                  href={CONTACT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 shadow-sm transition-colors"
                >
                  <MailIcon className="w-4 h-4" />
                  Contact
                </a>
                <a
                  href={REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-zinc-200 text-sm text-zinc-600 hover:border-indigo-200 hover:text-indigo-700 transition-colors"
                >
                  <GitHubIcon className="w-4 h-4" />
                  Star on GitHub
                </a>
              </div>
            </div>

            {/* Nav columns — hubs & workflows only (no duplicate of stats strip) */}
            <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
              {linkGroups.map((group) => (
                <div key={group.title}>
                  <div className="flex items-center gap-2 mb-4 pb-2.5 border-b border-zinc-100">
                    <span className="text-sm">{group.icon}</span>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-800">{group.title}</p>
                  </div>
                  <nav className="flex flex-col gap-2">
                    {group.links.map((link) => (
                      <FooterLink key={link.href} href={link.href} label={link.label} dot={group.dot} />
                    ))}
                  </nav>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-zinc-50 border-t border-zinc-200/80">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-xs text-zinc-500">
              © {new Date().getFullYear()}{" "}
              <a href={AUTHOR_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-zinc-700 hover:text-indigo-600 transition-colors">
                Krishna Neupane
              </a>
              {" · Since 1995 · MIT License"}
            </p>
            <a
              href={AUTHOR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-zinc-500 hover:text-indigo-600 transition-colors"
            >
              krishnaneupane.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
