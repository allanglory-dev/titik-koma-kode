package id.titikkoma.backend.seed;

import java.util.List;

/**
 * Bentuk isi berkas seed/kurikulum.json.
 * Dipakai hanya untuk membaca kurikulum awal, bukan entity database.
 */
public class SeedContent {

    public SeedProgram program;
    public List<SeedArea> areas = List.of();
    public List<SeedCourse> courses = List.of();

    public static class SeedProgram {
        public String code;
        public String name;
        public String description;
        public Integer semesters;
    }

    public static class SeedArea {
        public String code;
        public String name;
        public String description;
    }

    public static class SeedCourse {
        public String code;
        /** Opsional. Kalau kosong, dibuat dari judul. */
        public String slug;
        public String title;
        public String description;
        public Integer semester;
        public Integer sks;
        public String level;
        public Integer hours;
        public String area;
        public List<String> outcomes = List.of();
        public List<String> prerequisites = List.of();
        public List<SeedLesson> lessons = List.of();
    }

    public static class SeedLesson {
        public String slug;
        public String title;
        public String summary;
        public List<SeedBlock> blocks = List.of();
    }

    public static class SeedBlock {
        public String type;
        public String content;
        public String language;
    }
}
