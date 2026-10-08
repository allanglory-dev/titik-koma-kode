import { Link, useParams } from "react-router-dom";

import { api } from "../api";
import { countDone, isLessonDone } from "../progress";
import { useFetch } from "../useFetch";

export function CoursePage() {
  const { courseSlug } = useParams();

  const { data, error, loading } = useFetch(
    () => Promise.all([api.getCourse(courseSlug), api.getLessons(courseSlug)]),
    [courseSlug]
  );

  if (loading) {
    return <div className="state">memuat…</div>;
  }

  if (error) {
    return <div className="state error">Kursus tidak ditemukan.</div>;
  }

  const [course, lessons] = data;
  const done = countDone(courseSlug, lessons);
  const persen = lessons.length ? Math.round((done / lessons.length) * 100) : 0;
  const lanjut =
    lessons.find((l) => !isLessonDone(courseSlug, l.slug)) ?? lessons[0];

  return (
    <main className="reader">
      <span className="chapter-mark">{course.level}</span>
      <h1>{course.title}</h1>
      <p className="lead">{course.description}</p>

      {lessons.length === 0 ? (
        <p className="progress-label">materi sedang disusun</p>
      ) : (
        <>
          <div className="progress">
            <div style={{ width: `${persen}%` }} />
          </div>
          <p className="progress-label">
            {done} dari {lessons.length} bagian selesai
          </p>

          <p style={{ margin: "28px 0 56px" }}>
            <Link
              className="btn"
              to={`/kursus/${courseSlug}/pelajaran/${lanjut.slug}`}
            >
              {done > 0 ? "Lanjutkan" : "Mulai"} →
            </Link>
          </p>

          <div className="shelf-head">
            <h2>Daftar bagian</h2>
          </div>

          {lessons.map((lesson, i) => (
            <Link
              key={lesson.slug}
              to={`/kursus/${courseSlug}/pelajaran/${lesson.slug}`}
              className="row"
            >
              <span className="row-num">
                {isLessonDone(courseSlug, lesson.slug)
                  ? "✓"
                  : String(i + 1).padStart(2, "0")}
              </span>
              <span className="row-title">{lesson.title}</span>
              <span className="row-desc">{lesson.summary}</span>
              <span className="row-meta">baca →</span>
            </Link>
          ))}
        </>
      )}

      <p style={{ marginTop: 56 }}>
        <Link className="btn ghost" to="/">
          ← Semua kursus
        </Link>
      </p>
    </main>
  );
}
