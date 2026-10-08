import { Link } from "react-router-dom";

import { api } from "../api";
import { useFetch } from "../useFetch";

export function HomePage() {
  const { data, error, loading } = useFetch(() =>
    Promise.all([api.getSubjects(), api.getCourses()])
  );

  if (loading) {
    return <div className="state">Memuat...</div>;
  }

  if (error) {
    return (
      <div className="state error">
        Gagal memuat data. Pastikan server backend sudah berjalan di port 8080.
      </div>
    );
  }

  const [subjects, courses] = data;
  const firstCourse = courses[0];

  return (
    <main className="wide">
      <header className="cover">
        <span className="chapter-mark">Belajar IT dari nol</span>
        <h1>Pelan-pelan, sampai benar-benar paham.</h1>
        <p>
          Materi berbahasa Indonesia yang disusun runut, dengan contoh yang bisa
          langsung kamu ubah sendiri di tempatnya. Gratis, tanpa perlu daftar.
        </p>
        {firstCourse && (
          <Link className="btn" to={`/kursus/${firstCourse.id}`}>
            Mulai dari {firstCourse.title}
          </Link>
        )}
      </header>

      {subjects.map((subject) => {
        const milik = courses.filter((course) => course.subjectId === subject.id);
        return (
          <section key={subject.id} className="shelf">
            <div className="shelf-head">
              <h2>{subject.name}</h2>
              <span className="rule" />
            </div>
            <p className="progress-label">{subject.description}</p>

            <div className="cards">
              {milik.map((course) =>
                course.lessonCount === 0 ? (
                  <div key={course.id} className="card empty">
                    <span className="card-meta">Segera hadir</span>
                    <h3>{course.title}</h3>
                    <p>{course.description}</p>
                  </div>
                ) : (
                  <Link
                    key={course.id}
                    to={`/kursus/${course.id}`}
                    className="card"
                  >
                    <span className="card-meta">
                      {course.level} · {course.lessonCount} pelajaran
                    </span>
                    <h3>{course.title}</h3>
                    <p>{course.description}</p>
                  </Link>
                )
              )}
            </div>
          </section>
        );
      })}
    </main>
  );
}
