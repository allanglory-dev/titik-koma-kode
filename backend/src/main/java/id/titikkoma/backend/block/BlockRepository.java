package id.titikkoma.backend.block;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BlockRepository extends JpaRepository<Block, Long> {

    List<Block> findByLessonIdOrderByOrderIndexAsc(Long lessonId);

    long countByLessonId(Long lessonId);

    /**
     * Dipakai untuk menilai apakah sebuah bab sudah ditulis sampai standar,
     * bukan sekadar punya paragraf. Setiap bab yang dianggap selesai punya
     * latihan, jadi tidak adanya blok TASK menandakan masih berupa draf.
     */
    long countByLessonIdAndType(Long lessonId, BlockType type);
}
