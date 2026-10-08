import { TryIt } from "./TryIt";

/**
 * Mengubah penanda sederhana di dalam teks materi menjadi elemen:
 *   `kode`      -> potongan kode
 *   **penting** -> teks tebal
 * Sengaja dibatasi dua penanda ini saja supaya isi materi tetap mudah ditulis.
 */
function format(text) {
  const hasil = [];

  // Pecah dulu pada backtick; bagian berindeks ganjil adalah kode.
  text.split("`").forEach((bagian, i) => {
    if (i % 2 === 1) {
      hasil.push(<code key={`k${i}`}>{bagian}</code>);
      return;
    }
    // Di luar kode, kenali penanda tebal.
    bagian.split("**").forEach((potong, j) => {
      if (potong === "") return;
      hasil.push(
        j % 2 === 1 ? <strong key={`t${i}-${j}`}>{potong}</strong> : potong
      );
    });
  });

  return hasil;
}

/** Menampilkan satu blok isi sesuai jenisnya. */
export function BlockView({ block }) {
  switch (block.type) {
    case "TEXT":
      return <p className="block-text">{format(block.content)}</p>;

    case "CODE":
      return block.language === "html" ? (
        <TryIt initialCode={block.content} />
      ) : (
        <pre className="code">
          <code>{block.content}</code>
        </pre>
      );

    case "NOTE":
      return (
        <aside className="block-note">
          <span className="block-note-label">Catatan</span>
          {format(block.content)}
        </aside>
      );

    case "MATH":
      return <div className="block-math">{block.content}</div>;

    default:
      return <p className="block-text">{block.content}</p>;
  }
}
