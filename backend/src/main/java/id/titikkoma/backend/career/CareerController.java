package id.titikkoma.backend.career;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import id.titikkoma.backend.block.BlockRepository;
import id.titikkoma.backend.course.Course;
import id.titikkoma.backend.course.CourseRepository;
import id.titikkoma.backend.lesson.LessonRepository;

@RestController
@RequestMapping("/api/careers")
public class CareerController {

    private final CareerRepository careerRepository;
    private final CareerStageRepository stageRepository;
    private final CourseRepository courseRepository;
    private final LessonRepository lessonRepository;
    private final BlockRepository blockRepository;

    public CareerController(CareerRepository careerRepository,
            CareerStageRepository stageRepository,
            CourseRepository courseRepository,
            LessonRepository lessonRepository,
            BlockRepository blockRepository) {
        this.careerRepository = careerRepository;
        this.stageRepository = stageRepository;
        this.courseRepository = courseRepository;
        this.lessonRepository = lessonRepository;
        this.blockRepository = blockRepository;
    }

    /** GET /api/careers */
    @GetMapping
    public List<CareerPath> findAll() {
        return careerRepository.findAllByOrderByOrderIndexAsc();
    }

    /** GET /api/careers/backend-developer */
    @GetMapping("/{slug}")
    public ResponseEntity<CareerPath> findBySlug(@PathVariable String slug) {
        return careerRepository.findBySlug(slug)
                .map(path -> {
                    List<CareerStage> langkah =
                            stageRepository.findByPathIdOrderByOrderIndexAsc(path.getId());
                    langkah.forEach(this::lengkapi);
                    path.setStages(langkah);
                    return ResponseEntity.ok(path);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Menyalin keterangan kursus ke dalam langkah, supaya frontend cukup satu
     * permintaan untuk menampilkan seluruh kartu langkahnya.
     */
    private void lengkapi(CareerStage stage) {
        Course course = courseRepository.findByCode(stage.getCourseCode()).orElse(null);
        if (course == null) {
            return;
        }
        stage.setCourseSlug(course.getSlug());
        stage.setCourseTitle(course.getTitle());
        stage.setCourseKind(course.getKind());
        stage.setCourseLevel(course.getLevel());
        stage.setCourseHours(course.getHours());

        var bab = lessonRepository.findByCourseIdOrderByOrderIndexAsc(course.getId());
        stage.setChapterCount((long) bab.size());
        stage.setWrittenCount(bab.stream()
                .filter(l -> blockRepository.countByLessonId(l.getId()) > 0)
                .count());
    }
}
