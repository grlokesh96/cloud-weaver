import { motion, useReducedMotion } from "framer-motion";
import { SKILL_CATEGORIES, type Tech, type TechCategory } from "@/lib/skills-data";

function TechTile({ tech }: { tech: Tech }) {
  const Icon = tech.icon;
  const label = tech.label ?? tech.name;
  return (
    <li
      tabIndex={0}
      title={tech.label && tech.label !== tech.name ? tech.label : undefined}
      aria-label={label}
      className="group flex h-full min-h-[96px] flex-col items-center justify-start gap-2.5 rounded-xl border border-foreground/10 bg-foreground/[0.03] px-2 py-4 text-center transition-[transform,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-foreground/[0.06] focus-visible:-translate-y-0.5 focus-visible:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 motion-reduce:transform-none"
    >
      <span className="grid h-9 w-9 place-items-center" aria-hidden>
        {tech.img ? (
          <img src={tech.img} alt="" width={32} height={32} loading="lazy" decoding="async" className="h-8 w-8 object-contain" />
        ) : Icon ? (
          <Icon className={tech.color ? "h-8 w-8" : "h-8 w-8 text-foreground"} style={tech.color ? { color: tech.color } : undefined} />
        ) : (
          <span
            className="grid h-9 w-9 place-items-center rounded-lg font-mono text-xs font-bold"
            style={{ color: tech.color, boxShadow: `inset 0 0 0 1.5px ${tech.color ?? "currentColor"}` }}
          >
            {tech.mono ?? tech.name.slice(0, 2).toUpperCase()}
          </span>
        )}
      </span>
      <span className="text-xs font-medium leading-tight text-foreground/85 sm:text-[13px]">{tech.name}</span>
    </li>
  );
}

function CategoryGroup({ cat, index }: { cat: TechCategory; index: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="border-t border-foreground/10 pt-6 first:border-t-0 first:pt-0"
    >
      <h3 id={`skills-${cat.id}`} className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        {cat.title}
        <span className="text-xs font-normal normal-case tracking-normal text-muted-foreground/70">{cat.tools.length}</span>
      </h3>
      <ul aria-labelledby={`skills-${cat.id}`} className="grid grid-cols-2 gap-3 min-[360px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8">
        {cat.tools.map(t => <TechTile key={t.name} tech={t} />)}
      </ul>
    </motion.div>
  );
}

export function SkillsGrid() {
  return (
    <div className="mt-10 space-y-8">
      {SKILL_CATEGORIES.map((c, i) => <CategoryGroup key={c.id} cat={c} index={i} />)}
    </div>
  );
}
