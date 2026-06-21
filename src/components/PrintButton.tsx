"use client";

export function PrintButton({ label = "Print guide" }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors print:hidden"
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3.75h10.5M6.75 3.75A2.25 2.25 0 005.25 6v9.75A2.25 2.25 0 007.5 18h9a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6.75zM6.75 14.25h10.5M9 18v2.25h6V18" />
      </svg>
      {label}
    </button>
  );
}
