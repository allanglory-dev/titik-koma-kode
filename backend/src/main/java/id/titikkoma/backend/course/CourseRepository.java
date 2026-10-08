package id.titikkoma.backend.course;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {

    Optional<Course> findBySlug(String slug);

    Optional<Course> findByCode(String code);

    List<Course> findAllByOrderBySemesterAscCodeAsc();

    List<Course> findBySemesterOrderByCodeAsc(Integer semester);

    List<Course> findByAreaCodeOrderBySemesterAscCodeAsc(String areaCode);
}
