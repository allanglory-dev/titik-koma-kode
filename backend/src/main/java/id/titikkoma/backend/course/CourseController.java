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
        return courseRepository.findAll();
    }

    /** GET /api/courses/1 */
    @GetMapping("/{id}")
    public ResponseEntity<Course> findById(@PathVariable Long id) {
        return courseRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /** GET /api/courses/1/lessons */
    @GetMapping("/{id}/lessons")
    public ResponseEntity<List<Lesson>> findLessons(@PathVariable Long id) {
        if (!courseRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(lessonRepository.findByCourseIdOrderByOrderIndexAsc(id));
    }
}
