"use client";

import { useEffect } from "react";

interface SectionMeta {
  id: string;
  title: string;
  steps: { title: string }[];
}

interface DeepLinkMetaProps {
  pageTitle: string;
  sections: SectionMeta[];
}

function setMeta(property: string, content: string, attr: "property" | "name" = "property") {
  let el = document.querySelector(`meta[${attr}="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function titleFromHash(pageTitle: string, sections: SectionMeta[], hash: string): string | null {
  const base = pageTitle.replace(/\s*\|\s*DevOps World$/, "").split(" — ")[0];

  const stepMatch = hash.match(/^(.+)-step-(\d+)$/);
  if (stepMatch) {
    const [, sectionId, idxStr] = stepMatch;
    const section = sections.find((s) => s.id === sectionId);
    if (!section) return null;
    const step = section.steps[parseInt(idxStr, 10)];
    if (step) return `${base} — ${section.title} (step ${parseInt(idxStr, 10) + 1}: ${step.title})`;
    return `${base} — ${section.title}`;
  }

  const section = sections.find((s) => s.id === hash);
  if (section) return `${base} — ${section.title}`;

  return null;
}

export function DeepLinkMeta({ pageTitle, sections }: DeepLinkMetaProps) {
  useEffect(() => {
    function update() {
      const hash = window.location.hash.slice(1);
      const deepTitle = hash ? titleFromHash(pageTitle, sections, hash) : null;
      const title = deepTitle ?? pageTitle;
      document.title = deepTitle ? `${deepTitle} | DevOps World` : pageTitle;
      setMeta("og:title", title);
      setMeta("twitter:title", title, "name");
      if (deepTitle) {
        setMeta("og:description", `Jump to: ${deepTitle}`);
      }
    }
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, [pageTitle, sections]);

  return null;
}
