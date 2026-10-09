import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

function readTheme() {
  try {
    return localStorage.getItem("titikkoma-tema");
  } catch {
    return null;
  }
}

/** Garis tipis di bawah bilah atas yang menunjukkan sejauh mana halaman sudah dibaca. */
function ReadingProgress() {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    function update() {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      setPercent(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return <div className="read-progress" style={{ width: `${percent}%` }} />;
}

export function Layout() {
  const [theme, setTheme] = useState(readTheme);

  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute("data-theme", theme);
      try {
        localStorage.setItem("titikkoma-tema", theme);
      } catch {
        // Penyimpanan tidak tersedia, tema hanya berlaku sampai halaman ditutup.
      }
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, [theme]);

  return (
    <>
      <header className="topbar">
        <Link to="/" className="brand">
          <span className="brand-mark">;</span>
          <span className="brand-name">Titik Koma Kode</span>
        </Link>
        <Link to="/karier" className="topbar-tautan">
          Jalur karier
        </Link>
        <span className="topbar-spacer" />
        <button
          className="icon-btn"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Ganti mode terang atau gelap"
        >
          {theme === "dark" ? "☀" : "☾"}
        </button>
      </header>
      <ReadingProgress />
      <Outlet />
    </>
  );
}
