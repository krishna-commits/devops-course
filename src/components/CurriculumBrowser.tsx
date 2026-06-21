"use client";

import { useState } from "react";
import Link from "next/link";
import { curriculumCategories, getCurriculumByCategory, stackPillars, type CurriculumItem } from "@/lib/curriculum";
import { standardLayouts } from "@/lib/standards";

function LinkCell({ item }: { item: CurriculumItem }) {
  return (
    <Link href={item.href} className="text-indigo-600 dark:text-indigo-400 hover:underline">
      {item.title}
    </Link>
  );
}

export function CurriculumBrowser() {
  const [category, setCategory] = useState("All");
  const items = getCurriculumByCategory(category);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        {curriculumCategories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
              category === c
                ? "bg-indigo-600 text-white border-indigo-600"
                : "border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-indigo-300"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-zinc-50 dark:bg-zinc-950 text-left">
              <th className="px-4 py-2.5 font-semibold text-zinc-500 w-8">#</th>
              <th className="px-4 py-2.5 font-semibold text-zinc-500 w-28">Topic</th>
              <th className="px-4 py-2.5 font-semibold text-zinc-500">Guide</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={item.id} className="border-t border-zinc-100 dark:border-zinc-800">
                <td className="px-4 py-2.5 text-zinc-400 tabular-nums">{idx + 1}</td>
                <td className="px-4 py-2.5 text-zinc-600 dark:text-zinc-400">{item.category}</td>
                <td className="px-4 py-2.5">
                  <LinkCell item={item} />
                  {item.note && <p className="text-[10px] text-zinc-400 mt-0.5">{item.note}</p>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function StackPillarsPanel() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {stackPillars.map((p) => (
        <section key={p.id} className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
          <h3 className="font-bold text-zinc-900 dark:text-white mb-2">
            {p.icon} {p.title}
          </h3>
          <ul className="space-y-1.5">
            {p.tools.map((t) => (
              <li key={t.name}>
                <Link href={t.href} className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
                  {t.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

export function StandardReposPanel() {
  return (
    <div className="space-y-3">
      {standardLayouts.map((s) => (
        <div
          key={s.id}
          className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4"
        >
          <p className="font-semibold text-zinc-900 dark:text-white">
            {s.icon} {s.title}
          </p>
          <p className="text-sm text-zinc-500 mt-1">{s.description}</p>
          <div className="flex flex-wrap gap-3 mt-2 text-sm">
            <a
              href={s.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline"
            >
              {s.repoName} ↗
            </a>
            {s.flowHref && (
              <Link href={s.flowHref} className="text-violet-600 hover:underline">
                Ship-it flow →
              </Link>
            )}
          </div>
        </div>
      ))}
      <Link href="/standards/" className="inline-block text-sm text-indigo-600 hover:underline mt-2">
        All standard layouts →
      </Link>
    </div>
  );
}
