const BASE_URL = "http://localhost:8080/api";

async function get(path) {
  const response = await fetch(`${BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`Gagal memuat data (${response.status})`);
  }
  return response.json();
}

export const api = {
  getAreas: () => get("/areas"),
  getCareers: () => get("/careers"),
  getCareer: (slug) => get(`/careers/${slug}`),
  getCourses: () => get("/courses"),
  getCourse: (courseSlug) => get(`/courses/${courseSlug}`),
  getLessons: (courseSlug) => get(`/courses/${courseSlug}/lessons`),
  getLesson: (courseSlug, lessonSlug) =>
    get(`/courses/${courseSlug}/lessons/${lessonSlug}`),
  getBlocks: (courseSlug, lessonSlug) =>
    get(`/courses/${courseSlug}/lessons/${lessonSlug}/blocks`),
};
