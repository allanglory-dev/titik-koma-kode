package id.titikkoma.backend.career;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/careers")
public class CareerController {

    private final CareerRepository careerRepository;
    private final CareerStageRepository stageRepository;

    public CareerController(CareerRepository careerRepository,
            CareerStageRepository stageRepository) {
        this.careerRepository = careerRepository;
        this.stageRepository = stageRepository;
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
                    path.setStages(stageRepository.findByPathIdOrderByOrderIndexAsc(path.getId()));
                    return ResponseEntity.ok(path);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
