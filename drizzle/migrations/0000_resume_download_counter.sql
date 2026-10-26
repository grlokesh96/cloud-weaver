CREATE TABLE public.resume_stats (
  id smallint PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  downloads bigint NOT NULL DEFAULT 606,
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.resume_stats TO anon, authenticated;
GRANT ALL ON public.resume_stats TO service_role;

ALTER TABLE public.resume_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read the resume download total"
ON public.resume_stats FOR SELECT
TO anon, authenticated
USING (true);

INSERT INTO public.resume_stats (id, downloads) VALUES (1, 606);

CREATE OR REPLACE FUNCTION public.increment_resume_downloads()
RETURNS bigint
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_total bigint;
BEGIN
  UPDATE public.resume_stats
  SET downloads = downloads + 1, updated_at = now()
  WHERE id = 1
  RETURNING downloads INTO new_total;
  RETURN new_total;
END;
$$;

REVOKE ALL ON FUNCTION public.increment_resume_downloads() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.increment_resume_downloads() TO anon, authenticated;