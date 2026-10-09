import { Link, useParams } from "react-router-dom";

import { api } from "../api";
import { useFetch } from "../useFetch";

/** Satu langkah: kartu kursus di kiri, alasan di kanan. */
function Langkah({ nomor, langkah }) {
  const adaBab = langkah.chapterCount > 0;
  const siap = langkah.writtenCount > 0;
  const tuntas = adaBab && langkah.writtenCount === langkah.chapterCount;

  const kartu = (
    <div className="langkah-kartu">
      <span className="langkah-label">Langkah {nomor}</span>
      <h3>{langkah.courseTitle}</h3>
      <div className="langkah-angka">
        <span>{langkah.courseHours} jam</span>
        <span>{langkah.courseLevel}</span>
        {adaBab && <span>{langkah.chapterCount} bab</span>}
      </div>
      <span className={siap ? "langkah-tanda siap" : "langkah-tanda"}>
        {tuntas
          ? "materi lengkap"
          : siap
          ? `${langkah.writtenCount} dari ${langkah.chapterCount} bab ditulis`
          : adaBab
          ? "bab sudah disusun, isinya belum ditulis"
          : "belum disusun"}
      </span>
    </div>
  );

  return (
    <li className="langkah">
      <span className="langkah-titik">{nomor}</span>
      {siap ? (
        <Link to={`/kursus/${langkah.courseSlug}`} className="langkah-tautan">
          {kartu}
        </Link>
      ) : (
        <div className="langkah-tautan mati">{kartu}</div>
      )}
      <div className="langkah-alasan">
        <h4>{langkah.heading}</h4>
        <p>{langkah.reason}</p>
      </div>
    </li>
  );
}

export function CareerPage() {
  const { careerSlug } = useParams();

  const { data, error, loading } = useFetch(
    () => api.getCareer(careerSlug),
    [careerSlug]
  );

  if (loading) {
    return <div className="state">memuat…</div>;
  }

  if (error) {
    return <div className="state error">Jalur karier tidak ditemukan.</div>;
  }

  const path = data;
  const totalJam = path.stages.reduce((n, s) => n + (s.courseHours ?? 0), 0);
  const siap = path.stages.filter((s) => s.writtenCount > 0).length;

  return (
    <main className="wide">
      <header style={{ maxWidth: "46rem", marginBottom: 56 }}>
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
      </header>

      <div className="shelf-head">
        <h2>Alur belajar</h2>
        <p>
          {path.stages.length} langkah · sekitar {totalJam} jam
        </p>
      </div>
      <p className="progress-label" style={{ margin: "14px 0 32px" }}>
        Urutannya disusun supaya tiap langkah memakai bekal dari langkah
        sebelumnya. {siap} dari {path.stages.length} langkah sudah ada materinya
        di sini.
      </p>

      <ol className="alur">
        {path.stages.map((s, i) => (
          <Langkah key={s.id} nomor={i + 1} langkah={s} />
        ))}
      </ol>

      {path.references.length > 0 && (
        <div style={{ maxWidth: "46rem" }}>
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
        </div>
      )}

      <p style={{ marginTop: 56 }}>
        <Link className="btn ghost" to="/karier">
          ← Semua jalur karier
        </Link>
      </p>
    </main>
  );
}
