import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

function readTheme() {
  try {
    return localStorage.getItem("titikkoma-tema");
  } catch {
    return null;
  }
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
          Titik Koma Kode
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
      <Outlet />
    </>
  );
}
