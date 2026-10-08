import { Link } from "react-router-dom";

import { api } from "../api";
import { GlyphField } from "../components/GlyphField";
import { useFetch } from "../useFetch";

export function HomePage() {
  const { data, error, loading } = useFetch(() =>
    Promise.all([api.getSubjects(), api.getCourses()])
  );

  if (loading) {
    return <div className="state">memuat…</div>;
  }

  if (error) {
    return (
      <div className="state error">
        Gagal memuat data. Pastikan server backend berjalan di port 8080.
      </div>
    );
  }

  const [subjects, courses] = data;
  const siap = courses.find((course) => course.lessonCount > 0);

  return (
    <main className="wide">
      <header className="cover">
        <GlyphField />
        <div className="cover-isi">
          <span className="chapter-mark">Belajar IT dari nol</span>
          <h1>
            Pelan-pelan, sampai <em>benar-benar</em> paham.
          </h1>
          <p>
            Materi berbahasa Indonesia yang disusun runut. Setiap contoh bisa
            kamu ubah di tempatnya, lalu langsung kamu lihat hasilnya.
          </p>
          {siap && (
            <Link className="btn" to={`/kursus/${siap.slug}`}>
              Mulai dari {siap.title} →
            </Link>
          )}
        </div>
      </header>

      {subjects.map((subject) => {
        const milik = courses.filter((c) => c.subjectId === subject.id);
        return (
          <section key={subject.id} className="shelf">
            <div className="shelf-head">
              <h2>{subject.name}</h2>
              <p>{subject.description}</p>
            </div>

            {milik.map((course, i) => {
              const nomor = String(i + 1).padStart(2, "0");
              const isi = (
                <>
                  <span className="row-num">{nomor}</span>
                  <span className="row-title">{course.title}</span>
                  <span className="row-desc">{course.description}</span>
                  <span className="row-meta">
                    {course.lessonCount > 0
                      ? `${course.level} · ${course.lessonCount} bagian`
                      : "segera"}
                  </span>
                </>
              );

              return course.lessonCount > 0 ? (
                <Link key={course.slug} to={`/kursus/${course.slug}`} className="row">
                  {isi}
                </Link>
              ) : (
                <div key={course.slug} className="row soon">
                  {isi}
                </div>
              );
            })}
          </section>
        );
      })}
    </main>
  );
}
