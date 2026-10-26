import resumeAsset from "@/assets/resume.pdf.asset.json";

// Serve the PDF as a plain static file from `public/`. The Lovable CDN path
// (`/__l5e/assets-v1/...`) only exists on Lovable's own hosting, so deployments
// to Netlify / Vercel / Cloudflare Pages / etc. 404 on it. The file in
// `public/` ships with the build output and is served directly by any host.
export const RESUME_ORIGINAL_FILENAME = resumeAsset.original_filename;
export const RESUME_SOURCE_URL = `/${RESUME_ORIGINAL_FILENAME}`;
export const RESUME_FILE_URL = `/${RESUME_ORIGINAL_FILENAME}`;
export const RESUME_VIEWER_URL = "/resume";
export const RESUME_FILENAME = "G_R_Lokesh_DevOps_Resume.pdf";

/** Human-readable resume metadata shown on the public Resume card. */
export const RESUME_VERSION = "2.3";

/**
 * Formats an upload timestamp as "Month YYYY". Uses a fixed locale and UTC so
 * the server render and the browser render always produce the same text.
 */
export function formatResumeUpdated(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "UTC" }).format(date);
}

// Date and size come from the uploaded resume's asset record, so they update
// automatically every time a new resume is uploaded.
export const RESUME_UPDATED_ISO = resumeAsset.created_at;
export const RESUME_UPDATED_LABEL = formatResumeUpdated(resumeAsset.created_at);
export const RESUME_FILE_SIZE_BYTES = resumeAsset.size;
export const RESUME_TITLE = "AWS DevOps · DevSecOps · Platform Engineer";

/** localStorage key for the client-side download counter. */
export const RESUME_DOWNLOAD_COUNT_KEY = "resume:download-count:v1";
/** Baseline shown to visitors so a fresh browser doesn't read "0 downloads". */
export const RESUME_DOWNLOAD_BASELINE = 606;

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}
