import { Link, useParams } from "react-router-dom";

import { api } from "../api";
import { countDone, isLessonDone } from "../progress";
import { useFetch } from "../useFetch";

export function CoursePage() {
  const { courseId } = useParams();

  const { data, error, loading } = useFetch(
    () => Promise.all([api.getCourse(courseId), api.getLessonsByCourse(courseId)]),
    [courseId]
  );

  if (loading) {
    return <div className="state">Memuat...</div>;
  }

  if (error) {
    return <div className="state error">Kursus tidak ditemukan.</div>;
  }

  const [course, lessons] = data;
  const done = countDone(lessons);
  const percent = lessons.length ? Math.round((done / lessons.length) * 100) : 0;
  const lanjut = lessons.find((lesson) => !isLessonDone(lesson.id)) ?? lessons[0];

  return (
    <main className="reader">
      <span className="chapter-mark">{course.level}</span>
      <h1>{course.title}</h1>
      <p className="lead">{course.description}</p>

      {lessons.length === 0 ? (
        <p className="progress-label">
          Materi untuk kursus ini sedang disusun. Sabar sebentar ya.
        </p>
      ) : (
        <>
          <div className="progress">
            <div style={{ width: `${percent}%` }} />
          </div>
          <p className="progress-label">
            {done} dari {lessons.length} pelajaran sudah dibaca
          </p>

          <p style={{ margin: "26px 0 0" }}>
            <Link
              className="btn"
              to={`/kursus/${courseId}/pelajaran/${lanjut.id}`}
            >
              {done > 0 ? "Lanjutkan membaca" : "Mulai membaca"}
            </Link>
          </p>

          <h2>Daftar isi</h2>
          <div>
            {lessons.map((lesson, index) => (
              <Link
                key={lesson.id}
                to={`/kursus/${courseId}/pelajaran/${lesson.id}`}
                className={
                  isLessonDone(lesson.id) ? "toc-item done" : "toc-item"
                }
              >
                <span className="toc-num">
                  {isLessonDone(lesson.id)
                    ? "✓"
                    : String(index + 1).padStart(2, "0")}
                </span>
                <span className="toc-text">
                  <strong>{lesson.title}</strong>
                  {lesson.summary && (
                    <span
                      style={{
                        display: "block",
                        fontSize: "14.5px",
                        color: "var(--ink-soft)",
                      }}
                    >
                      {lesson.summary}
                    </span>
                  )}
                </span>
              </Link>
            ))}
          </div>
        </>
      )}

      <footer className="endnote">
        <Link to="/" className="turn" style={{ display: "inline-flex" }}>
          <span className="turn-label">← Kembali</span>
          <span className="turn-title">Semua kursus</span>
        </Link>
      </footer>
    </main>
  );
}
