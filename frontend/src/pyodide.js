/**
 * Pemuat Pyodide, yaitu Python yang dijalankan di dalam browser.
 *
 * Berkasnya besar, sekitar sepuluh megabita, jadi sengaja baru diunduh
 * ketika pembaca benar-benar menekan Jalankan untuk pertama kali.
 * Setelah itu dipakai bersama oleh semua panel di halaman.
 */
const VERSI = "0.26.4";
const CDN = `https://cdn.jsdelivr.net/pyodide/v${VERSI}/full/`;

let pemuatan = null;

function muatSkrip(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const el = document.createElement("script");
    el.src = src;
    el.onload = () => resolve();
    el.onerror = () => reject(new Error("Gagal mengunduh Python. Periksa sambungan internet."));
    document.head.appendChild(el);
  });
}

/** Mengembalikan satu contoh Pyodide, mengunduhnya lebih dulu bila perlu. */
export function muatPython(lapor) {
  if (pemuatan) return pemuatan;

  pemuatan = (async () => {
    lapor?.("mengunduh Python, sekitar 10 MB, hanya sekali…");
    await muatSkrip(CDN + "pyodide.js");

    lapor?.("menyiapkan…");
    return window.loadPyodide({ indexURL: CDN });
  })().catch((err) => {
    // Biarkan percobaan berikutnya mengunduh ulang, jangan kunci selamanya.
    pemuatan = null;
    throw err;
  });

  return pemuatan;
}

/**
 * Menyaring jejak kesalahan agar hanya menyisakan yang berguna bagi pembaca.
 * Pyodide menjalankan kode lewat beberapa lapisan pembungkus, dan baris-baris
 * itu ikut muncul di jejaknya meski tidak ada hubungannya dengan kode pembaca.
 */
function rapikanKesalahan(err) {
  const penuh = String(err.message || err).trimEnd();
  const baris = penuh.split("\n");

  // Baris terakhir yang tidak kosong memuat jenis kesalahan dan penjelasannya.
  const inti = [...baris].reverse().find((b) => b.trim() !== "") ?? penuh;

  // Nomor baris terakhir yang menunjuk ke kode pembaca, bukan bawaan Pyodide.
  let nomor = null;
  let letak = -1;
  baris.forEach((b, i) => {
    const cocok = b.match(/File "<exec>"(?:, line (\d+))?/);
    if (cocok) {
      letak = i;
      if (cocok[1]) nomor = cocok[1];
    }
  });

  // Tanda panah penunjuk hanya berguna bila berasal dari kode pembaca,
  // yaitu bila muncul setelah penanda baris tadi. Pada kesalahan saat
  // program berjalan, panah yang muncul lebih dulu milik lapisan dalam
  // Pyodide dan justru menyesatkan, jadi dibuang.
  const penunjuk = baris
    .slice(letak + 1)
    .filter((b) => b.trim().startsWith("^"));

  const keluar = [];
  if (nomor) keluar.push(`Baris ${nomor}`);
  if (penunjuk.length > 0) keluar.push(penunjuk[penunjuk.length - 1].trimEnd());
  keluar.push(inti.trim());
  return keluar.join("\n");
}

/**
 * Menjalankan kode dan mengembalikan seluruh keluarannya sebagai teks.
 * Pemanggilan input() diarahkan ke kotak isian bawaan browser.
 */
export async function jalankan(py, kode) {
  const baris = [];

  py.setStdout({ batched: (t) => baris.push(t) });
  py.setStderr({ batched: (t) => baris.push(t) });
  py.setStdin({
    stdin: () => window.prompt("Masukan untuk program:") ?? "",
  });

  try {
    await py.runPythonAsync(kode);
  } catch (err) {
    baris.push(rapikanKesalahan(err));
  }

  return baris.join("\n");
}
