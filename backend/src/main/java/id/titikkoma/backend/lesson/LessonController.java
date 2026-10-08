package id.titikkoma.backend.lesson;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import id.titikkoma.backend.block.Block;
import id.titikkoma.backend.block.BlockRepository;

/**
 * Pelajaran dialamatkan lewat kursusnya, sebab slug pelajaran
 * hanya dijamin unik di dalam satu kursus.
 */
@RestController
@RequestMapping("/api/courses/{courseSlug}/lessons")
public class LessonController {

    private final LessonRepository lessonRepository;
    private final BlockRepository blockRepository;

    public LessonController(LessonRepository lessonRepository, BlockRepository blockRepository) {
        this.lessonRepository = lessonRepository;
        this.blockRepository = blockRepository;
    }

    /** GET /api/courses/html-dasar/lessons/apa-itu-html */
    @GetMapping("/{lessonSlug}")
    public ResponseEntity<Lesson> findOne(@PathVariable String courseSlug,
            @PathVariable String lessonSlug) {
        return lessonRepository.findByCourseSlugAndSlug(courseSlug, lessonSlug)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /** GET /api/courses/html-dasar/lessons/apa-itu-html/blocks */
    @GetMapping("/{lessonSlug}/blocks")
    public ResponseEntity<List<Block>> findBlocks(@PathVariable String courseSlug,
            @PathVariable String lessonSlug) {
        return lessonRepository.findByCourseSlugAndSlug(courseSlug, lessonSlug)
                .map(lesson -> ResponseEntity
                        .ok(blockRepository.findByLessonIdOrderByOrderIndexAsc(lesson.getId())))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
