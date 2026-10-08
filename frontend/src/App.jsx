import { Route, Routes } from "react-router-dom";

import { Layout } from "./components/Layout";
import { CoursePage } from "./pages/CoursePage";
import { HomePage } from "./pages/HomePage";
import { LessonPage } from "./pages/LessonPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/kursus/:courseId" element={<CoursePage />} />
        <Route
          path="/kursus/:courseId/pelajaran/:lessonId"
          element={<LessonPage />}
        />
        <Route path="*" element={<div className="state">Halaman tidak ditemukan.</div>} />
      </Route>
    </Routes>
  );
}
