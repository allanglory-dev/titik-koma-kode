import { useRef, useState } from "react";

import { jalankan, muatPython } from "../pyodide";

/** Panel latihan Python: kode di kiri, keluarannya di kanan. */
export function PyLab({ initialCode }) {
  const [kode, setKode] = useState(initialCode);
  const [keluaran, setKeluaran] = useState("");
  const [status, setStatus] = useState("siap");
  const textareaRef = useRef(null);

  async function run() {
    setStatus("memuat");
    setKeluaran("");
    try {
      const py = await muatPython((pesan) => setKeluaran(pesan));
      setStatus("jalan");
      setKeluaran("");
      const hasil = await jalankan(py, kode);
      setKeluaran(hasil || "(program selesai tanpa keluaran)");
    } catch (err) {
      setKeluaran(String(err.message || err));
    } finally {
      setStatus("siap");
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      const el = textareaRef.current;
      const start = el.selectionStart;
      setKode(kode.slice(0, start) + "    " + kode.slice(el.selectionEnd));
      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = start + 4;
      });
    }
    if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      run();
    }
  }

  const sibuk = status !== "siap";

  return (
    <div className="lab">
      <div className="lab-bar">
        <span className="lab-name">latihan.py</span>
        <button
          className="lab-reset"
          onClick={() => {
            setKode(initialCode);
            setKeluaran("");
          }}
          disabled={sibuk}
        >
          kembalikan
        </button>
        <button className="lab-run" onClick={run} disabled={sibuk}>
          {status === "memuat" ? "Menyiapkan…" : status === "jalan" ? "Menjalankan…" : "Jalankan"}
        </button>
      </div>

      <div className="lab-body">
        <textarea
          ref={textareaRef}
          value={kode}
          spellCheck={false}
          aria-label="Kode Python"
          onChange={(e) => setKode(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <pre className="lab-keluaran" aria-live="polite">
          {keluaran || "Tekan Jalankan untuk melihat hasilnya."}
        </pre>
      </div>
    </div>
  );
}
