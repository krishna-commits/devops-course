import { tools } from "./content";
import { runbooks } from "./runbooks";
import { deployments } from "./deployments";
import { snippets } from "./snippets";
import { shipFlows } from "./flows";
import { cheatsheets } from "./cheatsheets";
import { utilities } from "./utilities/catalog";
import { comparisons } from "./comparisons";
import { curriculumItems } from "./curriculum";
import { bashScripts } from "./bash-scripts";

export interface ContentLibraryItem {
  label: string;
  href: string;
  count: number;
  suffix?: string;
  icon: string;
  description: string;
  statColor: string;
  accent: string;
  borderHover: string;
}

/** Single source for footer stats and content library grids */
export const contentLibrary: ContentLibraryItem[] = [
  {
    label: "Tools",
    href: "/tools/",
    count: tools.length,
    suffix: "+",
    icon: "🛠️",
    description: "Install, configure, and troubleshoot guides for Linux, Mac, and Windows.",
    statColor: "from-indigo-500 to-violet-600",
    accent: "text-indigo-600",
    borderHover: "hover:border-indigo-200",
  },
  {
    label: "Runbooks",
    href: "/runbooks/",
    count: runbooks.length,
    icon: "📖",
    description: "Incident flows — 502, CrashLoop, state lock, OOM, GitOps sync, and more.",
    statColor: "from-orange-400 to-amber-500",
    accent: "text-orange-600",
    borderHover: "hover:border-orange-200",
  },
  {
    label: "Configs",
    href: "/deployments/",
    count: deployments.length,
    icon: "📄",
    description: "Docker Compose, Kubernetes YAML, CI pipelines, and Terraform templates.",
    statColor: "from-violet-500 to-fuchsia-500",
    accent: "text-violet-600",
    borderHover: "hover:border-violet-200",
  },
  {
    label: "Snippets",
    href: "/snippets/",
    count: snippets.length,
    suffix: "+",
    icon: "📋",
    description: "Copy-paste commands — AWS, K8s, Terraform, CI, debug, FinOps, observe.",
    statColor: "from-teal-500 to-emerald-500",
    accent: "text-teal-600",
    borderHover: "hover:border-teal-200",
  },
  {
    label: "Flows",
    href: "/flows/",
    count: shipFlows.length,
    icon: "🚀",
    description: "End-to-end ship paths — GHA, GitLab, Jenkins, Argo CD, Vault secrets.",
    statColor: "from-indigo-400 to-blue-500",
    accent: "text-indigo-600",
    borderHover: "hover:border-indigo-200",
  },
  {
    label: "Cheat sheets",
    href: "/cheatsheets/",
    count: cheatsheets.length,
    icon: "📄",
    description: "Printable one-pagers — kubectl, docker, terraform, prometheus, jenkins.",
    statColor: "from-emerald-500 to-green-500",
    accent: "text-emerald-600",
    borderHover: "hover:border-emerald-200",
  },
  {
    label: "Utilities",
    href: "/utilities/",
    count: utilities.length,
    icon: "⚙️",
    description: "Browser tools — JSON, YAML, JWT, cron, docker-run converter.",
    statColor: "from-sky-500 to-cyan-500",
    accent: "text-sky-600",
    borderHover: "hover:border-sky-200",
  },
  {
    label: "Comparisons",
    href: "/compare/",
    count: comparisons.length,
    icon: "⚖️",
    description: "Pick the right tool — CI platforms, IaC, GitOps, ingress, managed K8s.",
    statColor: "from-rose-400 to-pink-500",
    accent: "text-rose-600",
    borderHover: "hover:border-rose-200",
  },
  {
    label: "Topics",
    href: "/resources/",
    count: curriculumItems.length,
    suffix: "+",
    icon: "🎓",
    description: "Curriculum map — Ansible, AWS, Jenkins, K8s, Terraform, GitOps, FinOps.",
    statColor: "from-amber-400 to-orange-500",
    accent: "text-amber-600",
    borderHover: "hover:border-amber-200",
  },
  {
    label: "Scripts",
    href: "/scripts/",
    count: bashScripts.length,
    icon: "📜",
    description: "Downloadable bash — pre/post deploy, cluster report, cert audit, triage.",
    statColor: "from-zinc-500 to-zinc-600",
    accent: "text-zinc-600",
    borderHover: "hover:border-zinc-300",
  },
];

export function formatContentCount(item: ContentLibraryItem): string {
  return `${item.count}${item.suffix ?? ""}`;
}
