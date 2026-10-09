package id.titikkoma.backend.career;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CareerStageRepository extends JpaRepository<CareerStage, Long> {

    List<CareerStage> findByPathIdOrderByOrderIndexAsc(Long pathId);
}
