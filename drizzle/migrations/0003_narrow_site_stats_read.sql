DROP POLICY "Anyone can read visit total" ON public.site_stats;
CREATE POLICY "Anyone can read the public visit total" ON public.site_stats FOR SELECT TO anon, authenticated USING (id = 1);