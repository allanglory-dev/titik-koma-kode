import { Link, useParams } from "react-router-dom";

import { api } from "../api";
import { countDone, isLessonDone } from "../progress";
import { useFetch } from "../useFetch";

export function CoursePage() {
  const { courseSlug } = useParams();

  const { data, error, loading } = useFetch(
    () =>
      Promise.all([
        api.getCourse(courseSlug),
        api.getLessons(courseSlug),
        api.getCourses(),
      ]),
    [courseSlug]
  );

  if (loading) {
    return <div className="state">memuat…</div>;
  }

  if (error) {
    return <div className="state error">Topik tidak ditemukan.</div>;
  }

  const [course, lessons, semua] = data;
  const done = countDone(courseSlug, lessons);
  const persen = lessons.length ? Math.round((done / lessons.length) * 100) : 0;
  const lanjut =
    lessons.find((l) => !isLessonDone(courseSlug, l.slug)) ?? lessons[0];

  // Prasyarat disimpan sebagai kode, tapi yang ditampilkan judulnya.
  const sebelum = course.prerequisites
    .map((kode) => semua.find((c) => c.code === kode))
    .filter(Boolean);
  const sesudah = semua.filter((c) => c.prerequisites.includes(course.code));

  return (
    <main className="reader">
      <span className="chapter-mark">{course.level}</span>
      <h1>{course.title}</h1>
      <p className="lead">{course.description}</p>

      <div className="fakta-baris">
        <span>Sekitar {course.hours} jam</span>
        <span>·</span>
        <span>
          {sebelum.length === 0 ? (
            "Bisa langsung mulai"
          ) : (
            <>
              Sebaiknya paham dulu:{" "}
              {sebelum.map((p, i) => (
                <span key={p.code}>
                  {i > 0 && ", "}
                  <Link to={`/kursus/${p.slug}`}>{p.title}</Link>
                </span>
              ))}
            </>
          )}
        </span>
      </div>

      <h2>Setelah ini kamu bisa</h2>
      <ol className="capaian">
        {course.outcomes.map((o, i) => (
          <li key={i}>{o}</li>
        ))}
      </ol>

      {lessons.length === 0 ? (
        <>
          <h2>Materi</h2>
          <p className="progress-label">
            belum ada isinya · rangka topiknya sudah ditetapkan
          </p>
        </>
      ) : (
        <>
          <h2>Isi</h2>
          <div className="progress">
            <div style={{ width: `${persen}%` }} />
          </div>
          <p className="progress-label">
            {done} dari {lessons.length} bagian selesai
          </p>

          <p style={{ margin: "26px 0 40px" }}>
            <Link
              className="btn"
              to={`/kursus/${courseSlug}/pelajaran/${lanjut.slug}`}
            >
              {done > 0 ? "Lanjutkan" : "Mulai baca"} →
            </Link>
          </p>

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

      {sesudah.length > 0 && (
        <>
          <h2>Lanjut ke</h2>
          {sesudah.map((c) => (
            <Link key={c.code} to={`/kursus/${c.slug}`} className="row">
              <span className="row-num">→</span>
              <span className="row-title">{c.title}</span>
              <span className="row-desc">{c.description}</span>
              <span className="row-meta">
                {c.lessonCount > 0 ? "siap" : "belum ada isinya"}
              </span>
            </Link>
          ))}
        </>
      )}

      {course.references.length > 0 && (
        <>
          <h2>Sumber</h2>
          <p className="progress-label" style={{ marginBottom: 18 }}>
            Materi topik ini disusun dari sumber berikut.
          </p>
          <ol className="sumber">
            {course.references.map((r, i) => (
              <li key={i}>
                <span className="sumber-judul">
                  {r.url ? (
                    <a href={r.url} target="_blank" rel="noreferrer noopener">
                      {r.title}
                    </a>
                  ) : (
                    r.title
                  )}
                </span>
                {r.author && <span className="sumber-penulis">{r.author}</span>}
                {r.note && <span className="sumber-catatan">{r.note}</span>}
              </li>
            ))}
          </ol>
        </>
      )}

      <p style={{ marginTop: 56 }}>
        <Link className="btn ghost" to="/">
          ← Semua topik
        </Link>
      </p>
    </main>
  );
}
