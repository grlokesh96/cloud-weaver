<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules

- Resume card metadata (updated date, file size) is derived from `src/assets/resume.pdf.asset.json` (`created_at`, `size`), so replacing the resume means re-creating that pointer and the matching `public/` copy — never hardcode these values.
- The resume download total is a single shared row in the `resume_stats` table, incremented only through the `increment_resume_downloads()` database function; every download button must call `recordResumeDownload()` so all entry points count.
