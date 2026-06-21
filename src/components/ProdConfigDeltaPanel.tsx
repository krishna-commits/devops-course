import type { ConfigProdDelta } from "@/lib/config-prod-delta";

export function ProdConfigDeltaPanel({ delta }: { delta: ConfigProdDelta }) {
  return (
    <section id="prod-delta" className="scroll-mt-24 mb-10 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20 overflow-hidden">
      <div className="px-4 py-3 border-b border-amber-200 dark:border-amber-900/50">
        <h2 className="font-bold text-zinc-900 dark:text-white text-sm">{delta.title}</h2>
        <p className="text-xs text-zinc-500 mt-0.5">What to add before production merge</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left bg-amber-100/50 dark:bg-amber-950/40">
              <th className="px-4 py-2 font-semibold text-zinc-600 w-[18%]">Aspect</th>
              <th className="px-4 py-2 font-semibold text-zinc-600 w-[41%]">Minimal</th>
              <th className="px-4 py-2 font-semibold text-zinc-600 w-[41%]">Production</th>
            </tr>
          </thead>
          <tbody>
            {delta.rows.map((row) => (
              <tr key={row.aspect} className="border-t border-amber-100 dark:border-amber-900/30">
                <td className="px-4 py-2.5 font-medium text-zinc-800 dark:text-zinc-200 align-top">{row.aspect}</td>
                <td className="px-4 py-2.5 text-zinc-500 align-top text-xs">{row.minimal}</td>
                <td className="px-4 py-2.5 text-zinc-700 dark:text-zinc-300 align-top text-xs">{row.production}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
