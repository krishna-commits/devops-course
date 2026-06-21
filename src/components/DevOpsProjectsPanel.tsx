"use client";

import { useState } from "react";
import Link from "next/link";
import {
  devopsProjects,
  projectLevels,
  type ProjectLevel,
} from "@/lib/devops-projects";

const levelStyle: Record<ProjectLevel, string> = {
  beginner: "bg-emerald-50 text-emerald-700 border-emerald-200",
  intermediate: "bg-amber-50 text-amber-800 border-amber-200",
  advanced: "bg-violet-50 text-violet-700 border-violet-200",
};

export function DevOpsProjectsPanel() {
  const [level, setLevel] = useState<ProjectLevel | "all">("all");
  const list = level === "all" ? devopsProjects : devopsProjects.filter((p) => p.level === level);

  return (
    <div id="projects">
      <div className="flex flex-wrap gap-2 mb-5">
        {projectLevels.map((l) => (
          <button
            key={l.id}
            type="button"
            onClick={() => setLevel(l.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
              level === l.id
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-zinc-600 border-zinc-200 hover:border-indigo-200"
            }`}
          >
            {l.label}
            {l.id !== "all" && (
              <span className="ml-1 opacity-70">
                ({devopsProjects.filter((p) => p.level === l.id).length})
              </span>
            )}
          </button>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {list.map((p) => (
          <Link
            key={p.id}
            href={p.href}
            className="group p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <p className="font-semibold text-sm text-zinc-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                {p.title}
              </p>
              <span
                className={`shrink-0 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${levelStyle[p.level]}`}
              >
                {p.level}
              </span>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed mb-3">{p.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {p.skills.map((s) => (
                <span
                  key={s}
                  className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                >
                  {s}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
