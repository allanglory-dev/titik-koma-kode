import { useState } from "react";
import { Link } from "react-router-dom";

import { api } from "../api";
import { GlyphField } from "../components/GlyphField";
import { useFetch } from "../useFetch";

/**
 * Medan `semester` pada data dipakai sebagai nomor tahap, satu sampai empat.
 * Yang tampil adalah nama tahapnya, bukan angkanya.
 */
const TAHAP = [
  {
    nama: "Matematika dan Data",
    catatan: "Alas yang membuat model bisa dimengerti, bukan sekadar dijalankan.",
    semester: [1],
  },
  {
    nama: "Analisis Data",
    catatan: "Perkakas yang dipakai setiap hari di pekerjaan data.",
    semester: [2],
  },
  {
    nama: "Pembelajaran Mesin dan AI",
    catatan: "Model yang belajar sendiri, dibangun dari dasarnya.",
    semester: [3],
  },
];

/** Bagian di luar urutan tahap. Dipilih sendiri, bukan dilewati berurutan. */
const BEBAS = [
  {
    kind: "UMUM",
    nama: "Umum",
    catatan:
      "Bukan syarat masuk. Ambil yang Anda butuhkan, lewati yang sudah Anda kuasai.",
  },
  {
    kind: "KETERAMPILAN",
    nama: "Modul keterampilan",
    catatan:
      "Perkakas kerja yang dipakai hampir setiap hari begitu Anda bekerja dengan data sungguhan.",
  },
];

function BarisTopik({ course, nomor }) {
  // Bab yang baru punya judul tanpa isi tidak boleh terlihat siap dibaca.
  const ditulis = course.writtenCount ?? 0;
  const siap = ditulis > 0;
  const tuntas = course.lessonCount > 0 && ditulis === course.lessonCount;

  const keterangan = tuntas
    ? `sekitar ${course.hours} jam`
    : siap
    ? `${ditulis} dari ${course.lessonCount} bab siap`
    : course.lessonCount > 0
    ? `${course.lessonCount} bab tersusun, isinya belum ditulis`
    : "belum disusun";

  const isi = (
    <>
      <span className="row-num">{nomor}</span>
      <span className="row-title">{course.title}</span>
      <span className="row-desc">{course.description}</span>
      <span className="row-meta">{keterangan}</span>
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

/** Satu rak topik dengan judul, catatan, dan daftar barisnya. */
function Rak({ judul, catatan, milik }) {
  if (milik.length === 0) return null;
  return (
    <section className="shelf">
      <div className="shelf-head">
        <h2>{judul}</h2>
        <p>{milik.length} topik</p>
      </div>
      {catatan && <p className="area-desc">{catatan}</p>}
      {milik.map((course, i) => (
        <BarisTopik
          key={course.code}
          course={course}
          nomor={String(i + 1).padStart(2, "0")}
        />
      ))}
    </section>
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
  const adaIsi = courses.filter((c) => c.writtenCount > 0);
  // Modul keterampilan tidak punya nomor tahap, jadi jangan sampai
  // memunculkan tombol saring tanpa nama.
  const semesters = [...new Set(courses.map((c) => c.semester))]
    .filter((s) => s != null)
    .sort((a, b) => a - b);

  return (
    <main className="wide">
      <header className="cover">
        <GlyphField />
        <div className="cover-isi">
          <span className="chapter-mark">Data dan kecerdasan buatan</span>
          <h1>
            Belajar data sampai <em>ngerti dalamnya.</em>
          </h1>
          <p>
            Bukan cuma nyalin kode. Dari nol sampai bisa membangun model
            sendiri, dalam bahasa Indonesia. Setiap rumus ada asal-usulnya,
            dan setiap kode bisa Anda jalankan langsung di halaman ini tanpa
            memasang apa pun.
          </p>
          {adaIsi[0] && (
            <Link className="btn" to={`/kursus/${adaIsi[0].slug}`}>
              Lihat contohnya: {adaIsi[0].title} →
            </Link>
          )}
        </div>
      </header>

      <div className="saring">
        <span className="saring-tanya">Lagi di tahap mana?</span>
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
            {TAHAP[s - 1]?.nama ?? s}
          </button>
        ))}
      </div>

      {semester !== null ? (
        <section className="shelf">
          <div className="shelf-head">
            <h2>{TAHAP[semester - 1]?.nama ?? `Tahap ${semester}`}</h2>
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
        <>
          <Rak
            judul={BEBAS[0].nama}
            catatan={BEBAS[0].catatan}
            milik={courses.filter((c) => c.kind === BEBAS[0].kind)}
          />
          {TAHAP.map((tahap) => (
            <Rak
              key={tahap.nama}
              judul={tahap.nama}
              catatan={tahap.catatan}
              milik={courses.filter((c) => tahap.semester.includes(c.semester))}
            />
          ))}
          <Rak
            judul={BEBAS[1].nama}
            catatan={BEBAS[1].catatan}
            milik={courses.filter((c) => c.kind === BEBAS[1].kind)}
          />
        </>
      )}

    </main>
  );
}
