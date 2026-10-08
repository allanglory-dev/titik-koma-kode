package id.titikkoma.backend.course;

import com.fasterxml.jackson.annotation.JsonIgnore;

import id.titikkoma.backend.subject.Subject;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Transient;

@Entity
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Dipakai di alamat halaman, misalnya /kursus/html-dasar. Tetap sama selama judulnya tetap. */
    @Column(unique = true, nullable = false)
    private String slug;

    private String title;

    private String description;

    /** Tingkat kesulitan: Pemula, Menengah, atau Lanjutan. */
    private String level;

    /** Urutan tampil kursus di dalam satu mata pelajaran. */
    private Integer orderIndex;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id")
    private Subject subject;

    /** Tidak disimpan di tabel. Diisi controller supaya frontend tahu kursus ini sudah ada isinya. */
    @Transient
    private Long lessonCount;

    public Course() {
    }

    public Course(String slug, String title, String description, String level, Integer orderIndex,
            Subject subject) {
        this.slug = slug;
        this.title = title;
        this.description = description;
        this.level = level;
        this.orderIndex = orderIndex;
        this.subject = subject;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public Integer getOrderIndex() {
        return orderIndex;
    }

    public void setOrderIndex(Integer orderIndex) {
        this.orderIndex = orderIndex;
    }

    /** Ikut dikirim ke frontend supaya kursus bisa dikelompokkan per mata pelajaran. */
    public Long getSubjectId() {
        return subject == null ? null : subject.getId();
    }

    public Long getLessonCount() {
        return lessonCount;
    }

    public void setLessonCount(Long lessonCount) {
        this.lessonCount = lessonCount;
    }

    public Subject getSubject() {
        return subject;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }
}
