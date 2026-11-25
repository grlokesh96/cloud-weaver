import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

/** Live shared visitor total; counts each browser session once. */
export function useSiteVisits() {
  const [total, setTotal] = useState<number | null>(null);
  useEffect(() => {
    let active = true;
    const apply = (v: unknown) => {
      const n = Number(v);
      if (active && Number.isFinite(n)) setTotal(n);
    };
    const key = "site-visit-counted";
    if (!sessionStorage.getItem(key)) {
      sessionStorage.setItem(key, "1");
      supabase.rpc("increment_site_visits").then(({ data }) => apply(data));
    } else {
      supabase.from("site_stats").select("visits").eq("id", 1).maybeSingle().then(({ data }) => data && apply(data.visits));
    }
    const channel = supabase
      .channel(`site-stats-${Math.random().toString(36).slice(2)}`)
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "site_stats" }, (p) => apply((p.new as { visits?: number }).visits))
      .subscribe();
    return () => { active = false; supabase.removeChannel(channel); };
  }, []);
  return total;
}
