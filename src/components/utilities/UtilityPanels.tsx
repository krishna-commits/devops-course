"use client";

import type { ComponentType } from "react";
import { useCallback, useState } from "react";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);
  return (
    <button type="button" onClick={copy} className="text-xs px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 hover:bg-indigo-100 dark:hover:bg-indigo-950 text-zinc-600 dark:text-zinc-300">
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function TextArea({ label, value, onChange, rows = 8, placeholder }: { label: string; value: string; onChange: (v: string) => void; rows?: number; placeholder?: string }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">{label}</label>
        {value && <CopyButton text={value} />}
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        spellCheck={false}
        className="w-full font-mono text-sm rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 p-3 outline-none focus:ring-2 focus:ring-indigo-500/30 resize-y"
      />
    </div>
  );
}

export function JsonFormatter() {
  const [input, setInput] = useState('{"name":"devops","tools":["docker","k8s"]}');
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function prettify() {
    try {
      setOutput(JSON.stringify(JSON.parse(input), null, 2));
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
      setOutput("");
    }
  }

  function minify() {
    try {
      setOutput(JSON.stringify(JSON.parse(input)));
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button type="button" onClick={prettify} className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-sm font-medium">Prettify</button>
        <button type="button" onClick={minify} className="px-3 py-1.5 rounded-lg bg-zinc-200 dark:bg-zinc-700 text-sm font-medium">Minify</button>
      </div>
      <TextArea label="Input" value={input} onChange={setInput} />
      {error && <p className="text-sm text-red-500">{error}</p>}
      {output && <TextArea label="Output" value={output} onChange={setOutput} />}
    </div>
  );
}

export function YamlJsonConverter() {
  const [input, setInput] = useState("name: devops\nversion: 1\nservices:\n  - docker\n  - kubernetes");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"yaml-to-json" | "json-to-yaml">("yaml-to-json");
  const [error, setError] = useState("");

  function convert() {
    setError("");
    try {
      if (mode === "yaml-to-json") {
        const lines = input.split("\n");
        const obj: Record<string, unknown> = {};
        let currentKey = "";
        const arr: string[] = [];
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith("#")) continue;
          if (trimmed.startsWith("- ")) {
            arr.push(trimmed.slice(2).trim());
          } else {
            const [k, ...rest] = trimmed.split(":");
            if (rest.length === 0 && !trimmed.includes(":")) continue;
            currentKey = k.trim();
            const val = rest.join(":").trim();
            if (val) obj[currentKey] = isNaN(Number(val)) ? val.replace(/^["']|["']$/g, "") : Number(val);
            else if (arr.length) { obj[currentKey] = [...arr]; arr.length = 0; }
          }
        }
        if (arr.length && currentKey) obj[currentKey] = arr;
        setOutput(JSON.stringify(obj, null, 2));
      } else {
        const parsed = JSON.parse(input);
        const yaml = jsonToSimpleYaml(parsed, 0);
        setOutput(yaml);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Conversion failed");
      setOutput("");
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        <button type="button" onClick={() => setMode("yaml-to-json")} className={`px-3 py-1.5 rounded-lg text-sm font-medium ${mode === "yaml-to-json" ? "bg-indigo-600 text-white" : "bg-zinc-200 dark:bg-zinc-700"}`}>YAML → JSON</button>
        <button type="button" onClick={() => setMode("json-to-yaml")} className={`px-3 py-1.5 rounded-lg text-sm font-medium ${mode === "json-to-yaml" ? "bg-indigo-600 text-white" : "bg-zinc-200 dark:bg-zinc-700"}`}>JSON → YAML</button>
        <button type="button" onClick={convert} className="px-3 py-1.5 rounded-lg bg-zinc-800 dark:bg-zinc-600 text-white text-sm font-medium">Convert</button>
      </div>
      <TextArea label="Input" value={input} onChange={setInput} />
      {error && <p className="text-sm text-red-500">{error}</p>}
      {output && <TextArea label="Output" value={output} onChange={setOutput} />}
    </div>
  );
}

function jsonToSimpleYaml(obj: unknown, indent: number): string {
  const pad = "  ".repeat(indent);
  if (obj === null || obj === undefined) return "null";
  if (typeof obj !== "object") return String(obj);
  if (Array.isArray(obj)) {
    return obj.map((item) => `${pad}- ${typeof item === "object" ? "\n" + jsonToSimpleYaml(item, indent + 1) : item}`).join("\n");
  }
  return Object.entries(obj as Record<string, unknown>)
    .map(([k, v]) => {
      if (typeof v === "object" && v !== null) return `${pad}${k}:\n${jsonToSimpleYaml(v, indent + 1)}`;
      return `${pad}${k}: ${v}`;
    })
    .join("\n");
}

export function JwtDecoder() {
  const [token, setToken] = useState("");
  const [header, setHeader] = useState("");
  const [payload, setPayload] = useState("");
  const [error, setError] = useState("");

  function decode() {
    setError("");
    try {
      const parts = token.trim().split(".");
      if (parts.length < 2) throw new Error("Invalid JWT format");
      setHeader(JSON.stringify(JSON.parse(atob(parts[0].replace(/-/g, "+").replace(/_/g, "/"))), null, 2));
      setPayload(JSON.stringify(JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/"))), null, 2));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Decode failed");
      setHeader("");
      setPayload("");
    }
  }

  return (
    <div className="space-y-4">
      <TextArea label="JWT Token" value={token} onChange={setToken} rows={4} placeholder="eyJhbGciOiJIUzI1NiIs..." />
      <button type="button" onClick={decode} className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-sm font-medium">Decode</button>
      {error && <p className="text-sm text-red-500">{error}</p>}
      {header && <TextArea label="Header" value={header} onChange={setHeader} />}
      {payload && <TextArea label="Payload" value={payload} onChange={setPayload} />}
    </div>
  );
}

export function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function encode() {
    try { setOutput(btoa(input)); setError(""); } catch { setError("Encode failed"); }
  }
  function decode() {
    try { setOutput(atob(input)); setError(""); } catch { setError("Invalid Base64"); }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button type="button" onClick={encode} className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-sm font-medium">Encode</button>
        <button type="button" onClick={decode} className="px-3 py-1.5 rounded-lg bg-zinc-200 dark:bg-zinc-700 text-sm font-medium">Decode</button>
      </div>
      <TextArea label="Input" value={input} onChange={setInput} />
      {error && <p className="text-sm text-red-500">{error}</p>}
      {output && <TextArea label="Output" value={output} onChange={setOutput} />}
    </div>
  );
}

export function UrlCodec() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button type="button" onClick={() => setOutput(encodeURIComponent(input))} className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-sm font-medium">Encode</button>
        <button type="button" onClick={() => { try { setOutput(decodeURIComponent(input)); } catch { setOutput("Invalid encoded URL"); } }} className="px-3 py-1.5 rounded-lg bg-zinc-200 dark:bg-zinc-700 text-sm font-medium">Decode</button>
      </div>
      <TextArea label="Input" value={input} onChange={setInput} />
      {output && <TextArea label="Output" value={output} onChange={setOutput} />}
    </div>
  );
}

export function HashGenerator() {
  const [input, setInput] = useState("");
  const [sha256, setSha256] = useState("");
  const [sha512, setSha512] = useState("");

  async function hash() {
    const data = new TextEncoder().encode(input);
    const h256 = await crypto.subtle.digest("SHA-256", data);
    const h512 = await crypto.subtle.digest("SHA-512", data);
    setSha256(Array.from(new Uint8Array(h256)).map((b) => b.toString(16).padStart(2, "0")).join(""));
    setSha512(Array.from(new Uint8Array(h512)).map((b) => b.toString(16).padStart(2, "0")).join(""));
  }

  return (
    <div className="space-y-4">
      <TextArea label="Text" value={input} onChange={setInput} rows={4} />
      <button type="button" onClick={hash} className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-sm font-medium">Generate hashes</button>
      {sha256 && (
        <div>
          <p className="text-xs font-semibold text-zinc-500 mb-1">SHA-256</p>
          <code className="block text-xs font-mono break-all p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800">{sha256}</code>
        </div>
      )}
      {sha512 && (
        <div>
          <p className="text-xs font-semibold text-zinc-500 mb-1">SHA-512</p>
          <code className="block text-xs font-mono break-all p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800">{sha512}</code>
        </div>
      )}
    </div>
  );
}

export function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(5);

  function generate() {
    setUuids(Array.from({ length: count }, () => crypto.randomUUID()));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <label className="text-sm text-zinc-600">Count:</label>
        <input type="number" min={1} max={50} value={count} onChange={(e) => setCount(Number(e.target.value))} className="w-20 px-2 py-1 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-sm" />
        <button type="button" onClick={generate} className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-sm font-medium">Generate</button>
      </div>
      {uuids.length > 0 && (
        <div className="space-y-2">
          {uuids.map((u) => (
            <div key={u} className="flex items-center justify-between gap-2 p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 font-mono text-sm">
              <span>{u}</span>
              <CopyButton text={u} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function PasswordGenerator() {
  const [len, setLen] = useState(20);
  const [password, setPassword] = useState("");

  function generate() {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*-_=+";
    const arr = new Uint32Array(len);
    crypto.getRandomValues(arr);
    setPassword(Array.from(arr, (n) => chars[n % chars.length]).join(""));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <label className="text-sm text-zinc-600">Length:</label>
        <input type="number" min={8} max={128} value={len} onChange={(e) => setLen(Number(e.target.value))} className="w-20 px-2 py-1 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-sm" />
        <button type="button" onClick={generate} className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-sm font-medium">Generate</button>
      </div>
      {password && (
        <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 font-mono text-sm break-all">
          <span>{password}</span>
          <CopyButton text={password} />
        </div>
      )}
    </div>
  );
}

export function TimestampConverter() {
  const [unix, setUnix] = useState(String(Math.floor(Date.now() / 1000)));
  const [iso, setIso] = useState(new Date().toISOString());

  function fromUnix() {
    const d = new Date(Number(unix) * 1000);
    if (!isNaN(d.getTime())) setIso(d.toISOString());
  }

  function fromIso() {
    const d = new Date(iso);
    if (!isNaN(d.getTime())) setUnix(String(Math.floor(d.getTime() / 1000)));
  }

  function now() {
    const d = new Date();
    setUnix(String(Math.floor(d.getTime() / 1000)));
    setIso(d.toISOString());
  }

  return (
    <div className="space-y-4">
      <button type="button" onClick={now} className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-sm font-medium">Now</button>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-zinc-500 uppercase">Unix timestamp</label>
          <input value={unix} onChange={(e) => setUnix(e.target.value)} onBlur={fromUnix} className="w-full mt-1 font-mono text-sm rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 p-3" />
        </div>
        <div>
          <label className="text-xs font-semibold text-zinc-500 uppercase">ISO 8601</label>
          <input value={iso} onChange={(e) => setIso(e.target.value)} onBlur={fromIso} className="w-full mt-1 font-mono text-sm rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 p-3" />
        </div>
      </div>
    </div>
  );
}

export function RegexTester() {
  const [pattern, setPattern] = useState("\\d+");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("Order 123 shipped on 2024-01-15");
  const [matches, setMatches] = useState<string[]>([]);
  const [error, setError] = useState("");

  function test() {
    setError("");
    try {
      const re = new RegExp(pattern, flags);
      setMatches(text.match(re) ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid regex");
      setMatches([]);
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-3 gap-3">
        <input value={pattern} onChange={(e) => setPattern(e.target.value)} placeholder="Pattern" className="font-mono text-sm rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 p-3 sm:col-span-2" />
        <input value={flags} onChange={(e) => setFlags(e.target.value)} placeholder="Flags (g,i,m)" className="font-mono text-sm rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 p-3" />
      </div>
      <TextArea label="Test string" value={text} onChange={setText} rows={4} />
      <button type="button" onClick={test} className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-sm font-medium">Test</button>
      {error && <p className="text-sm text-red-500">{error}</p>}
      {matches.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-zinc-500 mb-2">Matches ({matches.length})</p>
          <ul className="space-y-1">{matches.map((m, i) => <li key={i} className="font-mono text-sm p-2 rounded bg-zinc-100 dark:bg-zinc-800">{m}</li>)}</ul>
        </div>
      )}
    </div>
  );
}

export function DockerRunConverter() {
  const [input, setInput] = useState("docker run -d -p 8080:80 --name web -e NODE_ENV=production nginx:alpine");
  const [output, setOutput] = useState("");

  function convert() {
    const line = input.replace(/^docker\s+run\s+/, "").trim();
    const tokens = line.match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g) ?? [];
    const service: Record<string, unknown> = { image: "nginx" };
    const ports: string[] = [];
    const environment: Record<string, string> = {};
    let i = 0;
    while (i < tokens.length) {
      const t = tokens[i].replace(/^["']|["']$/g, "");
      if (t === "-d" || t === "--detach") { /* skip */ }
      else if (t === "-p" || t === "--publish") { ports.push(tokens[++i]?.replace(/^["']|["']$/g, "") ?? ""); }
      else if (t === "--name") { service.container_name = tokens[++i]?.replace(/^["']|["']$/g, ""); }
      else if (t === "-e" || t === "--env") {
        const env = tokens[++i]?.replace(/^["']|["']$/g, "") ?? "";
        const [k, v] = env.split("=");
        if (k) environment[k] = v ?? "";
      } else if (!t.startsWith("-")) { service.image = t; }
      i++;
    }
    if (ports.length) service.ports = ports;
    if (Object.keys(environment).length) service.environment = environment;
    const yaml = `services:\n  app:\n${Object.entries(service).map(([k, v]) => {
      if (typeof v === "object") return `    ${k}:\n${Object.entries(v as Record<string, string>).map(([ek, ev]) => `      ${ek}: ${ev}`).join("\n")}`;
      if (Array.isArray(v)) return `    ${k}:\n${v.map((p) => `      - "${p}"`).join("\n")}`;
      return `    ${k}: ${v}`;
    }).join("\n")}`;
    setOutput(yaml);
  }

  return (
    <div className="space-y-4">
      <TextArea label="docker run command" value={input} onChange={setInput} rows={3} />
      <button type="button" onClick={convert} className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-sm font-medium">Convert to Compose snippet</button>
      {output && <TextArea label="docker-compose.yml snippet" value={output} onChange={setOutput} />}
    </div>
  );
}

export function KubectlCheatsheet() {
  const cmds = [
    { cmd: "kubectl get pods -A", desc: "All pods in all namespaces" },
    { cmd: "kubectl describe pod <name>", desc: "Pod events and status" },
    { cmd: "kubectl logs <pod> -f", desc: "Stream pod logs" },
    { cmd: "kubectl apply -f .", desc: "Apply manifests in folder" },
    { cmd: "kubectl delete -f deployment.yml", desc: "Delete resources from file" },
    { cmd: "kubectl exec -it <pod> -- /bin/sh", desc: "Shell into pod" },
    { cmd: "kubectl port-forward svc/<name> 8080:80", desc: "Forward local port to service" },
    { cmd: "kubectl get events --sort-by=.lastTimestamp", desc: "Recent cluster events" },
    { cmd: "kubectl rollout restart deployment/<name>", desc: "Restart deployment" },
    { cmd: "kubectl top pods", desc: "Pod CPU/memory usage" },
  ];
  return (
    <div className="space-y-2">
      {cmds.map(({ cmd, desc }) => (
        <div key={cmd} className="flex items-start justify-between gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <div>
            <code className="text-sm font-mono text-indigo-700 dark:text-indigo-400">{cmd}</code>
            <p className="text-xs text-zinc-500 mt-1">{desc}</p>
          </div>
          <CopyButton text={cmd} />
        </div>
      ))}
    </div>
  );
}

export function CronReference() {
  return (
    <div className="space-y-4 text-sm">
      <pre className="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-900 font-mono text-xs overflow-x-auto">{`* * * * *
│ │ │ │ │
│ │ │ │ └── Day of week (0-7, Sun=0)
│ │ │ └──── Month (1-12)
│ │ └────── Day of month (1-31)
│ └──────── Hour (0-23)
└────────── Minute (0-59)`}</pre>
      <table className="w-full text-left text-sm">
        <thead><tr className="text-zinc-500 text-xs uppercase"><th className="pb-2">Expression</th><th className="pb-2">Meaning</th></tr></thead>
        <tbody className="font-mono">
          {[
            ["*/5 * * * *", "Every 5 minutes"],
            ["0 * * * *", "Every hour"],
            ["0 0 * * *", "Daily at midnight"],
            ["0 2 * * 0", "Sunday 2 AM"],
            ["0 0 1 * *", "First day of month"],
          ].map(([expr, meaning]) => (
            <tr key={expr} className="border-t border-zinc-200 dark:border-zinc-800">
              <td className="py-2 text-indigo-700 dark:text-indigo-400">{expr}</td>
              <td className="py-2 text-zinc-600 dark:text-zinc-400">{meaning}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function StringCaseConverter() {
  const [input, setInput] = useState("hello_world-example");
  const cases = {
    camelCase: input.replace(/[-_](.)/g, (_, c) => c.toUpperCase()).replace(/^./, (c) => c.toLowerCase()),
    snake_case: input.replace(/([A-Z])/g, "_$1").replace(/[-\s]/g, "_").toLowerCase().replace(/^_/, ""),
    "kebab-case": input.replace(/([A-Z])/g, "-$1").replace(/[_\s]/g, "-").toLowerCase().replace(/^-/, ""),
    UPPER: input.toUpperCase(),
    lower: input.toLowerCase(),
  };
  return (
    <div className="space-y-4">
      <TextArea label="Input" value={input} onChange={setInput} rows={2} />
      {Object.entries(cases).map(([name, val]) => (
        <div key={name} className="flex items-center justify-between gap-2 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900">
          <div><span className="text-xs text-zinc-500">{name}</span><p className="font-mono text-sm">{val}</p></div>
          <CopyButton text={val} />
        </div>
      ))}
    </div>
  );
}

export const utilityComponents: Record<string, ComponentType> = {
  "json-formatter": JsonFormatter,
  "yaml-json": YamlJsonConverter,
  "jwt-decoder": JwtDecoder,
  base64: Base64Tool,
  "url-codec": UrlCodec,
  "hash-generator": HashGenerator,
  "uuid-generator": UuidGenerator,
  "password-generator": PasswordGenerator,
  "timestamp-converter": TimestampConverter,
  "regex-tester": RegexTester,
  "docker-run-converter": DockerRunConverter,
  "kubectl-cheatsheet": KubectlCheatsheet,
  "cron-reference": CronReference,
  "string-case": StringCaseConverter,
};
