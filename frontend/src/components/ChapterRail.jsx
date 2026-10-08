import { Link } from "react-router-dom";

import { isLessonDone } from "../progress";

/** Penunjuk bab di sisi kiri: nomor bulat yang disambung satu garis kemajuan. */
export function ChapterRail({ course, lessons, currentId }) {
  return (
    <nav className="chapters" aria-label="Daftar bab">
      <p className="chapters-title">{course.title}</p>

      {lessons.map((lesson, index) => {
        const done = isLessonDone(lesson.id);
        const current = String(lesson.id) === String(currentId);
        return (
          <Link
            key={lesson.id}
            to={`/kursus/${course.id}/pelajaran/${lesson.id}`}
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
