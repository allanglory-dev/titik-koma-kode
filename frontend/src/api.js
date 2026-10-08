const BASE_URL = "http://localhost:8080/api";

async function get(path) {
  const response = await fetch(`${BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`Gagal memuat data (${response.status})`);
  }
  return response.json();
}

export const api = {
  getSubjects: () => get("/subjects"),
  getCoursesBySubject: (subjectId) => get(`/subjects/${subjectId}/courses`),
  getCourses: () => get("/courses"),
  getCourse: (courseId) => get(`/courses/${courseId}`),
  getLessonsByCourse: (courseId) => get(`/courses/${courseId}/lessons`),
  getLesson: (lessonId) => get(`/lessons/${lessonId}`),
  getBlocksByLesson: (lessonId) => get(`/lessons/${lessonId}/blocks`),
};
