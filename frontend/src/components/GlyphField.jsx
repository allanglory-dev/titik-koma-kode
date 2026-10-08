import { useEffect, useRef } from "react";

/** Tanda baca yang dipakai sehari-hari waktu menulis kode. */
const GLYPHS = ["<", ">", "/", ";", "{", "}", "(", ")", "=", '"', ":", "."];

const CELL = 26;
const BASE_ALPHA = 0.055;
const JANGKAUAN_KURSOR = 150;

/**
 * Latar hidup untuk sampul beranda: kisi tanda baca kode yang
 * berdenyut pelan dan sesekali mengetik ulang dirinya sendiri.
 * Glif di dekat kursor menyala dan berubah menjadi titik koma.
 */
export function GlyphField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const diamSaja = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let kolom = 0;
    let baris = 0;
    let sel = [];
    let lebar = 0;
    let tinggi = 0;
    let rafId = 0;
    let mulai = performance.now();

    const kursor = { x: -9999, y: -9999 };

    function warna() {
      const gaya = getComputedStyle(document.documentElement);
      return {
        nila: gaya.getPropertyValue("--nila").trim() || "#3730d8",
        kunyit: gaya.getPropertyValue("--kunyit").trim() || "#e8a300",
      };
    }

    let palet = warna();

    function susunUlang() {
      const rect = canvas.getBoundingClientRect();
      lebar = rect.width;
      tinggi = rect.height;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(lebar * dpr);
      canvas.height = Math.round(tinggi * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      kolom = Math.ceil(lebar / CELL);
      baris = Math.ceil(tinggi / CELL);

      sel = new Array(kolom * baris);
      for (let i = 0; i < sel.length; i++) {
        sel[i] = {
          glif: GLYPHS[(Math.random() * GLYPHS.length) | 0],
          // Fase acak supaya denyutnya tidak serempak.
          fase: Math.random() * Math.PI * 2,
          // Detik berikutnya glif ini berganti.
          ganti: Math.random() * 9,
        };
      }
    }

    function gambar(waktuDetik) {
      ctx.clearRect(0, 0, lebar, tinggi);
      ctx.font = `14px "JetBrains Mono", ui-monospace, monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let b = 0; b < baris; b++) {
        for (let k = 0; k < kolom; k++) {
          const i = b * kolom + k;
          const s = sel[i];
          const x = k * CELL + CELL / 2;
          const y = b * CELL + CELL / 2;

          if (!diamSaja && waktuDetik > s.ganti) {
            s.glif = GLYPHS[(Math.random() * GLYPHS.length) | 0];
            s.ganti = waktuDetik + 4 + Math.random() * 10;
          }

          // Gelombang lembut yang merambat dari kiri atas ke kanan bawah.
          const gelombang = diamSaja
            ? 0.5
            : 0.5 + 0.5 * Math.sin(s.fase + waktuDetik * 0.5 - (k + b) * 0.18);

          const dx = kursor.x - x;
          const dy = kursor.y - y;
          const jarak = Math.sqrt(dx * dx + dy * dy);
          const dekat = jarak < JANGKAUAN_KURSOR ? 1 - jarak / JANGKAUAN_KURSOR : 0;

          const alpha = BASE_ALPHA + gelombang * 0.05 + dekat * 0.5;

          ctx.globalAlpha = Math.min(alpha, 0.72);
          ctx.fillStyle = dekat > 0.45 ? palet.kunyit : palet.nila;
          ctx.fillText(dekat > 0.45 ? ";" : s.glif, x, y);
        }
      }
      ctx.globalAlpha = 1;
    }

    function langkah(sekarang) {
      gambar((sekarang - mulai) / 1000);
      rafId = requestAnimationFrame(langkah);
    }

    function mainkan() {
      cancelAnimationFrame(rafId);
      // Selalu gambar satu frame secara langsung. Mengubah ukuran kanvas
      // menghapus isinya, dan requestAnimationFrame bisa tertunda, misalnya
      // ketika jendela berada di belakang. Tanpa ini kanvas bisa tertinggal kosong.
      gambar((performance.now() - mulai) / 1000);
      if (!diamSaja && !document.hidden) {
        rafId = requestAnimationFrame(langkah);
      }
    }

    function onResize() {
      susunUlang();
      mainkan();
    }

    function onPointer(event) {
      const rect = canvas.getBoundingClientRect();
      kursor.x = event.clientX - rect.left;
      kursor.y = event.clientY - rect.top;
    }

    function onLeave() {
      kursor.x = -9999;
      kursor.y = -9999;
    }

    function onTheme() {
      palet = warna();
    }

    susunUlang();
    mainkan();

    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", mainkan);

    const pengamatTema = new MutationObserver(onTheme);
    pengamatTema.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", mainkan);
      pengamatTema.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="glyph-field" aria-hidden="true" />;
}
