/**
 * Progres belajar untuk pengunjung tanpa akun.
 * Disimpan di browser, jadi hanya berlaku di perangkat dan browser ini.
 * Nanti saat fitur login jadi, isinya dipindahkan ke akun.
 *
 * Kuncinya memakai slug, bukan id. Id berubah setiap materi dimuat ulang,
 * sedangkan slug tetap sama selama judulnya tidak diganti.
 */
const KEY = "titikkoma-progres-slug";

function readAll() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? {};
  } catch {
    return {};
  }
}

function writeAll(data) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    // Penyimpanan browser tidak tersedia, misalnya di mode penyamaran.
    // Progres tidak tersimpan, tapi aplikasi tetap jalan.
  }
}

function kunci(courseSlug, lessonSlug) {
  return `${courseSlug}/${lessonSlug}`;
}

export function isLessonDone(courseSlug, lessonSlug) {
  return Boolean(readAll()[kunci(courseSlug, lessonSlug)]);
}

export function setLessonDone(courseSlug, lessonSlug, done) {
  const all = readAll();
  if (done) {
    all[kunci(courseSlug, lessonSlug)] = true;
  } else {
    delete all[kunci(courseSlug, lessonSlug)];
  }
  writeAll(all);
}

export function countDone(courseSlug, lessons) {
  const all = readAll();
  return lessons.filter((lesson) => all[kunci(courseSlug, lesson.slug)]).length;
}
