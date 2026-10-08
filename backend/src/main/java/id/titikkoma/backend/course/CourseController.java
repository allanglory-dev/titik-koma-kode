package id.titikkoma.backend.course;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import id.titikkoma.backend.lesson.Lesson;
import id.titikkoma.backend.lesson.LessonRepository;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseRepository courseRepository;
    private final LessonRepository lessonRepository;

    public CourseController(CourseRepository courseRepository, LessonRepository lessonRepository) {
        this.courseRepository = courseRepository;
        this.lessonRepository = lessonRepository;
    }

    /** GET /api/courses */
    @GetMapping
    public List<Course> findAll() {
        List<Course> courses = courseRepository.findAll();
        courses.forEach(this::fillLessonCount);
        return courses;
    }

    /** GET /api/courses/html-dasar */
    @GetMapping("/{slug}")
    public ResponseEntity<Course> findBySlug(@PathVariable String slug) {
        return courseRepository.findBySlug(slug)
                .map(course -> {
                    fillLessonCount(course);
                    return ResponseEntity.ok(course);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /** GET /api/courses/html-dasar/lessons */
    @GetMapping("/{slug}/lessons")
    public ResponseEntity<List<Lesson>> findLessons(@PathVariable String slug) {
        if (courseRepository.findBySlug(slug).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(lessonRepository.findByCourseSlugOrderByOrderIndexAsc(slug));
    }

    private void fillLessonCount(Course course) {
        course.setLessonCount(lessonRepository.countByCourseId(course.getId()));
    }
}
