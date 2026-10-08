import { useState } from "react";
import { Link } from "react-router-dom";

import { api } from "../api";
import { GlyphField } from "../components/GlyphField";
import { useFetch } from "../useFetch";

function KartuMataKuliah({ course }) {
  const siap = course.lessonCount > 0;
  const isi = (
    <>
      <span className="row-num">{course.code}</span>
      <span className="row-title">{course.title}</span>
      <span className="row-desc">{course.description}</span>
      <span className="row-meta">
        {course.sks} SKS · {course.areaCode}
        {siap ? "" : " · segera"}
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
  const [tampilan, setTampilan] = useState("semester");
  const { data, error, loading } = useFetch(() =>
    Promise.all([api.getCourses(), api.getAreas()])
  );

  if (loading) {
    return <div className="state">memuat…</div>;
  }

  if (error) {
    return (
      <div className="state error">
        Gagal memuat kurikulum. Pastikan server backend berjalan di port 8080.
      </div>
    );
  }

  const [courses, areas] = data;
  const totalSks = courses.reduce((n, c) => n + c.sks, 0);
  const siap = courses.find((c) => c.lessonCount > 0);
  const semesters = [...new Set(courses.map((c) => c.semester))].sort((a, b) => a - b);

  return (
    <main className="wide">
      <header className="cover">
        <GlyphField />
        <div className="cover-isi">
          <span className="chapter-mark">Kurikulum Informatika</span>
          <h1>
            Empat tahun ilmu komputer, <em>tanpa</em> uang kuliah.
          </h1>
          <p>
            {courses.length} mata kuliah, {totalSks} SKS, delapan semester.
            Disusun mengikuti pembagian bidang CS2023 dari ACM dan IEEE, dengan
            pola semester seperti program sarjana Informatika di Indonesia.
          </p>
          {siap && (
            <Link className="btn" to={`/kursus/${siap.slug}`}>
              Mulai dari {siap.title} →
            </Link>
          )}
        </div>
      </header>

      <div className="switch">
        <button
          className={tampilan === "semester" ? "aktif" : ""}
          onClick={() => setTampilan("semester")}
        >
          per semester
        </button>
        <button
          className={tampilan === "bidang" ? "aktif" : ""}
          onClick={() => setTampilan("bidang")}
        >
          per bidang
        </button>
      </div>

      {tampilan === "semester"
        ? semesters.map((semester) => {
            const milik = courses.filter((c) => c.semester === semester);
            const sks = milik.reduce((n, c) => n + c.sks, 0);
            return (
              <section key={semester} className="shelf">
                <div className="shelf-head">
                  <h2>Semester {semester}</h2>
                  <p>
                    {milik.length} mata kuliah · {sks} SKS
                  </p>
                </div>
                {milik.map((course) => (
                  <KartuMataKuliah key={course.code} course={course} />
                ))}
              </section>
            );
          })
        : areas.map((area) => {
            const milik = courses.filter((c) => c.areaCode === area.code);
            if (milik.length === 0) return null;
            return (
              <section key={area.code} className="shelf">
                <div className="shelf-head">
                  <h2>
                    {area.code} · {area.name}
                  </h2>
                  <p>{milik.length} mata kuliah</p>
                </div>
                <p className="area-desc">{area.description}</p>
                {milik.map((course) => (
                  <KartuMataKuliah key={course.code} course={course} />
                ))}
              </section>
            );
          })}
    </main>
  );
}
