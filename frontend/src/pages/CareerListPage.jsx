import { Link } from "react-router-dom";

import { api } from "../api";
import { useFetch } from "../useFetch";

export function CareerListPage() {
  const { data, error, loading } = useFetch(() => api.getCareers());

  if (loading) {
    return <div className="state">memuat…</div>;
  }

  if (error) {
    return (
      <div className="state error">
        Gagal memuat jalur karier. Pastikan server backend berjalan di port 8080.
      </div>
    );
  }

  return (
    <main className="wide">
      <header style={{ marginBottom: 52 }}>
        <span className="chapter-mark">Setelah lulus, mau ke mana</span>
        <h1 style={{ maxWidth: "18ch" }}>
          Sepuluh jalur, <em>satu</em> kurikulum.
        </h1>
        <p className="lead" style={{ maxWidth: "48ch" }}>
          Tiap jalur menyebut mata kuliah mana yang menyiapkanmu untuk itu, apa
          yang perlu dipelajari di luar kampus, dan berapa lama kira-kira
          waktunya. Kamu tidak perlu memilih sekarang.
        </p>
      </header>

      {data.map((p) => (
        <Link key={p.slug} to={`/karier/${p.slug}`} className="row">
          <span className="row-num">{p.code}</span>
          <span className="row-title">{p.name}</span>
          <span className="row-desc">{p.tagline}</span>
          <span className="row-meta">
            {p.demand} · masuk {p.entry}
          </span>
        </Link>
      ))}

      <p className="progress-label" style={{ marginTop: 40, maxWidth: "52ch" }}>
        Keterangan permintaan dan tingkat kesulitan masuk disusun dari pengamatan
        lowongan serta rujukan yang tercantum di tiap halaman. Keduanya gambaran
        umum, bukan jaminan.
      </p>
    </main>
  );
}
