package id.titikkoma.backend.block;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BlockRepository extends JpaRepository<Block, Long> {

    List<Block> findByLessonIdOrderByOrderIndexAsc(Long lessonId);
}
