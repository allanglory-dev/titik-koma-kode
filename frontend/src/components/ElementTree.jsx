const VOID_TAGS = new Set([
  "area", "base", "br", "col", "embed", "hr", "img", "input",
  "link", "meta", "source", "track", "wbr",
]);

/**
 * Membaca kode HTML lalu menyusun daftar barisnya sebagai pohon.
 * Dipakai untuk memperlihatkan susunan sarang yang sedang ditulis.
 */
function buildRows(html) {
  let doc;
  try {
    doc = new DOMParser().parseFromString(html, "text/html");
  } catch {
    return [];
  }

  const rows = [];

  function walk(node, depth) {
    for (const child of node.childNodes) {
      if (child.nodeType === Node.ELEMENT_NODE) {
        const tag = child.tagName.toLowerCase();
        rows.push({ depth, tag, void: VOID_TAGS.has(tag) });
        if (!VOID_TAGS.has(tag)) {
          walk(child, depth + 1);
        }
      } else if (child.nodeType === Node.TEXT_NODE) {
        const text = child.textContent.trim();
        if (text) {
          rows.push({ depth, text });
        }
      }
      if (rows.length > 200) return;
    }
  }

  // Kode potongan selalu dibungkus DOMParser ke dalam <html><body>.
  // Mulai dari <html> kalau penulis memang menulis kerangka lengkap.
  const start = /<html[\s>]/i.test(html) ? doc.documentElement.parentNode : doc.body;
  walk(start, 0);
  return rows;
}

export function ElementTree({ html }) {
  const rows = buildRows(html);

  if (rows.length === 0) {
    return (
      <div className="tree">
        <span className="tree-text">Belum ada elemen.</span>
      </div>
    );
  }

  return (
    <div className="tree">
      {rows.map((row, i) => (
        <div className="tree-row" key={i}>
          {"  ".repeat(row.depth)}
          {row.tag ? (
            <>
              <span className="tree-tag">&lt;{row.tag}&gt;</span>
              {row.void && <span className="tree-void"> elemen kosong</span>}
            </>
          ) : (
            <span className="tree-text">
              "{row.text.length > 42 ? row.text.slice(0, 42) + "…" : row.text}"
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
