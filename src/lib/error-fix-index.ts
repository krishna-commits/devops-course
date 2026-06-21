import { getTroubleshoot } from "./tool-extras";
import { runbooks } from "./runbooks";
import type { ToolGuide } from "./types";

/** Lazy load to avoid circular import: content.ts → error-fix-index.ts → content.ts */
function getTools(): ToolGuide[] {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { tools } = require("./content") as { tools: ToolGuide[] };
  return tools ?? [];
}

export interface ErrorFix {
  id: string;
  error: string;
  aliases: string[];
  commands: string;
  href: string;
  source: "tool" | "runbook";
  sourceName: string;
  icon: string;
}

/** Extra strings engineers paste into search — mapped to fix ids */
const ERROR_ALIASES: Record<string, string[]> = {
  "502-bad-gateway": ["502", "bad gateway", "502 bad gateway", "upstream timed out"],
  "imagepullbackoff": ["imagepullbackoff", "image pull back off", "ErrImagePull", "failed to pull image"],
  "crashloopbackoff": ["crashloopbackoff", "crash loop back off", "back-off restarting failed container"],
  "state-lock": ["error acquiring the state lock", "state lock", "lock table", "terraform lock"],
  "connection-refused-upstream": ["connection refused upstream", "connect() failed", "no live upstreams"],
  "vault-sealed": ["vault is sealed", "sealed vault", "vault sealed"],
  "unable-locate-credentials": ["unable to locate credentials", "no credentials", "aws credentials"],
  "permission-denied-publickey": ["permission denied (publickey)", "publickey denied"],
  "helm-pending": ["pending-upgrade", "pending-install", "helm release failed"],
  "pipeline-auth": ["permission denied", "denied push", "unauthorized registry", "401 unauthorized docker"],
  "oomkilled": ["oomkilled", "oom killed", "exit code 137", "out of memory"],
  "argocd-sync": ["argocd sync failed", "outofsync", "application sync failed"],
};

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function buildFromTools(): ErrorFix[] {
  const fixes: ErrorFix[] = [];
  for (const tool of getTools()) {
    const section = getTroubleshoot(tool.slug);
    if (!section) continue;
    section.steps.forEach((step, i) => {
      const id = `${tool.slug}-${slugify(step.title)}`;
      const cmds = step.commands.linux ?? step.commands.mac ?? step.commands.windows ?? "";
      fixes.push({
        id,
        error: step.title,
        aliases: ERROR_ALIASES[id] ?? [],
        commands: cmds,
        href: `/tools/${tool.slug}/#troubleshoot-step-${i}`,
        source: "tool",
        sourceName: tool.name,
        icon: tool.icon,
      });
    });
  }
  return fixes;
}

function buildFromRunbooks(): ErrorFix[] {
  return runbooks.flatMap((rb) => ({
    id: `runbook-${rb.slug}`,
    error: rb.title,
    aliases: [...rb.symptoms, ...(ERROR_ALIASES[`runbook-${rb.slug}`] ?? [])],
    commands: rb.steps.find((s) => s.commands)?.commands ?? "",
    href: `/runbooks/${rb.slug}/`,
    source: "runbook" as const,
    sourceName: "Runbook",
    icon: rb.icon,
  }));
}

/** Curated high-priority fixes with rich aliases (merged into index) */
const CURATED: Partial<ErrorFix>[] = [
  {
    id: "k8s-imagepullbackoff",
    error: "ImagePullBackOff",
    aliases: ["imagepullbackoff", "ErrImagePull", "failed to pull and unpack image", "pull access denied"],
    commands: `kubectl describe pod <pod> -n <ns>
kubectl get events -n <ns> --sort-by='.lastTimestamp'
# Fix: correct image name, imagePullSecrets, or registry auth`,
    href: "/tools/kubernetes/#troubleshoot-step-0",
    source: "tool",
    sourceName: "Kubernetes",
    icon: "☸️",
  },
  {
    id: "k8s-crashloopbackoff",
    error: "CrashLoopBackOff",
    aliases: ["crashloopbackoff", "back-off restarting failed container"],
    commands: `kubectl logs <pod> -n <ns> --previous
kubectl describe pod <pod> -n <ns>
kubectl get events -n <ns> --field-selector involvedObject.name=<pod>`,
    href: "/tools/kubernetes/#troubleshoot-step-1",
    source: "tool",
    sourceName: "Kubernetes",
    icon: "☸️",
  },
];

let _cache: ErrorFix[] | null = null;

export function getAllErrorFixes(): ErrorFix[] {
  if (_cache) return _cache;
  const byId = new Map<string, ErrorFix>();
  for (const f of [...buildFromTools(), ...buildFromRunbooks()]) {
    byId.set(f.id, f);
  }
  for (const partial of CURATED) {
    if (!partial.id) continue;
    const existing = byId.get(partial.id);
    if (existing) {
      byId.set(partial.id, {
        ...existing,
        aliases: [...new Set([...existing.aliases, ...(partial.aliases ?? [])])],
      });
    } else if (partial.error && partial.href) {
      byId.set(partial.id, partial as ErrorFix);
    }
  }
  _cache = Array.from(byId.values());
  return _cache;
}

export function getErrorFixSearchItems() {
  return getAllErrorFixes().map((f) => ({
    slug: f.id,
    name: f.error,
    description: f.commands.split("\n").slice(0, 3).join(" · "),
    icon: f.icon,
    keywords: [f.error, ...f.aliases, "error", "fix", "symptom", f.sourceName],
    href: f.href,
  }));
}

export function searchErrorFixes(query: string, limit = 12): ErrorFix[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return getAllErrorFixes()
    .map((f) => {
      let score = 0;
      if (f.error.toLowerCase().includes(q)) score += 100;
      if (f.aliases.some((a) => a.toLowerCase().includes(q))) score += 80;
      if (f.commands.toLowerCase().includes(q)) score += 20;
      if (f.sourceName.toLowerCase().includes(q)) score += 10;
      return { f, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ f }) => f);
}
