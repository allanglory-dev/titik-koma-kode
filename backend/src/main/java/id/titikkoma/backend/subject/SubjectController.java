package id.titikkoma.backend.subject;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import id.titikkoma.backend.course.Course;
import id.titikkoma.backend.course.CourseRepository;

@RestController
@RequestMapping("/api/subjects")
public class SubjectController {

    private final SubjectRepository subjectRepository;
    private final CourseRepository courseRepository;

    public SubjectController(SubjectRepository subjectRepository, CourseRepository courseRepository) {
        this.subjectRepository = subjectRepository;
        this.courseRepository = courseRepository;
    }

    /** GET /api/subjects */
    @GetMapping
    public List<Subject> findAll() {
        return subjectRepository.findAll();
    }

    /** GET /api/subjects/1 */
    @GetMapping("/{id}")
    public ResponseEntity<Subject> findById(@PathVariable Long id) {
        return subjectRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /** GET /api/subjects/1/courses */
    @GetMapping("/{id}/courses")
    public ResponseEntity<List<Course>> findCourses(@PathVariable Long id) {
        if (!subjectRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(courseRepository.findBySubjectIdOrderByOrderIndexAsc(id));
    }
}
