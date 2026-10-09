import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { api } from "../api";
import { BlockView } from "../components/BlockView";
import { ChapterRail } from "../components/ChapterRail";
import { TableOfContents } from "../components/TableOfContents";
import { isLessonDone, setLessonDone } from "../progress";
import { useFetch } from "../useFetch";

export function LessonPage() {
  const { courseSlug, lessonSlug } = useParams();
  const navigate = useNavigate();

  const [tocOpen, setTocOpen] = useState(false);
  const [done, setDone] = useState(false);

  const { data, error, loading } = useFetch(
    () =>
      Promise.all([
        api.getCourse(courseSlug),
        api.getLessons(courseSlug),
        api.getLesson(courseSlug, lessonSlug),
        api.getBlocks(courseSlug, lessonSlug),
      ]),
    [courseSlug, lessonSlug]
  );

  useEffect(() => {
    setDone(isLessonDone(courseSlug, lessonSlug));
    setTocOpen(false);
    window.scrollTo(0, 0);
  }, [courseSlug, lessonSlug]);

  if (loading) {
    return <div className="state">memuat…</div>;
  }

  if (error) {
    return <div className="state error">Pelajaran tidak ditemukan.</div>;
  }

  const [course, lessons, lesson, blocks] = data;
  const index = lessons.findIndex((item) => item.slug === lessonSlug);
  const previous = lessons[index - 1];
  const next = lessons[index + 1];

  function toggleDone() {
    const value = !done;
    setDone(value);
    setLessonDone(courseSlug, lessonSlug, value);
  }

  function goNext() {
    if (!done) {
      setDone(true);
      setLessonDone(courseSlug, lessonSlug, true);
    }
    navigate(
      next
        ? `/kursus/${courseSlug}/pelajaran/${next.slug}`
        : `/kursus/${courseSlug}`
    );
  }

  return (
    <>
      <div className="lesson">
        <ChapterRail course={course} lessons={lessons} currentSlug={lessonSlug} />

        <article className="lesson-body">
          <span className="chapter-mark">
            Bagian {String(index + 1).padStart(2, "0")} dari{" "}
            {String(lessons.length).padStart(2, "0")}
          </span>

          <h1>{lesson.title}</h1>
          {lesson.summary && <p className="lead">{lesson.summary}</p>}

          {blocks.map((block, i) => (
            <BlockView
              key={block.id}
              block={block}
              taskNumber={
                blocks.slice(0, i + 1).filter((b) => b.type === "TASK").length
              }
            />
          ))}

          <footer className="endnote">
            <button className="btn ghost" onClick={toggleDone}>
              {done ? "✓ Sudah dibaca" : "Tandai sudah dibaca"}
            </button>

            <div className="turn-page">
              {previous ? (
                <Link
                  className="turn"
                  to={`/kursus/${courseSlug}/pelajaran/${previous.slug}`}
                >
                  <span className="turn-label">← Sebelumnya</span>
                  <span className="turn-title">{previous.title}</span>
                </Link>
              ) : (
                <Link className="turn" to={`/kursus/${courseSlug}`}>
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
          currentSlug={lessonSlug}
          onClose={() => setTocOpen(false)}
        />
      )}
    </>
  );
}
