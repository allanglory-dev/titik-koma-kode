import { useState } from "react";

/**
 * Satu latihan soal. Pembahasannya disembunyikan sampai diminta,
 * supaya pembaca mencoba sendiri lebih dulu.
 */
export function TaskBlock({ nomor, content, solution, format }) {
  const [buka, setBuka] = useState(false);

  return (
    <section className="task">
      <div className="task-head">
        <span className="task-num">Latihan {nomor}</span>
      </div>

      <div className="task-body">{format(content)}</div>

      {solution && (
        <>
          <button
            className="task-toggle"
            onClick={() => setBuka(!buka)}
            aria-expanded={buka}
          >
            {buka ? "Sembunyikan pembahasan" : "Lihat pembahasan"}
          </button>
          {buka && <div className="task-solution">{format(solution)}</div>}
        </>
      )}
    </section>
  );
}
