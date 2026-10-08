package id.titikkoma.backend.lesson;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import id.titikkoma.backend.block.Block;
import id.titikkoma.backend.block.BlockRepository;

@RestController
@RequestMapping("/api/lessons")
public class LessonController {

    private final LessonRepository lessonRepository;
    private final BlockRepository blockRepository;

    public LessonController(LessonRepository lessonRepository, BlockRepository blockRepository) {
        this.lessonRepository = lessonRepository;
        this.blockRepository = blockRepository;
    }

    /** GET /api/lessons/1 */
    @GetMapping("/{id}")
    public ResponseEntity<Lesson> findById(@PathVariable Long id) {
        return lessonRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /** GET /api/lessons/1/blocks */
    @GetMapping("/{id}/blocks")
    public ResponseEntity<List<Block>> findBlocks(@PathVariable Long id) {
        if (!lessonRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(blockRepository.findByLessonIdOrderByOrderIndexAsc(id));
    }
}
