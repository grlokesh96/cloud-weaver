import { useEffect, useRef, useState } from "react";
import { PIPELINE_STAGES } from "@/lib/pipeline-data";

type Line = { kind: "cmd" | "out" | "ok" | "warn"; text: string };

const DEMOS: { cmd: string; out: Line[] }[] = [
  {
    cmd: "kubectl get nodes -o wide",
    out: [
      { kind: "out", text: "NAME              STATUS  ROLES   AGE  VERSION" },
      { kind: "ok", text: "ip-10-0-1-24     Ready   <none>  42d  v1.30.2" },
      { kind: "ok", text: "ip-10-0-2-118    Ready   <none>  42d  v1.30.2" },
      { kind: "ok", text: "ip-10-0-3-77     Ready   <none>  12d  v1.30.2" },
    ],
  },
  {
    cmd: "trivy image api:1.8.4 --severity HIGH,CRITICAL",
    out: [
      { kind: "out", text: "Scanning api:1.8.4 (alpine 3.20) ..." },
      { kind: "ok", text: "Total: 0 (HIGH: 0, CRITICAL: 0)  ✔ gate passed" },
    ],
  },
  {
    cmd: "terraform plan -out=tfplan",
    out: [
      { kind: "out", text: "Refreshing state... module.eks, module.vpc" },
      { kind: "warn", text: "Plan: 2 to add, 1 to change, 0 to destroy." },
    ],
  },
  {
    cmd: "argocd app sync payments --prune",
    out: [{ kind: "ok", text: "Synced · Healthy · revision a1f9c3e" }],
  },
];

const goto = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const COMMANDS: Record<string, { desc: string; run: () => Line[] }> = {
  help: {
    desc: "list commands",
    run: () => [
      { kind: "out", text: "Available: help, skills, pipeline, ops, projects, resume, contact, clear" },
    ],
  },
  skills: { desc: "jump to skills", run: () => (goto("skills"), [{ kind: "ok", text: "→ Opening skills matrix..." }]) },
  pipeline: {
    desc: "CI/CD demo",
    run: () => (goto("pipeline"), [{ kind: "ok", text: `→ Launching ${PIPELINE_STAGES.length}-stage DevSecOps pipeline...` }]),
  },
  ops: { desc: "K8s ops center", run: () => (goto("ops-center"), [{ kind: "ok", text: "→ Connecting to EKS Ops Center..." }]) },
  projects: { desc: "projects", run: () => (goto("projects"), [{ kind: "ok", text: "→ Loading projects..." }]) },
  resume: { desc: "resume", run: () => (goto("resume"), [{ kind: "ok", text: "→ Fetching latest resume..." }]) },
  contact: { desc: "contact", run: () => (goto("contact"), [{ kind: "ok", text: "→ Opening contact channel..." }]) },
};

const QUICK = ["help", "skills", "pipeline", "resume", "contact"];

export function HeroTerminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [typing, setTyping] = useState("");
  const [input, setInput] = useState("");
  const [interactive, setInteractive] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Autoplay demo commands until the visitor interacts
  useEffect(() => {
    if (interactive) return;
    let cancelled = false;
    const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
    (async () => {
      let i = 0;
      while (!cancelled) {
        const demo = DEMOS[i % DEMOS.length]!;
        for (let c = 1; c <= demo.cmd.length && !cancelled; c++) {
          setTyping(demo.cmd.slice(0, c));
          await sleep(38);
        }
        await sleep(300);
        if (cancelled) return;
        setTyping("");
        setLines(prev => [...prev, { kind: "cmd" as const, text: demo.cmd }].slice(-14));
        for (const l of demo.out) {
          await sleep(220);
          if (cancelled) return;
          setLines(prev => [...prev, l].slice(-14));
        }
        await sleep(1800);
        i++;
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [interactive]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines, typing]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    setInteractive(true);
    setTyping("");
    if (!cmd) return;
    if (cmd === "clear") return setLines([]);
    const handler = COMMANDS[cmd];
    const out: Line[] = handler
      ? handler.run()
      : [{ kind: "warn", text: `command not found: ${cmd} — try "help"` }];
    setLines(prev => [...prev, { kind: "cmd" as const, text: cmd }, ...out].slice(-14));
  };

  const color = (k: Line["kind"]) =>
    k === "ok" ? "text-emerald-400" : k === "warn" ? "text-amber-300" : k === "cmd" ? "text-foreground" : "text-muted-foreground";

  return (
    <div
      className="glass overflow-hidden rounded-2xl border border-border shadow-2xl"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-2 border-b border-border bg-secondary/60 px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-destructive/80" />
        <span className="h-3 w-3 rounded-full bg-amber-400/80" />
        <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
        <span className="ml-3 font-mono text-xs text-muted-foreground">lokesh@platform: ~/eks-prod</span>
        <span className="ml-auto flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-emerald-400">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> live
        </span>
      </div>
      <div ref={bodyRef} className="h-72 overflow-y-auto px-4 py-3 font-mono text-[12.5px] leading-relaxed" aria-live="polite">
        {lines.map((l, i) => (
          <div key={i} className={`whitespace-pre-wrap ${color(l.kind)}`}>
            {l.kind === "cmd" && <span className="text-primary">$ </span>}
            {l.text}
          </div>
        ))}
        <form
          className="flex items-center"
          onSubmit={e => {
            e.preventDefault();
            run(input);
            setInput("");
          }}
        >
          <span className="text-primary">$&nbsp;</span>
          {!interactive && typing ? (
            <span className="text-foreground">{typing}</span>
          ) : null}
          <input
            ref={inputRef}
            value={input}
            onChange={e => {
              setInteractive(true);
              setInput(e.target.value);
            }}
            aria-label="Terminal command"
            placeholder={interactive ? 'type "help"' : ""}
            className="flex-1 bg-transparent text-foreground caret-primary outline-none placeholder:text-muted-foreground/60"
            autoComplete="off"
            spellCheck={false}
          />
        </form>
      </div>
      <div className="flex flex-wrap gap-1.5 border-t border-border bg-secondary/40 px-3 py-2.5">
        {QUICK.map(q => (
          <button
            key={q}
            type="button"
            onClick={e => {
              e.stopPropagation();
              run(q);
            }}
            className="rounded-md border border-border bg-background/50 px-2.5 py-1 font-mono text-[11px] text-muted-foreground transition hover:border-primary/60 hover:text-foreground"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}
