import { useEffect, useRef, useState } from "react";

import { ElementTree } from "./ElementTree";

/**
 * Panel latihan. Kode di kiri; di kanan hasilnya atau susunan sarangnya,
 * tergantung tab yang dipilih.
 */
export function TryIt({ initialCode }) {
  const [code, setCode] = useState(initialCode);
  const [preview, setPreview] = useState(initialCode);
  const [tab, setTab] = useState("hasil");
  const textareaRef = useRef(null);

  useEffect(() => {
    setCode(initialCode);
    setPreview(initialCode);
  }, [initialCode]);

  function handleKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      const el = textareaRef.current;
      const start = el.selectionStart;
      setCode(code.slice(0, start) + "  " + code.slice(el.selectionEnd));
      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = start + 2;
      });
    }
    if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      setPreview(code);
    }
  }

  return (
    <div className="lab">
      <div className="lab-bar" role="tablist">
        <span className="lab-name">latihan.html</span>

        <button
          className="lab-tab"
          role="tab"
          aria-selected={tab === "hasil"}
          onClick={() => setTab("hasil")}
        >
          hasil
        </button>
        <button
          className="lab-tab"
          role="tab"
          aria-selected={tab === "struktur"}
          onClick={() => setTab("struktur")}
        >
          struktur
        </button>

        <button
          className="lab-reset"
          onClick={() => {
            setCode(initialCode);
            setPreview(initialCode);
          }}
        >
          kembalikan
        </button>
        <button className="lab-run" onClick={() => setPreview(code)}>
          Jalankan
        </button>
      </div>

      <div className="lab-body">
        <textarea
          ref={textareaRef}
          value={code}
          spellCheck={false}
          aria-label="Kode HTML"
          onChange={(event) => setCode(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        {tab === "hasil" ? (
          <iframe title="Hasil" srcDoc={preview} sandbox="allow-scripts" />
        ) : (
          <ElementTree html={code} />
        )}
      </div>
    </div>
  );
}
