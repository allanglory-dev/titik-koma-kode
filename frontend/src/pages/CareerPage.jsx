import { Link, useParams } from "react-router-dom";

import { api } from "../api";
import { useFetch } from "../useFetch";

/** Mengubah daftar kode mata kuliah menjadi tautan ke halaman topiknya. */
function DaftarMataKuliah({ kode, semua }) {
  if (kode.length === 0) {
    return <p className="progress-label">Tidak ada</p>;
  }
  return (
    <div>
      {kode.map((k) => {
        const c = semua.find((x) => x.code === k);
        if (!c) return null;
        return (
          <Link key={k} to={`/kursus/${c.slug}`} className="row">
            <span className="row-num">
              {c.lessonCount > 0 ? "siap" : "—"}
            </span>
            <span className="row-title">{c.title}</span>
            <span className="row-desc">{c.description}</span>
            <span className="row-meta">Semester {c.semester}</span>
          </Link>
        );
      })}
    </div>
  );
}

export function CareerPage() {
  const { careerSlug } = useParams();

  const { data, error, loading } = useFetch(
    () => Promise.all([api.getCareer(careerSlug), api.getCourses()]),
    [careerSlug]
  );

  if (loading) {
    return <div className="state">memuat…</div>;
  }

  if (error) {
    return <div className="state error">Jalur karier tidak ditemukan.</div>;
  }

  const [path, courses] = data;
  const siap = path.coreCourses.filter(
    (k) => (courses.find((c) => c.code === k)?.lessonCount ?? 0) > 0
  ).length;

  return (
    <main className="reader">
      <span className="chapter-mark">
        Permintaan {path.demand} · Masuk {path.entry}
      </span>
      <h1>{path.name}</h1>
      <p className="lead">{path.tagline}</p>

      <p className="block-text">{path.description}</p>

      <h2>Sehari-hari mengerjakan apa</h2>
      <p className="block-text">{path.daily}</p>

      <aside className="block-note">
        <span className="block-note-label">Gaji</span>
        {path.salary}
      </aside>

      <h2>Tahapannya</h2>
      <p className="progress-label" style={{ marginBottom: 20 }}>
        Perkiraan waktu dihitung untuk belajar sambil kuliah, bukan penuh waktu.
      </p>

      {path.stages.map((s, i) => (
        <section key={i} className="tahap">
          <div className="tahap-kepala">
            <span className="tahap-num">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3>{s.name}</h3>
              <p className="tahap-catatan">{s.note}</p>
            </div>
            <span className="tahap-lama">{s.duration}</span>
          </div>
          <ul className="tahap-isi">
            {s.items.map((x, j) => (
              <li key={j}>{x}</li>
            ))}
          </ul>
        </section>
      ))}

      <h2>Mata kuliah yang menyiapkanmu</h2>
      <p className="progress-label" style={{ marginBottom: 18 }}>
        {siap} dari {path.coreCourses.length} mata kuliah inti sudah ada
        materinya di sini.
      </p>
      <DaftarMataKuliah kode={path.coreCourses} semua={courses} />

      <h2>Pendukung</h2>
      <DaftarMataKuliah kode={path.supportCourses} semua={courses} />

      <h2>Di luar kurikulum</h2>
      <p className="progress-label" style={{ marginBottom: 14 }}>
        Perkakas dan kemampuan yang dituntut industri tapi jarang diajarkan di
        kelas. Ini yang perlu kamu kejar sendiri.
      </p>
      <ul className="tahap-isi" style={{ marginLeft: 0 }}>
        {path.beyondCurriculum.map((x, i) => (
          <li key={i}>{x}</li>
        ))}
      </ul>

      {path.references.length > 0 && (
        <>
          <h2>Sumber</h2>
          <ol className="sumber">
            {path.references.map((r, i) => (
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
        <Link className="btn ghost" to="/karier">
          ← Semua jalur karier
        </Link>
      </p>
    </main>
  );
}
