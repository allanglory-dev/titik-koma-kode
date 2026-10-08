package id.titikkoma.backend.area;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/areas")
public class AreaController {

    private final AreaRepository areaRepository;

    public AreaController(AreaRepository areaRepository) {
        this.areaRepository = areaRepository;
    }

    /** GET /api/areas */
    @GetMapping
    public List<Area> findAll() {
        return areaRepository.findAllByOrderByCodeAsc();
    }
}
