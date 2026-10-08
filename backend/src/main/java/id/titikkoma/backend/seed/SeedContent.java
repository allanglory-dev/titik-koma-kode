package id.titikkoma.backend.seed;

import java.util.List;

/**
 * Bentuk isi file seed/content.json.
 * Dipakai hanya untuk membaca materi awal, bukan entity database.
 */
public class SeedContent {

    public List<SeedSubject> subjects = List.of();

    public static class SeedSubject {
        public String name;
        public String description;
        public List<SeedCourse> courses = List.of();
    }

    public static class SeedCourse {
        /** Opsional. Kalau kosong, dibuat dari judul. Diisi hanya bila alamat lama perlu dipertahankan. */
        public String slug;
        public String title;
        public String description;
        public String level;
        public List<SeedLesson> lessons = List.of();
    }

    public static class SeedLesson {
        /** Opsional, sama seperti pada kursus. */
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
