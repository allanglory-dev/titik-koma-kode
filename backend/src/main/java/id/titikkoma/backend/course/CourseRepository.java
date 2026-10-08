package id.titikkoma.backend.course;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {

    /**
     * Spring membuatkan query-nya otomatis dari nama method ini:
     * cari Course yang subject.id-nya sama dengan parameter, urutkan dari orderIndex terkecil.
     */
    List<Course> findBySubjectIdOrderByOrderIndexAsc(Long subjectId);
}
