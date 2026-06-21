import type { ToolConfigFile } from "@/lib/tool-config-files";

interface ConfigFilesPanelProps {
  files: ToolConfigFile[];
  toolName: string;
}

export function ConfigFilesPanel({ files, toolName }: ConfigFilesPanelProps) {
  if (files.length === 0) return null;

  return (
    <section id="config-files" className="scroll-mt-24 rounded-xl bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-900 p-4 sm:p-5 mb-6 print:hidden">
      <div className="flex items-start gap-3 mb-4">
        <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-violet-100 dark:bg-violet-900 text-lg shrink-0">
          📁
        </span>
        <div>
          <h2 className="text-sm font-bold text-violet-900 dark:text-violet-100">
            Config files for {toolName}
          </h2>
          <p className="text-xs text-violet-700/80 dark:text-violet-300/80 mt-0.5">
            Where to create or edit the main configuration — paths below match the setup steps.
          </p>
        </div>
      </div>

      <ul className="space-y-3">
        {files.map((file) => (
          <li
            key={file.path}
            className="rounded-lg border border-violet-200/80 dark:border-violet-800/80 bg-white/80 dark:bg-zinc-900/60 p-3 sm:p-4"
          >
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <code className="text-sm font-mono font-semibold text-violet-800 dark:text-violet-200 bg-violet-100 dark:bg-violet-950 px-2 py-0.5 rounded">
                {file.path}
              </code>
            </div>
            <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">
              <span className="text-zinc-400 dark:text-zinc-500">Location: </span>
              {file.location}
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              {file.purpose}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
