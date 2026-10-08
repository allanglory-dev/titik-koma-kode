package id.titikkoma.backend.lesson;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LessonRepository extends JpaRepository<Lesson, Long> {

    List<Lesson> findByCourseIdOrderByOrderIndexAsc(Long courseId);

    List<Lesson> findByCourseSlugOrderByOrderIndexAsc(String courseSlug);

    Optional<Lesson> findByCourseSlugAndSlug(String courseSlug, String lessonSlug);

    long countByCourseId(Long courseId);
}
