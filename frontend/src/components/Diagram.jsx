/**
 * Gambar penjelas berupa SVG.
 *
 * Isinya ditulis sendiri di berkas kurikulum, bukan diambil dari luar, sehingga
 * tidak ada persoalan lisensi dan gambarnya ikut menyesuaikan mode terang atau
 * gelap lewat currentColor.
 *
 * Isi tetap dibersihkan sebelum ditampilkan. Sekarang sumbernya memang berkas
 * milik sendiri, tetapi begitu panel admin memungkinkan orang lain menulis
 * materi, isian itu menjadi masukan yang tidak tepercaya.
 */
function bersihkan(svg) {
  return (
    svg
      // Buang elemen skrip beserta isinya.
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<\/?script[^>]*>/gi, "")
      // Buang penangan kejadian seperti onclick.
      .replace(/\son\w+\s*=\s*"[^"]*"/gi, "")
      .replace(/\son\w+\s*=\s*'[^']*'/gi, "")
      // Buang tautan yang menjalankan kode.
      .replace(/javascript:/gi, "")
  );
}

export function Diagram({ svg, caption }) {
  return (
    <figure className="diagram">
      <div
        className="diagram-gambar"
        // Aman: isinya berasal dari berkas kurikulum dan sudah dibersihkan di atas.
        dangerouslySetInnerHTML={{ __html: bersihkan(svg) }}
      />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
