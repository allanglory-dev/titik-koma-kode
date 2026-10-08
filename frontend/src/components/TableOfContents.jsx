import { useEffect } from "react";
import { Link } from "react-router-dom";

import { isLessonDone } from "../progress";

/** Daftar isi yang muncul sebagai laci dari sisi kanan. */
export function TableOfContents({ course, lessons, currentId, onClose }) {
  useEffect(() => {
    function onKey(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <>
      <div className="toc-backdrop" onClick={onClose} />
      <nav className="toc" aria-label="Daftar isi">
        <div className="toc-head">
          <div>
            <h3>{course.title}</h3>
            <p>{lessons.length} pelajaran</p>
          </div>
          <button
            className="icon-btn"
            onClick={onClose}
            aria-label="Tutup daftar isi"
          >
            ✕
          </button>
        </div>

        {lessons.map((lesson, index) => {
          const done = isLessonDone(lesson.id);
          const current = String(lesson.id) === String(currentId);
          return (
            <Link
              key={lesson.id}
              to={`/kursus/${course.id}/pelajaran/${lesson.id}`}
              onClick={onClose}
              className={["toc-item", current ? "current" : "", done ? "done" : ""]
                .filter(Boolean)
                .join(" ")}
            >
              <span className="toc-num">
                {done ? "✓" : String(index + 1).padStart(2, "0")}
              </span>
              <span className="toc-text">{lesson.title}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
