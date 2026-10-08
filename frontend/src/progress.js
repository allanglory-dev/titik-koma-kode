/**
 * Progres belajar untuk pengunjung tanpa akun.
 * Disimpan di browser, jadi hanya berlaku di perangkat dan browser ini.
 * Nanti saat fitur login jadi, isinya dipindahkan ke akun.
 */
const KEY = "titikkoma-progres";

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

export function isLessonDone(lessonId) {
  return Boolean(readAll()[lessonId]);
}

export function setLessonDone(lessonId, done) {
  const all = readAll();
  if (done) {
    all[lessonId] = true;
  } else {
    delete all[lessonId];
  }
  writeAll(all);
}

export function countDone(lessons) {
  const all = readAll();
  return lessons.filter((lesson) => all[lesson.id]).length;
}
