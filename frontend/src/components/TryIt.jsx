import { useEffect, useRef, useState } from "react";

/** Panel latihan: kode di kiri, hasilnya langsung di kanan. */
export function TryIt({ initialCode }) {
  const [code, setCode] = useState(initialCode);
  const [preview, setPreview] = useState(initialCode);
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
      <div className="lab-bar">
        <span className="lab-dots">
          <span />
          <span />
          <span />
        </span>
        <span className="lab-title">latihan.html</span>
        <span className="lab-actions">
          <button
            className="lab-chip"
            onClick={() => {
              setCode(initialCode);
              setPreview(initialCode);
            }}
          >
            Kembalikan
          </button>
          <button className="lab-chip primary" onClick={() => setPreview(code)}>
            Jalankan
          </button>
        </span>
      </div>

      <div className="lab-body">
        <div className="lab-pane">
          <span className="lab-label">Kode</span>
          <textarea
            ref={textareaRef}
            value={code}
            spellCheck={false}
            onChange={(event) => setCode(event.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="lab-pane">
          <span className="lab-label">Hasil</span>
          <iframe title="Hasil" srcDoc={preview} sandbox="allow-scripts" />
        </div>
      </div>
    </div>
  );
}
