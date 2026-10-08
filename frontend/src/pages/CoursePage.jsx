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
    return <div className="state error">Mata kuliah tidak ditemukan.</div>;
  }

  const [course, lessons, semua] = data;
  const done = countDone(courseSlug, lessons);
  const persen = lessons.length ? Math.round((done / lessons.length) * 100) : 0;
  const lanjut =
    lessons.find((l) => !isLessonDone(courseSlug, l.slug)) ?? lessons[0];

  const prasyarat = course.prerequisites
    .map((kode) => semua.find((c) => c.code === kode))
    .filter(Boolean);
  const membuka = semua.filter((c) => c.prerequisites.includes(course.code));

  return (
    <main className="reader">
      <span className="chapter-mark">
        {course.code} · Semester {course.semester} · {course.sks} SKS
      </span>
      <h1>{course.title}</h1>
      <p className="lead">{course.description}</p>

      <dl className="fakta">
        <div>
          <dt>Bidang</dt>
          <dd>
            {course.areaCode} · {course.areaName}
          </dd>
        </div>
        <div>
          <dt>Tingkat</dt>
          <dd>{course.level}</dd>
        </div>
        <div>
          <dt>Perkiraan waktu</dt>
          <dd>{course.hours} jam</dd>
        </div>
        <div>
          <dt>Prasyarat</dt>
          <dd>
            {prasyarat.length === 0
              ? "Tidak ada"
              : prasyarat.map((p, i) => (
                  <span key={p.code}>
                    {i > 0 && ", "}
                    <Link to={`/kursus/${p.slug}`}>{p.code}</Link>
                  </span>
                ))}
          </dd>
        </div>
      </dl>

      <h2>Capaian pembelajaran</h2>
      <p className="progress-label" style={{ marginBottom: 14 }}>
        Setelah menuntaskan mata kuliah ini, kamu dapat:
      </p>
      <ol className="capaian">
        {course.outcomes.map((o, i) => (
          <li key={i}>{o}</li>
        ))}
      </ol>

      <h2>Materi</h2>
      {lessons.length === 0 ? (
        <p className="progress-label">
          materi sedang disusun · kurikulum dan capaiannya sudah ditetapkan
        </p>
      ) : (
        <>
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
              {done > 0 ? "Lanjutkan" : "Mulai"} →
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

      {membuka.length > 0 && (
        <>
          <h2>Membuka jalan ke</h2>
          {membuka.map((c) => (
            <Link key={c.code} to={`/kursus/${c.slug}`} className="row">
              <span className="row-num">{c.code}</span>
              <span className="row-title">{c.title}</span>
              <span className="row-desc">{c.description}</span>
              <span className="row-meta">Semester {c.semester}</span>
            </Link>
          ))}
        </>
      )}

      <p style={{ marginTop: 56 }}>
        <Link className="btn ghost" to="/">
          ← Seluruh kurikulum
        </Link>
      </p>
    </main>
  );
}
