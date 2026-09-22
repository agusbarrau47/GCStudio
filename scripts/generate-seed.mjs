// Genera supabase/seed.sql a partir de la fuente de verdad src/content/courses.ts.
// Uso: node scripts/generate-seed.mjs
import { build } from "esbuild";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, resolve } from "node:path";
import { writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const src = resolve(root, "src");

const tmp = mkdtempSync(resolve(tmpdir(), "gcseed-"));
const outfile = resolve(tmp, "courses.mjs");

await build({
  entryPoints: [resolve(src, "content/courses.ts")],
  outfile,
  bundle: true,
  format: "esm",
  platform: "node",
  logLevel: "error",
  alias: { "@": src },
});

const mod = await import(pathToFileURL(outfile).href);
const { COURSES } = mod;

const q = (s) => (s == null ? "null" : `'${String(s).replace(/'/g, "''")}'`);
const j = (o) => `'${JSON.stringify(o).replace(/'/g, "''")}'::jsonb`;
const n = (v) => (v == null ? "null" : String(v));

const lines = [];
lines.push("-- GCStudio · Seed de cursos (generado desde src/content/courses.ts)");
lines.push("-- Derivado del material real. NO editar a mano: regenerar con node scripts/generate-seed.mjs");
lines.push("");
lines.push("begin;");
lines.push("");

COURSES.forEach((c, ci) => {
  lines.push(`-- ===== ${c.title} =====`);
  lines.push(
    `insert into courses (id, slug, title, subtitle, description, level, status, video_duration_seconds, video_asset_id, cover_image, price_ars, position)
values (${q(c.id)}, ${q(c.slug)}, ${q(c.title)}, ${q(c.subtitle)}, ${q(c.description)}, ${q(c.level)}, ${q(c.status)}, ${n(c.videoDurationSeconds)}, ${q(c.videoAssetId)}, ${q(c.coverImage)}, ${n(c.priceArs)}, ${ci})
on conflict (id) do update set
  slug = excluded.slug, title = excluded.title, subtitle = excluded.subtitle,
  description = excluded.description, level = excluded.level,
  video_duration_seconds = excluded.video_duration_seconds, cover_image = excluded.cover_image,
  position = excluded.position;`
  );

  c.modules.forEach((m) => {
    lines.push(
      `insert into modules (id, course_id, position, title, summary)
values (${q(m.id)}, ${q(c.id)}, ${m.order}, ${q(m.title)}, ${q(m.summary)})
on conflict (id) do update set title = excluded.title, summary = excluded.summary, position = excluded.position;`
    );

    m.lessons.forEach((l) => {
      lines.push(
        `insert into lessons (id, module_id, course_id, slug, position, title, summary, source, content, objectives, highlights, video_start_seconds, video_end_seconds)
values (${q(l.id)}, ${q(m.id)}, ${q(c.id)}, ${q(l.slug)}, ${l.order}, ${q(l.title)}, ${q(l.summary)}, ${q(l.source)}, ${j(l.content)}, ${j(l.objectives)}, ${j(l.highlights)}, ${n(l.videoStartSeconds)}, ${n(l.videoEndSeconds)})
on conflict (id) do update set title = excluded.title, summary = excluded.summary, content = excluded.content, objectives = excluded.objectives, highlights = excluded.highlights, position = excluded.position;`
      );

      l.resources.forEach((r, ri) => {
        lines.push(
          `insert into lesson_resources (id, lesson_id, title, type, url, body, position)
values (${q(r.id)}, ${q(l.id)}, ${q(r.title)}, ${q(r.type)}, ${q(r.url)}, ${r.body ? j(r.body) : "null"}, ${ri})
on conflict (id) do update set title = excluded.title, url = excluded.url, body = excluded.body;`
        );
      });
    });
  });
  lines.push("");
});

lines.push("commit;");
lines.push("");

const outPath = resolve(root, "supabase/seed.sql");
writeFileSync(outPath, lines.join("\n"), "utf8");
console.log(`seed.sql generado: ${outPath}`);
console.log(`Cursos: ${COURSES.length}`);
