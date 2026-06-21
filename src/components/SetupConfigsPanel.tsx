"use client";

import { useState } from "react";
import type { DeploymentRecipe } from "@/lib/types";
import { GuideSection } from "./GuideSection";
import { YamlBlock } from "./YamlBlock";

const typeLabel: Record<DeploymentRecipe["type"], string> = {
  "docker-compose": "Docker Compose",
  kubernetes: "Kubernetes",
  dockerfile: "Dockerfile",
};

export function SetupConfigsPanel({ configs }: { configs: DeploymentRecipe[] }) {
  const [expanded, setExpanded] = useState<string | null>(configs[0]?.slug ?? null);

  if (configs.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 p-8 text-center">
        <p className="text-zinc-500 text-sm">No config templates for this tool yet.</p>
        <p className="text-xs text-zinc-400 mt-2">Use the setup steps on the left — configs may be added later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-zinc-500 mb-4">
        {configs.length} ready-to-copy template{configs.length !== 1 ? "s" : ""}. Expand one, copy the YAML, then run the deploy commands.
      </p>

      {configs.map((recipe) => {
        const isOpen = expanded === recipe.slug;
        return (
          <div
            key={recipe.slug}
            className="rounded-xl border border-violet-200 dark:border-violet-900/50 overflow-hidden bg-white dark:bg-zinc-900"
          >
            <button
              type="button"
              onClick={() => setExpanded(isOpen ? null : recipe.slug)}
              className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-violet-50/50 dark:hover:bg-violet-950/20 transition-colors"
            >
              <span className="text-2xl">{recipe.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-zinc-900 dark:text-white">{recipe.name}</p>
                <p className="text-xs text-zinc-500 truncate">{recipe.description}</p>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 shrink-0">
                {typeLabel[recipe.type]}
              </span>
              <span className="text-zinc-400 text-sm shrink-0">{isOpen ? "−" : "+"}</span>
            </button>

            {isOpen && (
              <div className="px-4 pb-4 border-t border-violet-100 dark:border-violet-900/40">
                {recipe.files.map((file) => (
                  <YamlBlock
                    key={file.filename}
                    filename={file.filename}
                    description={file.description}
                    content={file.content}
                  />
                ))}
                <GuideSection section={recipe.apply} index={0} pagePath={`/deployments/${recipe.slug}/`} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
