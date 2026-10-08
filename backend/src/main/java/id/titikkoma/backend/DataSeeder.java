package id.titikkoma.backend;

import java.io.InputStream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import tools.jackson.databind.ObjectMapper;

import id.titikkoma.backend.block.Block;
import id.titikkoma.backend.block.BlockRepository;
import id.titikkoma.backend.block.BlockType;
import id.titikkoma.backend.course.Course;
import id.titikkoma.backend.course.CourseRepository;
import id.titikkoma.backend.lesson.Lesson;
import id.titikkoma.backend.lesson.LessonRepository;
import id.titikkoma.backend.seed.SeedContent;
import id.titikkoma.backend.seed.Slug;
import id.titikkoma.backend.subject.Subject;
import id.titikkoma.backend.subject.SubjectRepository;

/**
 * Mengisi materi awal dari file seed/content.json.
 *
 * Isinya dimuat ulang setiap aplikasi dijalankan, supaya materi yang diubah di
 * file JSON langsung terlihat tanpa menyentuh database secara manual. Nanti
 * setelah panel admin jadi, tugas ini digantikan panel tersebut.
 */
@Component
public class DataSeeder implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataSeeder.class);

    private final SubjectRepository subjectRepository;
    private final CourseRepository courseRepository;
    private final LessonRepository lessonRepository;
    private final BlockRepository blockRepository;
    private final ObjectMapper objectMapper;

    public DataSeeder(SubjectRepository subjectRepository,
            CourseRepository courseRepository,
            LessonRepository lessonRepository,
            BlockRepository blockRepository,
            ObjectMapper objectMapper) {
        this.subjectRepository = subjectRepository;
        this.courseRepository = courseRepository;
        this.lessonRepository = lessonRepository;
        this.blockRepository = blockRepository;
        this.objectMapper = objectMapper;
    }

    @Override
    public void run(String... args) throws Exception {
        SeedContent seed;
        try (InputStream in = new ClassPathResource("seed/content.json").getInputStream()) {
            seed = objectMapper.readValue(in, SeedContent.class);
        }

        blockRepository.deleteAll();
        lessonRepository.deleteAll();
        courseRepository.deleteAll();
        subjectRepository.deleteAll();

        int lessonCount = 0;
        int blockCount = 0;

        for (SeedContent.SeedSubject seedSubject : seed.subjects) {
            Subject subject = subjectRepository.save(
                    new Subject(seedSubject.name, seedSubject.description));

            int courseOrder = 1;
            for (SeedContent.SeedCourse seedCourse : seedSubject.courses) {
                Course course = courseRepository.save(new Course(
                        slugDari(seedCourse.slug, seedCourse.title),
                        seedCourse.title, seedCourse.description,
                        seedCourse.level, courseOrder++, subject));

                int lessonOrder = 1;
                for (SeedContent.SeedLesson seedLesson : seedCourse.lessons) {
                    Lesson lesson = lessonRepository.save(new Lesson(
                            slugDari(seedLesson.slug, seedLesson.title),
                            seedLesson.title, seedLesson.summary,
                            lessonOrder++, course));
                    lessonCount++;

                    int blockOrder = 1;
                    for (SeedContent.SeedBlock seedBlock : seedLesson.blocks) {
                        blockRepository.save(new Block(
                                BlockType.valueOf(seedBlock.type),
                                seedBlock.content,
                                seedBlock.language,
                                blockOrder++,
                                lesson));
                        blockCount++;
                    }
                }
            }
        }

        log.info("Materi dimuat: {} mata pelajaran, {} pelajaran, {} blok isi.",
                seed.subjects.size(), lessonCount, blockCount);
    }

    /** Pakai slug yang ditulis di berkas bila ada; selebihnya dibuat dari judul. */
    private static String slugDari(String slugTertulis, String judul) {
        return (slugTertulis != null && !slugTertulis.isBlank())
                ? slugTertulis
                : Slug.of(judul);
    }
}
