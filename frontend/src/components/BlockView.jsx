import { TryIt } from "./TryIt";

/**
 * Mengubah teks bertanda backtick menjadi potongan kode.
 * Contoh: "Pakai `<p>` untuk paragraf." -> kata <p> tampil sebagai kode.
 */
function withInlineCode(text) {
  return text.split("`").map((part, index) =>
    index % 2 === 1 ? <code key={index}>{part}</code> : part
  );
}

/** Menampilkan satu blok isi sesuai jenisnya. */
export function BlockView({ block }) {
  switch (block.type) {
    case "TEXT":
      return <p className="block-text">{withInlineCode(block.content)}</p>;

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
        <div className="block-note">
          <span aria-hidden="true">💡</span>
          <span>{withInlineCode(block.content)}</span>
        </div>
      );

    case "MATH":
      return <div className="block-math">{block.content}</div>;

    default:
      return <p className="block-text">{block.content}</p>;
  }
}
