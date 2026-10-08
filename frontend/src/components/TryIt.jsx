import { useEffect, useRef, useState } from "react";

/** Editor kecil dengan hasil yang langsung tampil di sebelahnya. */
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
    <div className="tryit">
      <div className="tryit-head">
        <span>Coba Sendiri</span>
        <span style={{ display: "flex", gap: 8 }}>
          <button
            className="btn ghost small"
            onClick={() => {
              setCode(initialCode);
              setPreview(initialCode);
            }}
          >
            Reset
          </button>
          <button className="btn small" onClick={() => setPreview(code)}>
            Jalankan
          </button>
        </span>
      </div>
      <div className="tryit-body">
        <textarea
          ref={textareaRef}
          value={code}
          spellCheck={false}
          onChange={(event) => setCode(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <iframe title="Hasil" srcDoc={preview} sandbox="allow-scripts" />
      </div>
    </div>
  );
}
