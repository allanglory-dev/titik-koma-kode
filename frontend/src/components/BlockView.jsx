import { TryIt } from "./TryIt";

/** Menampilkan satu blok isi sesuai jenisnya. */
export function BlockView({ block }) {
  switch (block.type) {
    case "TEXT":
      return <p className="block-text">{block.content}</p>;

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
          <span>{block.content}</span>
        </div>
      );

    case "MATH":
      return <div className="block-math">{block.content}</div>;

    default:
      return <p className="block-text">{block.content}</p>;
  }
}
