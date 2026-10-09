package id.titikkoma.backend.course;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

    /** GET /api/courses, boleh disaring dengan ?semester=2, ?area=SDF, atau ?kind=KETERAMPILAN */
    @GetMapping
    public List<Course> findAll(@RequestParam(required = false) Integer semester,
            @RequestParam(required = false) String area,
            @RequestParam(required = false) String kind) {
        List<Course> courses;
        if (kind != null) {
            courses = courseRepository.findByKindOrderByCodeAsc(kind);
        } else if (semester != null) {
            courses = courseRepository.findBySemesterOrderByCodeAsc(semester);
        } else if (area != null) {
            courses = courseRepository.findByAreaCodeOrderBySemesterAscCodeAsc(area);
        } else {
            courses = courseRepository.findAllByOrderBySemesterAscCodeAsc();
        }
        courses.forEach(this::fillLessonCount);
        return courses;
    }

    /** GET /api/courses/pemrograman-web */
    @GetMapping("/{slug}")
    public ResponseEntity<Course> findBySlug(@PathVariable String slug) {
        return courseRepository.findBySlug(slug)
                .map(course -> {
                    fillLessonCount(course);
                    return ResponseEntity.ok(course);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /** GET /api/courses/pemrograman-web/lessons */
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
