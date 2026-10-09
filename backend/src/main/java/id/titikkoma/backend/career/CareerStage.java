package id.titikkoma.backend.career;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Transient;

/**
 * Satu langkah pada jalur karier. Tiap langkah menunjuk satu kursus,
 * entah mata kuliah atau modul keterampilan, beserta alasan kenapa
 * langkah itu berada di urutan tersebut.
 */
@Entity
public class CareerStage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer orderIndex;

    /** Kode kursus yang ditempuh pada langkah ini. */
    @Column(nullable = false, length = 12)
    private String courseCode;

    /** Judul singkat yang menyatakan hasil langkah ini, misalnya "Menguasai SQL". */
    @Column(nullable = false)
    private String heading;

    /** Kenapa langkah ini perlu, dan kenapa di urutan ini. */
    @Column(columnDefinition = "text")
    private String reason;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "path_id")
    private CareerPath path;

    /** Diisi controller dari data kursus, tidak disimpan di tabel. */
    @Transient
    private String courseSlug;

    @Transient
    private String courseTitle;

    @Transient
    private String courseKind;

    @Transient
    private String courseLevel;

    @Transient
    private Integer courseHours;

    @Transient
    private Long chapterCount;

    @Transient
    private Long writtenCount;

    public CareerStage() {
    }

    public Long getId() {
        return id;
    }

    public Integer getOrderIndex() {
        return orderIndex;
    }

    public void setOrderIndex(Integer orderIndex) {
        this.orderIndex = orderIndex;
    }

    public String getCourseCode() {
        return courseCode;
    }

    public void setCourseCode(String courseCode) {
        this.courseCode = courseCode;
    }

    public String getHeading() {
        return heading;
    }

    public void setHeading(String heading) {
        this.heading = heading;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public CareerPath getPath() {
        return path;
    }

    public void setPath(CareerPath path) {
        this.path = path;
    }

    public String getCourseSlug() {
        return courseSlug;
    }

    public void setCourseSlug(String courseSlug) {
        this.courseSlug = courseSlug;
    }

    public String getCourseTitle() {
        return courseTitle;
    }

    public void setCourseTitle(String courseTitle) {
        this.courseTitle = courseTitle;
    }

    public String getCourseKind() {
        return courseKind;
    }

    public void setCourseKind(String courseKind) {
        this.courseKind = courseKind;
    }

    public String getCourseLevel() {
        return courseLevel;
    }

    public void setCourseLevel(String courseLevel) {
        this.courseLevel = courseLevel;
    }

    public Integer getCourseHours() {
        return courseHours;
    }

    public void setCourseHours(Integer courseHours) {
        this.courseHours = courseHours;
    }

    public Long getChapterCount() {
        return chapterCount;
    }

    public void setChapterCount(Long chapterCount) {
        this.chapterCount = chapterCount;
    }

    public Long getWrittenCount() {
        return writtenCount;
    }

    public void setWrittenCount(Long writtenCount) {
        this.writtenCount = writtenCount;
    }
}
