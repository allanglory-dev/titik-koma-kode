import { Link, useParams } from "react-router-dom";

import { api } from "../api";
import { countDone } from "../progress";
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

  return (
    <main className="page">
      <Link to="/" className="eyebrow">
        ← Semua kursus
      </Link>

      <h1 style={{ marginTop: 12 }}>{course.title}</h1>
      <p className="lead">{course.description}</p>

      <div className="progress">
        <div style={{ width: `${percent}%` }} />
      </div>
      <p className="progress-label">
        {done} dari {lessons.length} pelajaran selesai
      </p>

      {lessons.length > 0 && (
        <p style={{ margin: "24px 0" }}>
          <Link className="btn" to={`/kursus/${courseId}/pelajaran/${lessons[0].id}`}>
            {done > 0 ? "Lanjut belajar" : "Mulai belajar"}
          </Link>
        </p>
      )}

      <h2>Daftar pelajaran</h2>
      <div className="card-grid">
        {lessons.map((lesson, index) => (
          <Link
            key={lesson.id}
            to={`/kursus/${courseId}/pelajaran/${lesson.id}`}
            className="card"
          >
            <h3>
              {index + 1}. {lesson.title}
            </h3>
            <p>{lesson.summary}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
