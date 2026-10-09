package id.titikkoma.backend.seed;

import java.util.List;

/** Bentuk isi berkas seed/karier.json. */
public class SeedCareer {

    public List<SeedPath> paths = List.of();

    public static class SeedPath {
        public String code;
        public String slug;
        public String name;
        public String tagline;
        public String description;
        public String daily;
        public String demand;
        public String entry;
        public String salary;
        public Integer orderIndex;
        public List<String> coreCourses = List.of();
        public List<String> supportCourses = List.of();
        public List<String> skillCourses = List.of();
        public List<String> beyondCurriculum = List.of();
        public List<SeedStage> stages = List.of();
        public List<SeedContent.SeedReference> references = List.of();
    }

    public static class SeedStage {
        public String course;
        public String heading;
        public String reason;
    }
}
