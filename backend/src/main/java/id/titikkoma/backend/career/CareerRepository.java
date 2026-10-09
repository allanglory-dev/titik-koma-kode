package id.titikkoma.backend.career;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CareerRepository extends JpaRepository<CareerPath, Long> {

    Optional<CareerPath> findBySlug(String slug);

    List<CareerPath> findAllByOrderByOrderIndexAsc();
}
