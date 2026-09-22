import Link from "next/link";
import type { Course } from "@/lib/types";
import { countLessons } from "@/content/courses";
import { formatDuration } from "@/lib/utils";
import { formatPrice } from "@/config/site.config";

export function CourseCard({ course }: { course: Course }) {
  const lessons = countLessons(course);
  return (
    <article className="surface group flex flex-col overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden bg-cream-200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={course.coverImage}
          alt={`${course.title} — GC Studio`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-50" />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-gold-dark border border-[#E8DEC8] shadow-sm backdrop-blur">
          {course.subtitle}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl text-ink">{course.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/60">
          {course.description}
        </p>
        <dl className="mt-5 grid grid-cols-3 gap-2 border-y border-ink/10 py-4 text-center">
          <Stat k="Módulos" v={String(course.modules.length)} />
          <Stat k="Clases" v={String(lessons)} />
          <Stat k="Video" v={formatDuration(course.videoDurationSeconds).replace(" s", "")} />
        </dl>
        <div className="mt-5 flex items-center justify-between">
          <span className="font-display text-xl text-gold-dark">
            {formatPrice(course.priceArs)}
          </span>
          <Link href={`/cursos/${course.slug}`} className="btn-ghost btn-sm">
            Ver curso
          </Link>
        </div>
      </div>
    </article>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dd className="font-display text-lg text-ink">{v}</dd>
      <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/40">{k}</dt>
    </div>
  );
}
