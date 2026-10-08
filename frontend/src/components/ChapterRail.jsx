import { Link } from "react-router-dom";

import { isLessonDone } from "../progress";

/** Penunjuk bab di sisi kiri: nomor mono, garis kunyit menandai yang sedang dibaca. */
export function ChapterRail({ course, lessons, currentSlug }) {
  return (
    <nav className="chapters" aria-label="Daftar bab">
      <p className="chapters-title">{course.title}</p>

      {lessons.map((lesson, index) => {
        const done = isLessonDone(course.slug, lesson.slug);
        const current = lesson.slug === currentSlug;
        return (
          <Link
            key={lesson.slug}
            to={`/kursus/${course.slug}/pelajaran/${lesson.slug}`}
            className={["step", current ? "current" : "", done ? "done" : ""]
              .filter(Boolean)
              .join(" ")}
            aria-current={current ? "page" : undefined}
          >
            <span className="step-dot">{done ? "✓" : index + 1}</span>
            <span>{lesson.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}
