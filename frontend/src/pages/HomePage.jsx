import { Link } from "react-router-dom";

import { api } from "../api";
import { useFetch } from "../useFetch";

function SubjectGroup({ subject }) {
  const { data: courses, loading } = useFetch(
    () => api.getCoursesBySubject(subject.id),
    [subject.id]
  );

  return (
    <section className="subject-group">
      <h2>{subject.name}</h2>
      <p className="lead">{subject.description}</p>

      {loading && <p className="progress-label">Memuat kursus...</p>}

      <div className="card-grid">
        {(courses ?? []).map((course) => (
          <Link key={course.id} to={`/kursus/${course.id}`} className="card">
            <span className="tag">{course.level}</span>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function HomePage() {
  const { data: subjects, error, loading } = useFetch(() => api.getSubjects());

  if (loading) {
    return <div className="state">Memuat...</div>;
  }

  if (error) {
    return (
      <div className="state error">
        Gagal memuat data. Pastikan server backend sudah jalan di port 8080.
      </div>
    );
  }

  return (
    <main className="page">
      <h1>Belajar IT dari nol</h1>
      <p className="lead">
        Materi singkat berbahasa Indonesia, langsung bisa dicoba sendiri. Gratis
        dan tanpa perlu daftar.
      </p>

      {subjects.map((subject) => (
        <SubjectGroup key={subject.id} subject={subject} />
      ))}
    </main>
  );
}
