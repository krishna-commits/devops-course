"use client";

import { useEffect, useState } from "react";
import type { OS } from "@/lib/types";
import { getPreferredOS, setPreferredOS } from "@/lib/os-preference";
import { CheckIcon, CopyIcon } from "./icons";

const osConfig: Record<OS, { label: string; icon: string; accent: string }> = {
  linux: {
    label: "Linux",
    icon: "🐧",
    accent: "data-[active=true]:bg-orange-500 data-[active=true]:text-white data-[active=true]:shadow-orange-500/30",
  },
  mac: {
    label: "macOS",
    icon: "🍎",
    accent: "data-[active=true]:bg-zinc-700 data-[active=true]:text-white data-[active=true]:shadow-zinc-500/30",
  },
  windows: {
    label: "Windows",
    icon: "🪟",
    accent: "data-[active=true]:bg-blue-500 data-[active=true]:text-white data-[active=true]:shadow-blue-500/30",
  },
};

interface OSTabsProps {
  commands: Partial<Record<OS, string>>;
  defaultOS?: OS;
}

export function OSTabs({ commands, defaultOS = "linux" }: OSTabsProps) {
  const availableOS = (Object.keys(osConfig) as OS[]).filter((os) => commands[os]);
  const [active, setActive] = useState<OS>(() => {
    const saved = getPreferredOS();
    if (saved && availableOS.includes(saved)) return saved;
    return availableOS.includes(defaultOS) ? defaultOS : availableOS[0];
  });

  useEffect(() => {
    const saved = getPreferredOS();
    if (saved && availableOS.includes(saved)) setActive(saved);
  }, [availableOS]);

  function selectOS(os: OS) {
    setActive(os);
    setPreferredOS(os);
  }

  if (availableOS.length === 0) return null;

  return (
    <div className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-700 shadow-sm code-block">
      <div className="flex gap-1 p-1.5 bg-zinc-100 dark:bg-zinc-800/80 overflow-x-auto">
        {availableOS.map((os) => (
          <button
            key={os}
            type="button"
            data-active={active === os}
            onClick={() => selectOS(os)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all shadow-sm shrink-0 data-[active=false]:text-zinc-500 data-[active=false]:hover:text-zinc-700 dark:data-[active=false]:text-zinc-400 data-[active=false]:bg-transparent data-[active=false]:shadow-none ${osConfig[os].accent}`}
          >
            <span>{osConfig[os].icon}</span>
            {osConfig[os].label}
          </button>
        ))}
      </div>
      {active && commands[active] && <CodeBlock code={commands[active]!} os={active} />}
    </div>
  );
}

function CodeBlock({ code, os }: { code: string; os: OS }) {
  const [copied, setCopied] = useState(false);
  const lines = code.split("\n");

  async function copy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="relative group bg-[#0d1117]">
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 border-b border-zinc-800 bg-zinc-900/50 gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="hidden sm:flex gap-1 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </span>
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider truncate">
            {osConfig[os].label}
          </span>
        </div>
        <button
          type="button"
          onClick={copy}
          className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all shrink-0 print:hidden ${
            copied ? "bg-emerald-500/20 text-emerald-400" : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
          }`}
        >
          {copied ? <><CheckIcon className="w-3.5 h-3.5" /> Copied</> : <><CopyIcon className="w-3.5 h-3.5" /> Copy</>}
        </button>
      </div>
      <pre className="p-3 sm:p-4 overflow-x-auto text-[11px] sm:text-[13px] leading-relaxed font-mono">
        <code>
          {lines.map((line, i) => (
            <div key={i} className="flex hover:bg-white/[0.03] -mx-3 sm:-mx-4 px-3 sm:px-4">
              <span className="select-none text-zinc-600 w-6 sm:w-8 shrink-0 text-right pr-2 sm:pr-4">{i + 1}</span>
              <span className="text-emerald-400/90 break-all sm:break-normal">{line || " "}</span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}

export function OSBadges() {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {(Object.keys(osConfig) as OS[]).map((os) => (
        <span key={os} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/10 border border-white/15 text-white/80">
          {osConfig[os].icon} {osConfig[os].label}
        </span>
      ))}
    </div>
  );
}
