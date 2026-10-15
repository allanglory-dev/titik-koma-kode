import { Diagram } from "./Diagram";
import { PyLab } from "./PyLab";
import { TaskBlock } from "./TaskBlock";
import { TryIt } from "./TryIt";

/**
 * Perenderan kecil untuk isi materi. Penanda yang dikenali:
 *   `kode`        potongan kode di tengah kalimat
 *   **penting**   teks tebal
 *   *istilah*     teks miring, dipakai untuk istilah asing
 *   ```           pagar kode beberapa baris
 *   baris kosong  pemisah paragraf
 * Sengaja dibatasi supaya isi materi tetap mudah ditulis dan diperiksa.
 */

/**
 * Satu pemindai untuk ketiga penanda sebaris, dibaca dari kiri ke kanan.
 * Urutan cabangnya menentukan siapa yang menang kalau penandanya bertumpuk:
 *
 *   1. kode  menang lebih dulu, sehingga `sisi ** 2` tetap utuh sebagai kode
 *   2. tebal menang atas miring, sehingga **ini** tidak terbaca sebagai *ini*
 *   3. miring terakhir
 *
 * Isi tebal dan miring dipindai ulang, supaya **judul `kode`** tetap bekerja.
 * Sebelumnya penanda tebal dipisah per potongan di antara tanda kutip balik,
 * sehingga tebal yang memuat kode membuat sisa paragrafnya ikut menebal.
 *
 * Bintang pembuka harus langsung diikuti bukan spasi dan bintang penutup
 * didahului bukan spasi. Syarat itu membuat perkalian seperti 2 ** 10 dan
 * n * n di dalam kalimat biasa tidak ikut terbaca sebagai penanda. Untuk
 * miring, keduanya juga tidak boleh menempel pada huruf, supaya bentuk
 * seperti 2*3*4 dibiarkan apa adanya.
 */
const PENANDA = new RegExp(
  [
    // Tanda ?? pada grup dalam wajib lazy. Dengan ? biasa, grupnya dicoba
    // ada lebih dulu, sehingga **0**, bukan 1, dan **sebelum** terbaca
    // sebagai satu rentang panjang alih-alih dua rentang pendek.
    "`([^`]+)`",
    "\\*\\*(\\S(?:[\\s\\S]*?\\S)??)\\*\\*",
    "(?<![\\w*])\\*(\\S(?:[^*\\n]*?\\S)??)\\*(?![\\w*])",
  ].join("|"),
  "g"
);

function sebaris(teks, kunci) {
  const keluar = [];
  let akhir = 0;
  for (const cocok of teks.matchAll(PENANDA)) {
    if (cocok.index > akhir) keluar.push(teks.slice(akhir, cocok.index));
    const k = `${kunci}-${cocok.index}`;
    if (cocok[1] !== undefined) {
      keluar.push(<code key={k}>{cocok[1]}</code>);
    } else if (cocok[2] !== undefined) {
      keluar.push(<strong key={k}>{sebaris(cocok[2], k)}</strong>);
    } else {
      keluar.push(<em key={k}>{sebaris(cocok[3], k)}</em>);
    }
    akhir = cocok.index + cocok[0].length;
  }
  if (akhir < teks.length) keluar.push(teks.slice(akhir));
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
      if (block.language === "html") {
        return <TryIt initialCode={block.content} />;
      }
      if (block.language === "python") {
        return <PyLab initialCode={block.content} />;
      }
      return (
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

    case "DIAGRAM":
      return <Diagram svg={block.content} caption={block.solution} />;

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
