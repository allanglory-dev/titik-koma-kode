import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { api } from "../api";
import { BlockView } from "../components/BlockView";
import { ChapterRail } from "../components/ChapterRail";
import { TableOfContents } from "../components/TableOfContents";
import { countDone, isLessonDone, setLessonDone } from "../progress";
import { useFetch } from "../useFetch";

export function LessonPage() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();

  const [tocOpen, setTocOpen] = useState(false);
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
    setTocOpen(false);
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

  // Dibaca ulang tiap render; menekan tombol memicu render sehingga angkanya ikut segar.
  const selesai = countDone(lessons);
  const persen = lessons.length ? Math.round((selesai / lessons.length) * 100) : 0;

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
      next ? `/kursus/${courseId}/pelajaran/${next.id}` : `/kursus/${courseId}`
    );
  }

  return (
    <>
      <div className="lesson">
        <ChapterRail course={course} lessons={lessons} currentId={lessonId} />

        <article className="lesson-body">
          <span className="chapter-mark">
            Bagian {String(index + 1).padStart(2, "0")} dari{" "}
            {String(lessons.length).padStart(2, "0")}
          </span>

          <h1>{lesson.title}</h1>
          {lesson.summary && <p className="lead">{lesson.summary}</p>}

          {blocks.map((block) => (
            <BlockView key={block.id} block={block} />
          ))}

          <footer className="endnote">
            <button className="btn ghost" onClick={toggleDone}>
              {done ? "✓ Sudah dibaca" : "Tandai sudah dibaca"}
            </button>

            <div className="turn-page">
              {previous ? (
                <Link
                  className="turn"
                  to={`/kursus/${courseId}/pelajaran/${previous.id}`}
                >
                  <span className="turn-label">← Sebelumnya</span>
                  <span className="turn-title">{previous.title}</span>
                </Link>
              ) : (
                <Link className="turn" to={`/kursus/${courseId}`}>
                  <span className="turn-label">← Kembali</span>
                  <span className="turn-title">{course.title}</span>
                </Link>
              )}

              <button className="turn next" onClick={goNext}>
                <span className="turn-label">
                  {next ? "Selanjutnya →" : "Selesai →"}
                </span>
                <span className="turn-title">
                  {next ? next.title : "Tutup bagian ini"}
                </span>
              </button>
            </div>
          </footer>
        </article>

        <aside className="aside-rail">
          <div className="rail-card">
            <p className="rail-label">Kemajuanmu</p>
            <p className="rail-big">
              {selesai}
              <span> / {lessons.length}</span>
            </p>
            <div className="progress">
              <div style={{ width: `${persen}%` }} />
            </div>
            <button
              className="btn ghost small"
              style={{ width: "100%", justifyContent: "center", marginTop: 4 }}
              onClick={toggleDone}
            >
              {done ? "✓ Sudah dibaca" : "Tandai sudah dibaca"}
            </button>
          </div>

          {next && (
            <Link
              className="rail-card rail-next"
              to={`/kursus/${courseId}/pelajaran/${next.id}`}
            >
              <p className="rail-label">Selanjutnya</p>
              <span className="turn-title">{next.title}</span>
            </Link>
          )}
        </aside>
      </div>

      <button
        className="btn toc-trigger"
        onClick={() => setTocOpen(true)}
        aria-label="Buka daftar isi"
      >
        ☰ Daftar isi
      </button>

      {tocOpen && (
        <TableOfContents
          course={course}
          lessons={lessons}
          currentId={lessonId}
          onClose={() => setTocOpen(false)}
        />
      )}
    </>
  );
}
