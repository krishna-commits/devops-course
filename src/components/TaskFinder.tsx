"use client";

import Link from "next/link";
import { TASK_GROUPS } from "@/lib/search-index";

export function TaskFinder() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
          What do you want to do?
        </h2>
        <p className="text-zinc-500 mt-2 max-w-lg mx-auto">
          Pick a task below — no tech jargon needed. Each link opens step-by-step guides you can copy and run.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {TASK_GROUPS.map((task) => (
          <div
            key={task.id}
            className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
          >
            <div className="flex items-start gap-3 mb-3">
              <span className="text-2xl">{task.icon}</span>
              <div>
                <h3 className="font-bold text-zinc-900 dark:text-white">{task.title}</h3>
                <p className="text-xs text-zinc-500 mt-0.5">{task.desc}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {task.slugs.map((slug) => (
                <Link
                  key={slug}
                  href={`/tools/${slug}`}
                  className="text-xs px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-indigo-50 dark:hover:bg-indigo-950 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors capitalize"
                >
                  {slug.replace(/-/g, " ")}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
