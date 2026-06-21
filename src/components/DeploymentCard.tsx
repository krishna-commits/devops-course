import Link from "next/link";
import type { DeploymentRecipe } from "@/lib/types";

const typeStyles: Record<
  DeploymentRecipe["type"],
  { label: string; badge: string; border: string; hover: string; accent: string }
> = {
  "docker-compose": {
    label: "Docker Compose",
    badge: "bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300",
    border: "border-l-teal-500",
    hover: "hover:border-teal-300 dark:hover:border-teal-700 hover:shadow-teal-500/10",
    accent: "group-hover:text-teal-600 dark:group-hover:text-teal-400",
  },
  kubernetes: {
    label: "Kubernetes",
    badge: "bg-violet-50 dark:bg-violet-950 text-violet-700 dark:text-violet-300",
    border: "border-l-violet-500",
    hover: "hover:border-violet-300 dark:hover:border-violet-700 hover:shadow-violet-500/10",
    accent: "group-hover:text-violet-600 dark:group-hover:text-violet-400",
  },
  dockerfile: {
    label: "Dockerfile",
    badge: "bg-fuchsia-50 dark:bg-fuchsia-950 text-fuchsia-700 dark:text-fuchsia-300",
    border: "border-l-fuchsia-500",
    hover: "hover:border-fuchsia-300 dark:hover:border-fuchsia-700 hover:shadow-fuchsia-500/10",
    accent: "group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400",
  },
};

export function DeploymentCard({ recipe }: { recipe: DeploymentRecipe }) {
  const style = typeStyles[recipe.type];

  return (
    <Link
      href={`/deployments/${recipe.slug}`}
      className={`group flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 border-l-4 ${style.border} bg-white dark:bg-zinc-900 p-5 ${style.hover} hover:shadow-lg transition-all`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <span className="text-3xl">{recipe.icon}</span>
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${style.badge}`}>
          {style.label}
        </span>
      </div>
      <h3 className={`font-bold text-zinc-900 dark:text-white ${style.accent} transition-colors mb-1`}>
        {recipe.name}
      </h3>
      <p className="text-sm text-zinc-500 line-clamp-2 flex-1">{recipe.description}</p>
      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
        <span className="text-xs font-mono text-zinc-400">
          {recipe.files.length} file{recipe.files.length > 1 ? "s" : ""}
        </span>
        <span className="text-xs text-zinc-300">·</span>
        <span className={`text-xs text-violet-500 opacity-0 group-hover:opacity-100 transition-opacity`}>
          View YAML →
        </span>
      </div>
    </Link>
  );
}
