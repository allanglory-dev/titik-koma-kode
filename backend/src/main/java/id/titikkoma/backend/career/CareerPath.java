package id.titikkoma.backend.career;

import java.util.ArrayList;
import java.util.List;

import id.titikkoma.backend.course.CourseReference;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OrderColumn;
import jakarta.persistence.Transient;

/** Satu jalur karier yang bisa ditempuh lulusan, beserta kaitannya ke kurikulum. */
@Entity
public class CareerPath {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, length = 12)
    private String code;

    @Column(unique = true, nullable = false)
    private String slug;

    @Column(nullable = false)
    private String name;

    /** Satu kalimat yang menjelaskan pekerjaannya. */
    private String tagline;

    @Column(columnDefinition = "text")
    private String description;

    /** Apa yang benar-benar dikerjakan sehari-hari. */
    @Column(columnDefinition = "text")
    private String daily;

    /** Tinggi, Sedang, atau Terbatas. */
    private String demand;

    /** Seberapa mudah dimasuki lulusan baru: Mudah, Sedang, atau Sulit. */
    private String entry;

    /** Kisaran gaji awal beserta peringatannya. Sengaja berupa teks, bukan angka. */
    @Column(columnDefinition = "text")
    private String salary;

    private Integer orderIndex;

    /** Kode mata kuliah yang menjadi tulang punggung jalur ini. */
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "career_core", joinColumns = @JoinColumn(name = "path_id"))
    @OrderColumn(name = "position")
    @Column(name = "course_code", length = 12)
    private List<String> coreCourses = new ArrayList<>();

    /** Mata kuliah pendukung yang berguna tapi bukan syarat utama. */
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "career_support", joinColumns = @JoinColumn(name = "path_id"))
    @OrderColumn(name = "position")
    @Column(name = "course_code", length = 12)
    private List<String> supportCourses = new ArrayList<>();

    /** Modul keterampilan yang ditempuh pada jalur ini. */
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "career_skill", joinColumns = @JoinColumn(name = "path_id"))
    @OrderColumn(name = "position")
    @Column(name = "course_code", length = 12)
    private List<String> skillCourses = new ArrayList<>();

    /** Hal yang perlu dipelajari di luar kurikulum, biasanya perkakas industri. */
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "career_extra", joinColumns = @JoinColumn(name = "path_id"))
    @OrderColumn(name = "position")
    @Column(name = "item", columnDefinition = "text")
    private List<String> beyondCurriculum = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "career_reference", joinColumns = @JoinColumn(name = "path_id"))
    @OrderColumn(name = "position")
    private List<CourseReference> references = new ArrayList<>();

    /** Diisi controller, tidak disimpan di tabel. */
    @Transient
    private List<CareerStage> stages = new ArrayList<>();

    public CareerPath() {
    }

    public Long getId() {
        return id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTagline() {
        return tagline;
    }

    public void setTagline(String tagline) {
        this.tagline = tagline;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDaily() {
        return daily;
    }

    public void setDaily(String daily) {
        this.daily = daily;
    }

    public String getDemand() {
        return demand;
    }

    public void setDemand(String demand) {
        this.demand = demand;
    }

    public String getEntry() {
        return entry;
    }

    public void setEntry(String entry) {
        this.entry = entry;
    }

    public String getSalary() {
        return salary;
    }

    public void setSalary(String salary) {
        this.salary = salary;
    }

    public Integer getOrderIndex() {
        return orderIndex;
    }

    public void setOrderIndex(Integer orderIndex) {
        this.orderIndex = orderIndex;
    }

    public List<String> getCoreCourses() {
        return coreCourses;
    }

    public void setCoreCourses(List<String> coreCourses) {
        this.coreCourses = coreCourses;
    }

    public List<String> getSupportCourses() {
        return supportCourses;
    }

    public void setSupportCourses(List<String> supportCourses) {
        this.supportCourses = supportCourses;
    }

    public List<String> getSkillCourses() {
        return skillCourses;
    }

    public void setSkillCourses(List<String> skillCourses) {
        this.skillCourses = skillCourses;
    }

    public List<String> getBeyondCurriculum() {
        return beyondCurriculum;
    }

    public void setBeyondCurriculum(List<String> beyondCurriculum) {
        this.beyondCurriculum = beyondCurriculum;
    }

    public List<CourseReference> getReferences() {
        return references;
    }

    public void setReferences(List<CourseReference> references) {
        this.references = references;
    }

    public List<CareerStage> getStages() {
        return stages;
    }

    public void setStages(List<CareerStage> stages) {
        this.stages = stages;
    }
}
