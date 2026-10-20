import { useMemo, useRef, useState, type KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiSearch, HiX } from "react-icons/hi";
import { SKILLS } from "@/lib/portfolio-data";

const TOTAL_UNIQUE = new Set(SKILLS.flatMap(g => g.items)).size;

function categoriesFor(item: string) {
  return SKILLS.filter(g => g.items.includes(item)).map(g => g.title);
}

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <span className="text-highlight font-semibold">{text.slice(idx, idx + query.length)}</span>
      {text.slice(idx + query.length)}
    </>
  );
}

export function SkillsExplorer() {
  const [active, setActive] = useState(0);
  const [query, setQuery] = useState("");
  const [pinned, setPinned] = useState<string | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const q = query.trim().toLowerCase();
  const matchCounts = useMemo(
    () => SKILLS.map(g => (q ? g.items.filter(i => i.toLowerCase().includes(q)).length : g.items.length)),
    [q],
  );
  const searchResults = useMemo(
    () => (q ? SKILLS.map(g => ({ ...g, items: g.items.filter(i => i.toLowerCase().includes(q)) })).filter(g => g.items.length) : []),
    [q],
  );

  const group = SKILLS[active];
  const ActiveIcon = group.icon;

  const selectTab = (i: number) => {
    setActive(i);
    setPinned(null);
    setQuery("");
  };

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    let next = -1;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (i + 1) % SKILLS.length;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (i - 1 + SKILLS.length) % SKILLS.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = SKILLS.length - 1;
    if (next < 0) return;
    e.preventDefault();
    selectTab(next);
    tabRefs.current[next]?.focus();
  };

  const renderChip = (item: string, i: number, showQuery: boolean) => {
    const isPinned = pinned === item;
    return (
      <motion.button
        key={item}
        type="button"
        layout
        initial={{ opacity: 0, y: 10, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.3, delay: i * 0.03, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setPinned(isPinned ? null : item)}
        aria-pressed={isPinned}
        className={`group/chip relative overflow-hidden rounded-xl border px-3.5 py-2.5 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${
          isPinned
            ? "border-primary/50 bg-primary/10 text-foreground"
            : "border-foreground/10 bg-foreground/[0.03] text-muted-foreground hover:border-primary/40 hover:text-foreground"
        }`}
      >
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[var(--color-aurora-1)]/0 via-[var(--color-aurora-2)]/10 to-[var(--color-aurora-3)]/0 opacity-0 transition-opacity group-hover/chip:opacity-100" />
        <span className="relative flex items-center gap-2">
          <span className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors ${isPinned ? "bg-primary" : "bg-foreground/25 group-hover/chip:bg-primary"}`} />
          <span className="font-medium">{showQuery ? <Highlight text={item} query={query.trim()} /> : item}</span>
        </span>
      </motion.button>
    );
  };

  return (
    <div className="mt-10 grid gap-4 lg:grid-cols-[300px_1fr]">
      {/* Category rail */}
      <div className="skill-card rounded-2xl p-2">
        <div
          role="tablist"
          aria-label="Skill categories"
          aria-orientation="vertical"
          className="flex gap-1 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0 [scrollbar-width:none]"
        >
          {SKILLS.map((g, i) => {
            const Icon = g.icon;
            const selected = !q && i === active;
            const dim = q && matchCounts[i] === 0;
            return (
              <button
                key={g.title}
                ref={el => { tabRefs.current[i] = el; }}
                role="tab"
                id={`skill-tab-${i}`}
                aria-selected={selected}
                aria-controls="skill-panel"
                tabIndex={i === active ? 0 : -1}
                onClick={() => selectTab(i)}
                onKeyDown={e => onTabKey(e, i)}
                className={`relative flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${
                  selected ? "text-foreground" : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                } ${dim ? "opacity-40" : ""}`}
              >
                {selected && (
                  <motion.span
                    layoutId="skill-tab-active"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--color-aurora-1)]/20 via-[var(--color-aurora-2)]/10 to-transparent ring-1 ring-inset ring-primary/30"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                <span className={`relative flex h-8 w-8 items-center justify-center rounded-lg ring-1 ring-inset ring-foreground/10 transition-colors ${selected ? "bg-primary/15" : "bg-foreground/5"}`}>
                  <Icon size={16} className={selected ? "text-primary" : ""} aria-hidden />
                </span>
                <span className="relative whitespace-nowrap font-medium lg:flex-1">{g.title}</span>
                <span className={`relative rounded-full px-2 py-0.5 font-mono text-[11px] tabular-nums ${selected ? "bg-primary/15 text-primary" : "bg-foreground/5"}`}>
                  {matchCounts[i]}
                </span>
              </button>
            );
          })}
        </div>
        <div className="hidden border-t border-foreground/10 px-3 pb-2 pt-3 text-xs text-muted-foreground lg:block">
          <span className="font-semibold text-foreground">{TOTAL_UNIQUE}</span> technologies across{" "}
          <span className="font-semibold text-foreground">{SKILLS.length}</span> domains
        </div>
      </div>

      {/* Detail panel */}
      <div
        id="skill-panel"
        role="tabpanel"
        aria-labelledby={q ? undefined : `skill-tab-${active}`}
        aria-label={q ? "Skill search results" : undefined}
        className="skill-card relative flex min-h-[380px] flex-col overflow-hidden rounded-2xl p-5 sm:p-6"
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-to-br from-[var(--color-aurora-1)]/25 via-[var(--color-aurora-2)]/15 to-[var(--color-aurora-3)]/10 blur-3xl" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={q ? "search" : group.title}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-3"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-aurora-1)]/25 to-[var(--color-aurora-2)]/20 ring-1 ring-inset ring-foreground/10">
                {q ? <HiSearch size={20} className="text-primary" aria-hidden /> : <ActiveIcon size={20} className="text-primary" aria-hidden />}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{q ? "Search results" : group.title}</h3>
                <p className="text-xs text-muted-foreground">
                  {q
                    ? `${searchResults.reduce((n, g) => n + g.items.length, 0)} matches for “${query.trim()}”`
                    : `${group.items.length} tools · ${String(active + 1).padStart(2, "0")} / ${String(SKILLS.length).padStart(2, "0")}`}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <label className="relative block sm:w-60">
            <span className="sr-only">Search skills</span>
            <HiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} aria-hidden />
            <input
              value={query}
              onChange={e => { setQuery(e.target.value); setPinned(null); }}
              placeholder="Search a tool…"
              className="w-full rounded-full border border-foreground/10 bg-foreground/5 py-2 pl-9 pr-9 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-foreground/10 hover:text-foreground"
              >
                <HiX size={14} />
              </button>
            )}
          </label>
        </div>

        <div className="relative mt-6 flex-1">
          {q ? (
            searchResults.length ? (
              <div className="space-y-5">
                {searchResults.map(g => (
                  <div key={g.title}>
                    <div className="mb-2 text-[11px] font-mono uppercase tracking-widest text-primary">{g.title}</div>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4">
                      <AnimatePresence mode="popLayout">{g.items.map((it, i) => renderChip(it, i, true))}</AnimatePresence>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-full min-h-[200px] flex-col items-center justify-center text-center text-sm text-muted-foreground">
                No tools match “{query.trim()}”.
                <button type="button" onClick={() => setQuery("")} className="mt-2 text-primary hover:underline">Clear search</button>
              </div>
            )
          ) : (
            <div key={group.title} className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4">
              <AnimatePresence mode="popLayout">{group.items.map((it, i) => renderChip(it, i, false))}</AnimatePresence>
            </div>
          )}
        </div>

        <div className="relative mt-6 min-h-[44px] border-t border-foreground/10 pt-4 text-xs text-muted-foreground">
          <AnimatePresence mode="wait">
            {pinned ? (
              <motion.div key={pinned} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-foreground">{pinned}</span>
                <span>used in</span>
                {categoriesFor(pinned).map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => selectTab(SKILLS.findIndex(g => g.title === c))}
                    className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-primary transition-colors hover:bg-primary/20"
                  >
                    {c}
                  </button>
                ))}
              </motion.div>
            ) : (
              <motion.div key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                Tip: tap any tool to see where it fits in the stack · use arrow keys to switch categories.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
