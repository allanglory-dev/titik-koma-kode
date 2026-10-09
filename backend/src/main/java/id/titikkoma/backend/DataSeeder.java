package id.titikkoma.backend;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import id.titikkoma.backend.area.Area;
import id.titikkoma.backend.area.AreaRepository;
import id.titikkoma.backend.block.Block;
import id.titikkoma.backend.block.BlockRepository;
import id.titikkoma.backend.block.BlockType;
import id.titikkoma.backend.course.Course;
import id.titikkoma.backend.course.CourseRepository;
import id.titikkoma.backend.lesson.Lesson;
import id.titikkoma.backend.lesson.LessonRepository;
import id.titikkoma.backend.seed.SeedContent;
import id.titikkoma.backend.seed.Slug;
import tools.jackson.databind.ObjectMapper;

/**
 * Memuat kurikulum dari berkas seed/kurikulum.json setiap aplikasi dijalankan.
 * Nanti setelah panel admin jadi, tugas ini digantikan panel tersebut.
 */
@Component
public class DataSeeder implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataSeeder.class);

    private final AreaRepository areaRepository;
    private final CourseRepository courseRepository;
    private final LessonRepository lessonRepository;
    private final BlockRepository blockRepository;
    private final ObjectMapper objectMapper;

    public DataSeeder(AreaRepository areaRepository,
            CourseRepository courseRepository,
            LessonRepository lessonRepository,
            BlockRepository blockRepository,
            ObjectMapper objectMapper) {
        this.areaRepository = areaRepository;
        this.courseRepository = courseRepository;
        this.lessonRepository = lessonRepository;
        this.blockRepository = blockRepository;
        this.objectMapper = objectMapper;
    }

    @Override
    public void run(String... args) throws Exception {
        SeedContent seed;
        try (InputStream in = new ClassPathResource("seed/kurikulum.json").getInputStream()) {
            seed = objectMapper.readValue(in, SeedContent.class);
        }

        blockRepository.deleteAll();
        lessonRepository.deleteAll();
        courseRepository.deleteAll();
        areaRepository.deleteAll();

        Map<String, Area> areaByCode = new HashMap<>();
        for (SeedContent.SeedArea seedArea : seed.areas) {
            areaByCode.put(seedArea.code, areaRepository.save(
                    new Area(seedArea.code, seedArea.name, seedArea.description)));
        }

        int lessonCount = 0;
        int blockCount = 0;
        int totalSks = 0;

        for (SeedContent.SeedCourse seedCourse : seed.courses) {
            Area area = areaByCode.get(seedCourse.area);
            if (area == null) {
                throw new IllegalStateException(
                        "Mata kuliah " + seedCourse.code + " menunjuk bidang '"
                                + seedCourse.area + "' yang tidak ada di daftar areas.");
            }

            Course course = new Course(
                    seedCourse.code,
                    slugDari(seedCourse.slug, seedCourse.title),
                    seedCourse.title,
                    seedCourse.description,
                    seedCourse.semester,
                    seedCourse.sks,
                    seedCourse.level,
                    seedCourse.hours,
                    area);
            course.setOutcomes(new ArrayList<>(seedCourse.outcomes));
            course.setPrerequisites(new ArrayList<>(seedCourse.prerequisites));
            course = courseRepository.save(course);

            totalSks += seedCourse.sks == null ? 0 : seedCourse.sks;

            int lessonOrder = 1;
            for (SeedContent.SeedLesson seedLesson : seedCourse.lessons) {
                Lesson lesson = lessonRepository.save(new Lesson(
                        slugDari(seedLesson.slug, seedLesson.title),
                        seedLesson.title, seedLesson.summary,
                        lessonOrder++, course));
                lessonCount++;

                int blockOrder = 1;
                for (SeedContent.SeedBlock seedBlock : seedLesson.blocks) {
                    Block block = new Block(
                            BlockType.valueOf(seedBlock.type),
                            seedBlock.content,
                            seedBlock.language,
                            blockOrder++,
                            lesson);
                    block.setSolution(seedBlock.solution);
                    blockRepository.save(block);
                    blockCount++;
                }
            }
        }

        periksaPrasyarat(seed);

        log.info("Kurikulum dimuat: {} bidang, {} mata kuliah, {} SKS, {} pelajaran, {} blok isi.",
                seed.areas.size(), seed.courses.size(), totalSks, lessonCount, blockCount);
    }

    /** Memastikan setiap prasyarat menunjuk kode mata kuliah yang benar-benar ada. */
    private void periksaPrasyarat(SeedContent seed) {
        var kode = seed.courses.stream().map(c -> c.code).collect(java.util.stream.Collectors.toSet());
        for (SeedContent.SeedCourse c : seed.courses) {
            for (String prasyarat : c.prerequisites) {
                if (!kode.contains(prasyarat)) {
                    throw new IllegalStateException(
                            "Mata kuliah " + c.code + " menuntut prasyarat " + prasyarat
                                    + " yang tidak ada di kurikulum.");
                }
            }
        }
    }

    /** Pakai slug yang ditulis di berkas bila ada; selebihnya dibuat dari judul. */
    private static String slugDari(String slugTertulis, String judul) {
        return (slugTertulis != null && !slugTertulis.isBlank())
                ? slugTertulis
                : Slug.of(judul);
    }
}
