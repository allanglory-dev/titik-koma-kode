package id.titikkoma.backend.block;

import com.fasterxml.jackson.annotation.JsonIgnore;

import id.titikkoma.backend.lesson.Lesson;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Block {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Disimpan sebagai teks ("TEXT", "CODE", ...), bukan angka, supaya mudah dibaca. */
    @Enumerated(EnumType.STRING)
    private BlockType type;

    /** Isi blok. Pakai tipe text supaya muat lebih dari 255 karakter. */
    @Column(columnDefinition = "text")
    private String content;

    /** Bahasa untuk blok CODE, misalnya "html" atau "java". Kosong untuk blok lain. */
    private String language;

    /** Pembahasan untuk blok TASK. Kosong untuk blok lain. */
    @Column(columnDefinition = "text")
    private String solution;

    /** Urutan blok di dalam satu pelajaran. */
    private Integer orderIndex;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lesson_id")
    private Lesson lesson;

    public Block() {
    }

    public Block(BlockType type, String content, String language, Integer orderIndex, Lesson lesson) {
        this.type = type;
        this.content = content;
        this.language = language;
        this.orderIndex = orderIndex;
        this.lesson = lesson;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BlockType getType() {
        return type;
    }

    public void setType(BlockType type) {
        this.type = type;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getLanguage() {
        return language;
    }

    public String getSolution() {
        return solution;
    }

    public void setSolution(String solution) {
        this.solution = solution;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public Integer getOrderIndex() {
        return orderIndex;
    }

    public void setOrderIndex(Integer orderIndex) {
        this.orderIndex = orderIndex;
    }

    public Lesson getLesson() {
        return lesson;
    }

    public void setLesson(Lesson lesson) {
        this.lesson = lesson;
    }
}
