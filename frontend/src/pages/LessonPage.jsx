import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { api } from "../api";
import { BlockView } from "../components/BlockView";
import { isLessonDone, setLessonDone } from "../progress";
import { useFetch } from "../useFetch";

export function LessonPage() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [done, setDone] = useState(false);

  const { data, error, loading } = useFetch(
    () =>
      Promise.all([
        api.getCourse(courseId),
        api.getLessonsByCourse(courseId),
        api.getLesson(lessonId),
        api.getBlocksByLesson(lessonId),
      ]),
    [courseId, lessonId]
  );

  useEffect(() => {
    setDone(isLessonDone(lessonId));
    setSidebarOpen(false);
    window.scrollTo(0, 0);
  }, [lessonId]);

  if (loading) {
    return <div className="state">Memuat...</div>;
  }

  if (error) {
    return <div className="state error">Pelajaran tidak ditemukan.</div>;
  }

  const [course, lessons, lesson, blocks] = data;
  const index = lessons.findIndex((item) => String(item.id) === String(lessonId));
  const previous = lessons[index - 1];
  const next = lessons[index + 1];

  function toggleDone() {
    const value = !done;
    setDone(value);
    setLessonDone(lessonId, value);
  }

  function goNext() {
    if (!done) {
      setDone(true);
      setLessonDone(lessonId, true);
    }
    navigate(
      next
        ? `/kursus/${courseId}/pelajaran/${next.id}`
        : `/kursus/${courseId}`
    );
  }

  return (
    <div className="lesson-layout">
      <aside className={sidebarOpen ? "sidebar open" : "sidebar"}>
        <p className="sidebar-title">{course.title}</p>
        {lessons.map((item) => (
          <Link
            key={item.id}
            to={`/kursus/${courseId}/pelajaran/${item.id}`}
            className={
              String(item.id) === String(lessonId)
                ? "sidebar-link active"
                : "sidebar-link"
            }
          >
            <span className="check">{isLessonDone(item.id) ? "✓" : ""}</span>
            {item.title}
          </Link>
        ))}
      </aside>

      <main className="lesson-main">
        <button
          className="icon-btn menu-btn"
          style={{ marginBottom: 16 }}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Buka daftar pelajaran"
        >
          ☰
        </button>

        <Link to={`/kursus/${courseId}`} className="eyebrow">
          ← {course.title}
        </Link>

        <h1 style={{ marginTop: 12 }}>{lesson.title}</h1>
        {lesson.summary && <p className="lead">{lesson.summary}</p>}

        {blocks.map((block) => (
          <BlockView key={block.id} block={block} />
        ))}

        <p style={{ marginTop: 36 }}>
          <button className="btn ghost" onClick={toggleDone}>
            {done ? "✓ Sudah selesai" : "Tandai selesai"}
          </button>
        </p>

        <nav className="pager">
          {previous ? (
            <Link
              className="btn ghost"
              to={`/kursus/${courseId}/pelajaran/${previous.id}`}
            >
              ← {previous.title}
            </Link>
          ) : (
            <span />
          )}

          <button className="btn" onClick={goNext}>
            {next ? `${next.title} →` : "Selesai ✓"}
          </button>
        </nav>
      </main>
    </div>
  );
}
