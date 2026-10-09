package id.titikkoma.backend.career;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

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

/** Satu tahap pada sebuah jalur karier, dari pemula sampai siap melamar. */
@Entity
public class CareerStage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    /** Satu kalimat tentang apa yang dituju tahap ini. */
    @Column(columnDefinition = "text")
    private String note;

    /** Perkiraan lama menempuhnya, misalnya "2 sampai 3 bulan". */
    private String duration;

    private Integer orderIndex;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "career_stage_item", joinColumns = @JoinColumn(name = "stage_id"))
    @OrderColumn(name = "position")
    @Column(name = "item", columnDefinition = "text")
    private List<String> items = new ArrayList<>();

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "path_id")
    private CareerPath path;

    public CareerStage() {
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public Integer getOrderIndex() {
        return orderIndex;
    }

    public void setOrderIndex(Integer orderIndex) {
        this.orderIndex = orderIndex;
    }

    public List<String> getItems() {
        return items;
    }

    public void setItems(List<String> items) {
        this.items = items;
    }

    public CareerPath getPath() {
        return path;
    }

    public void setPath(CareerPath path) {
        this.path = path;
    }
}
