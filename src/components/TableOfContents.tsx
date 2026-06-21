"use client";

import { useEffect, useState } from "react";

interface TocSection {
  id: string;
  title: string;
  steps: { title: string }[];
}

export function TableOfContents({ sections }: { sections: TocSection[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(section.id);
        },
        { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sections]);

  return (
    <nav className="sticky top-24">
      <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3">
        On this page
      </p>
      <ul className="space-y-1 border-l-2 border-zinc-200 dark:border-zinc-800">
        {sections.map((section, i) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              onClick={() => setActive(section.id)}
              className={`block pl-4 py-1.5 text-sm border-l-2 -ml-[2px] transition-colors ${
                active === section.id
                  ? "border-indigo-500 text-indigo-600 dark:text-indigo-400 font-medium"
                  : "border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              {String(i + 1).padStart(2, "0")}. {section.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
