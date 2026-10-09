import { TaskBlock } from "./TaskBlock";
import { TryIt } from "./TryIt";

/**
 * Perenderan kecil untuk isi materi. Penanda yang dikenali:
 *   `kode`        potongan kode di tengah kalimat
 *   **penting**   teks tebal
 *   ```           pagar kode beberapa baris
 *   baris kosong  pemisah paragraf
 * Sengaja dibatasi supaya isi materi tetap mudah ditulis dan diperiksa.
 */
function sebaris(teks, kunci) {
  const keluar = [];
  teks.split("`").forEach((bagian, i) => {
    if (i % 2 === 1) {
      keluar.push(<code key={`${kunci}-k${i}`}>{bagian}</code>);
      return;
    }
    bagian.split("**").forEach((potong, j) => {
      if (potong === "") return;
      keluar.push(
        j % 2 === 1 ? <strong key={`${kunci}-t${i}${j}`}>{potong}</strong> : potong
      );
    });
  });
  return keluar;
}

export function format(teks) {
  const keluar = [];

  // Bagian berindeks ganjil berada di antara sepasang pagar kode.
  teks.split("```").forEach((bagian, i) => {
    if (i % 2 === 1) {
      keluar.push(
        <pre className="code" key={`p${i}`}>
          <code>{bagian.replace(/^\n/, "").replace(/\n$/, "")}</code>
        </pre>
      );
      return;
    }
    bagian
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean)
      .forEach((paragraf, j) => {
        keluar.push(<p key={`a${i}${j}`}>{sebaris(paragraf, `${i}${j}`)}</p>);
      });
  });

  return keluar;
}

/** Menampilkan satu blok isi sesuai jenisnya. */
export function BlockView({ block, taskNumber }) {
  switch (block.type) {
    case "TEXT":
      return <div className="block-text">{format(block.content)}</div>;

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

    case "TASK":
      return (
        <TaskBlock
          nomor={taskNumber}
          content={block.content}
          solution={block.solution}
          format={format}
        />
      );

    default:
      return <div className="block-text">{format(block.content)}</div>;
  }
}
