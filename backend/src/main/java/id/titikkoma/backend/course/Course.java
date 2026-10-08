package id.titikkoma.backend.course;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import id.titikkoma.backend.area.Area;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OrderColumn;
import jakarta.persistence.Transient;

/** Satu mata kuliah di dalam kurikulum. */
@Entity
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Kode mata kuliah, misalnya IF205. */
    @Column(unique = true, nullable = false, length = 12)
    private String code;

    /** Dipakai di alamat halaman, misalnya /kursus/pemrograman-web. */
    @Column(unique = true, nullable = false)
    private String slug;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "text")
    private String description;

    /** Semester 1 sampai 8. */
    @Column(nullable = false)
    private Integer semester;

    /** Bobot satuan kredit semester. */
    @Column(nullable = false)
    private Integer sks;

    /** Pemula, Menengah, atau Lanjutan. */
    private String level;

    /** Perkiraan jam belajar mandiri untuk menuntaskan mata kuliah ini. */
    private Integer hours;

    /** Capaian pembelajaran: apa yang bisa dilakukan setelah menuntaskannya. */
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "course_outcome", joinColumns = @JoinColumn(name = "course_id"))
    @OrderColumn(name = "position")
    @Column(name = "outcome", columnDefinition = "text")
    private List<String> outcomes = new ArrayList<>();

    /** Kode mata kuliah yang sebaiknya dituntaskan lebih dulu. */
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "course_prerequisite", joinColumns = @JoinColumn(name = "course_id"))
    @OrderColumn(name = "position")
    @Column(name = "prerequisite_code", length = 12)
    private List<String> prerequisites = new ArrayList<>();

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "area_id")
    private Area area;

    /** Tidak disimpan di tabel. Diisi controller supaya frontend tahu isinya sudah ada. */
    @Transient
    private Long lessonCount;

    public Course() {
    }

    public Course(String code, String slug, String title, String description,
            Integer semester, Integer sks, String level, Integer hours, Area area) {
        this.code = code;
        this.slug = slug;
        this.title = title;
        this.description = description;
        this.semester = semester;
        this.sks = sks;
        this.level = level;
        this.hours = hours;
        this.area = area;
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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getSemester() {
        return semester;
    }

    public void setSemester(Integer semester) {
        this.semester = semester;
    }

    public Integer getSks() {
        return sks;
    }

    public void setSks(Integer sks) {
        this.sks = sks;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public Integer getHours() {
        return hours;
    }

    public void setHours(Integer hours) {
        this.hours = hours;
    }

    public List<String> getOutcomes() {
        return outcomes;
    }

    public void setOutcomes(List<String> outcomes) {
        this.outcomes = outcomes;
    }

    public List<String> getPrerequisites() {
        return prerequisites;
    }

    public void setPrerequisites(List<String> prerequisites) {
        this.prerequisites = prerequisites;
    }

    /** Ikut dikirim ke frontend supaya mata kuliah bisa dikelompokkan per bidang. */
    public String getAreaCode() {
        return area == null ? null : area.getCode();
    }

    public String getAreaName() {
        return area == null ? null : area.getName();
    }

    public Area getArea() {
        return area;
    }

    public void setArea(Area area) {
        this.area = area;
    }

    public Long getLessonCount() {
        return lessonCount;
    }

    public void setLessonCount(Long lessonCount) {
        this.lessonCount = lessonCount;
    }
}
