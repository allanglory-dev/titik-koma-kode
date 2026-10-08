import { useState } from "react";
import { Link } from "react-router-dom";

import { api } from "../api";
import { GlyphField } from "../components/GlyphField";
import { useFetch } from "../useFetch";

/**
 * Semester tetap dipakai di balik layar untuk mengurutkan topik,
 * tapi yang tampil adalah tahap dengan nama yang lebih manusiawi.
 */
const TAHAP = [
  {
    nama: "Mulai dari sini",
    catatan: "Dasar yang dipakai hampir semua topik setelahnya.",
    semester: [1, 2],
  },
  {
    nama: "Setelah dasarnya kuat",
    catatan: "Topik yang biasanya paling bikin nyangkut.",
    semester: [3, 4],
  },
  {
    nama: "Pendalaman",
    catatan: "Pilih yang sesuai arah yang kamu tuju.",
    semester: [5, 6],
  },
  {
    nama: "Penutup",
    catatan: "Menyatukan semuanya jadi sesuatu yang utuh.",
    semester: [7, 8],
  },
];

function BarisTopik({ course, nomor }) {
  const siap = course.lessonCount > 0;
  const isi = (
    <>
      <span className="row-num">{nomor}</span>
      <span className="row-title">{course.title}</span>
      <span className="row-desc">{course.description}</span>
      <span className="row-meta">
        {siap ? `sekitar ${course.hours} jam` : "belum ada isinya"}
      </span>
    </>
  );

  return siap ? (
    <Link to={`/kursus/${course.slug}`} className="row">
      {isi}
    </Link>
  ) : (
    <div className="row soon">{isi}</div>
  );
}

export function HomePage() {
  const [semester, setSemester] = useState(null);
  const { data, error, loading } = useFetch(() => api.getCourses());

  if (loading) {
    return <div className="state">memuat…</div>;
  }

  if (error) {
    return (
      <div className="state error">
        Gagal memuat daftar topik. Pastikan server backend berjalan di port 8080.
      </div>
    );
  }

  const courses = data;
  const adaIsi = courses.filter((c) => c.lessonCount > 0);
  const semesters = [...new Set(courses.map((c) => c.semester))].sort((a, b) => a - b);

  return (
    <main className="wide">
      <header className="cover">
        <GlyphField />
        <div className="cover-isi">
          <span className="chapter-mark">Untuk anak Informatika</span>
          <h1>
            Kuliah Informatika nggak harus <em>bikin pusing.</em>
          </h1>
          <p>
            Materi yang sering bikin nyangkut, dijelaskan pelan-pelan dalam
            bahasa Indonesia, dan bisa kamu utak-atik sendiri sambil baca.
          </p>
          {adaIsi[0] && (
            <Link className="btn" to={`/kursus/${adaIsi[0].slug}`}>
              Lihat contohnya: {adaIsi[0].title} →
            </Link>
          )}
        </div>
      </header>

      <div className="saring">
        <span className="saring-tanya">Lagi semester berapa?</span>
        <button
          className={semester === null ? "aktif" : ""}
          onClick={() => setSemester(null)}
        >
          semua
        </button>
        {semesters.map((s) => (
          <button
            key={s}
            className={semester === s ? "aktif" : ""}
            onClick={() => setSemester(s)}
          >
            {s}
          </button>
        ))}
      </div>

      {semester !== null ? (
        <section className="shelf">
          <div className="shelf-head">
            <h2>Semester {semester}</h2>
            <p>{courses.filter((c) => c.semester === semester).length} topik</p>
          </div>
          {courses
            .filter((c) => c.semester === semester)
            .map((course, i) => (
              <BarisTopik
                key={course.code}
                course={course}
                nomor={String(i + 1).padStart(2, "0")}
              />
            ))}
        </section>
      ) : (
        TAHAP.map((tahap) => {
          const milik = courses.filter((c) => tahap.semester.includes(c.semester));
          if (milik.length === 0) return null;
          return (
            <section key={tahap.nama} className="shelf">
              <div className="shelf-head">
                <h2>{tahap.nama}</h2>
                <p>{milik.length} topik</p>
              </div>
              <p className="area-desc">{tahap.catatan}</p>
              {milik.map((course, i) => (
                <BarisTopik
                  key={course.code}
                  course={course}
                  nomor={String(i + 1).padStart(2, "0")}
                />
              ))}
            </section>
          );
        })
      )}
    </main>
  );
}
