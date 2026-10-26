import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { RESUME_DOWNLOAD_BASELINE } from "@/lib/resume";

const listeners = new Set<(total: number) => void>();
const broadcast = (total: number) => listeners.forEach((fn) => fn(total));

/** Adds one to the shared download total (all visitors) and returns the new total. */
export async function recordResumeDownload(): Promise<number | null> {
  try {
    const { data, error } = await supabase.rpc("increment_resume_downloads");
    if (error || typeof data !== "number") return null;
    broadcast(data);
    return data;
  } catch {
    return null;
  }
}

async function fetchTotal(): Promise<number | null> {
  const { data, error } = await supabase.from("resume_stats").select("downloads").eq("id", 1).maybeSingle();
  if (error || !data) return null;
  return Number(data.downloads);
}

/** Live shared download total; updates instantly when anyone downloads the resume. */
export function useResumeDownloadTotal() {
  const [total, setTotal] = useState<number>(RESUME_DOWNLOAD_BASELINE);

  useEffect(() => {
    let active = true;
    const apply = (value: number | null) => {
      if (active && value !== null && Number.isFinite(value)) setTotal(value);
    };

    fetchTotal().then(apply).catch(() => {});
    listeners.add(apply);

    const channel = supabase
      .channel(`resume-stats-${Math.random().toString(36).slice(2)}`)
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "resume_stats" }, (payload) => {
        apply(Number((payload.new as { downloads?: number }).downloads));
      })
      .subscribe();

    const onVisible = () => {
      if (document.visibilityState === "visible") fetchTotal().then(apply).catch(() => {});
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      active = false;
      listeners.delete(apply);
      document.removeEventListener("visibilitychange", onVisible);
      supabase.removeChannel(channel);
    };
  }, []);

  return total;
}
