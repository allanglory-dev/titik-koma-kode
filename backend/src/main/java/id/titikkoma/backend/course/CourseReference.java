package id.titikkoma.backend.course;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

/** Satu sumber rujukan yang dipakai menyusun materi sebuah mata kuliah. */
@Embeddable
public class CourseReference {

    @Column(name = "ref_title", nullable = false)
    private String title;

    /** Penulis atau lembaga yang menerbitkannya. */
    @Column(name = "ref_author")
    private String author;

    @Column(name = "ref_url", length = 512)
    private String url;

    /** Keterangan singkat: bagian mana yang mengacu ke sumber ini. */
    @Column(name = "ref_note", columnDefinition = "text")
    private String note;

    public CourseReference() {
    }

    public CourseReference(String title, String author, String url, String note) {
        this.title = title;
        this.author = author;
        this.url = url;
        this.note = note;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}
