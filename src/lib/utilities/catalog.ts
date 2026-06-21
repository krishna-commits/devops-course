export type UtilityCategory = "encode" | "format" | "generate" | "devops" | "crypto";

export interface UtilityDefinition {
  slug: string;
  name: string;
  description: string;
  icon: string;
  category: UtilityCategory;
  component: string;
  keywords?: string[];
}

export const utilityCategories: { id: UtilityCategory; name: string; icon: string }[] = [
  { id: "format", name: "Format & Parse", icon: "📋" },
  { id: "encode", name: "Encode & Decode", icon: "🔤" },
  { id: "crypto", name: "Hash & Security", icon: "🔐" },
  { id: "generate", name: "Generators", icon: "✨" },
  { id: "devops", name: "DevOps", icon: "⚙️" },
];

export const utilityCategoryMeta: Record<
  UtilityCategory,
  { color: string; bg: string; border: string }
> = {
  format: {
    color: "text-sky-700 dark:text-sky-300",
    bg: "bg-sky-50 dark:bg-sky-950",
    border: "hover:border-sky-300 dark:hover:border-sky-700",
  },
  encode: {
    color: "text-teal-700 dark:text-teal-300",
    bg: "bg-teal-50 dark:bg-teal-950",
    border: "hover:border-teal-300 dark:hover:border-teal-700",
  },
  crypto: {
    color: "text-rose-700 dark:text-rose-300",
    bg: "bg-rose-50 dark:bg-rose-950",
    border: "hover:border-rose-300 dark:hover:border-rose-700",
  },
  generate: {
    color: "text-violet-700 dark:text-violet-300",
    bg: "bg-violet-50 dark:bg-violet-950",
    border: "hover:border-violet-300 dark:hover:border-violet-700",
  },
  devops: {
    color: "text-emerald-700 dark:text-emerald-300",
    bg: "bg-emerald-50 dark:bg-emerald-950",
    border: "hover:border-emerald-300 dark:hover:border-emerald-700",
  },
};

export function getUtilityCategoryMeta(category: UtilityCategory) {
  return utilityCategoryMeta[category];
}

export function getUtilityCategoryName(category: UtilityCategory): string {
  return utilityCategories.find((c) => c.id === category)?.name ?? category;
}

/** Built-in browser utilities for DevOps and IT */
export const utilities: UtilityDefinition[] = [
  { slug: "json-formatter", name: "JSON Formatter", description: "Prettify, minify, and validate JSON", icon: "{ }", category: "format", component: "json-formatter", keywords: ["json", "prettify", "minify", "validate"] },
  { slug: "yaml-json", name: "YAML ↔ JSON", description: "Convert between YAML and JSON", icon: "📄", category: "format", component: "yaml-json", keywords: ["yaml", "json", "convert", "kubernetes"] },
  { slug: "jwt-decoder", name: "JWT Decoder", description: "Decode JWT header and payload (no verification)", icon: "🎫", category: "format", component: "jwt-decoder", keywords: ["jwt", "token", "oauth", "auth"] },
  { slug: "base64", name: "Base64 Encode/Decode", description: "Encode or decode Base64 text", icon: "🔡", category: "encode", component: "base64", keywords: ["base64", "encode", "decode"] },
  { slug: "url-codec", name: "URL Encode/Decode", description: "Encode or decode URL components", icon: "🔗", category: "encode", component: "url-codec", keywords: ["url", "encode", "uri", "percent"] },
  { slug: "hash-generator", name: "Hash Generator", description: "SHA-256 and SHA-512 hashes", icon: "#️⃣", category: "crypto", component: "hash-generator", keywords: ["hash", "sha256", "sha512", "checksum"] },
  { slug: "uuid-generator", name: "UUID Generator", description: "Generate random UUID v4 identifiers", icon: "🆔", category: "generate", component: "uuid-generator", keywords: ["uuid", "guid", "unique id"] },
  { slug: "password-generator", name: "Password Generator", description: "Secure random passwords", icon: "🔑", category: "generate", component: "password-generator", keywords: ["password", "random", "secure"] },
  { slug: "timestamp-converter", name: "Timestamp Converter", description: "Unix epoch ↔ human-readable date", icon: "🕐", category: "generate", component: "timestamp-converter", keywords: ["unix", "epoch", "timestamp", "date"] },
  { slug: "regex-tester", name: "Regex Tester", description: "Test regular expressions against text", icon: ".*", category: "format", component: "regex-tester", keywords: ["regex", "regexp", "pattern"] },
  { slug: "docker-run-converter", name: "Docker Run → Compose", description: "Convert docker run command to compose snippet", icon: "🐳", category: "devops", component: "docker-run-converter", keywords: ["docker", "compose", "run", "convert"] },
  { slug: "kubectl-explain", name: "Kubectl Cheat Sheet", description: "Common kubectl commands quick reference", icon: "☸️", category: "devops", component: "kubectl-cheatsheet", keywords: ["kubectl", "kubernetes", "k8s", "cheatsheet"] },
  { slug: "cron-reference", name: "Cron Expression Reference", description: "Cron field guide and examples", icon: "⏰", category: "devops", component: "cron-reference", keywords: ["cron", "crontab", "schedule"] },
  { slug: "string-case", name: "String Case Converter", description: "camelCase, snake_case, kebab-case, UPPER", icon: "Aa", category: "encode", component: "string-case", keywords: ["case", "camelcase", "snake_case"] },
];

export function getUtility(slug: string): UtilityDefinition | undefined {
  return utilities.find((u) => u.slug === slug);
}

export function getUtilitiesByCategory(category: UtilityCategory): UtilityDefinition[] {
  return utilities.filter((u) => u.category === category);
}

export function getUtilitySearchItems() {
  return utilities.map((u) => ({
    kind: "utility" as const,
    slug: u.slug,
    name: u.name,
    description: u.description,
    icon: u.icon,
    category: u.category,
    categoryName: utilityCategories.find((c) => c.id === u.category)?.name ?? u.category,
    keywords: u.keywords ?? [],
  }));
}
