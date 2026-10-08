package id.titikkoma.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import id.titikkoma.backend.block.Block;
import id.titikkoma.backend.block.BlockRepository;
import id.titikkoma.backend.block.BlockType;
import id.titikkoma.backend.course.Course;
import id.titikkoma.backend.course.CourseRepository;
import id.titikkoma.backend.lesson.Lesson;
import id.titikkoma.backend.lesson.LessonRepository;
import id.titikkoma.backend.subject.Subject;
import id.titikkoma.backend.subject.SubjectRepository;

/**
 * Mengisi data contoh saat aplikasi dijalankan, supaya API ada isinya untuk diuji.
 * Hanya untuk tahap pengembangan. Nanti diganti panel admin.
 */
@Component
public class DataSeeder implements CommandLineRunner {

    private final SubjectRepository subjectRepository;
    private final CourseRepository courseRepository;
    private final LessonRepository lessonRepository;
    private final BlockRepository blockRepository;

    public DataSeeder(SubjectRepository subjectRepository,
            CourseRepository courseRepository,
            LessonRepository lessonRepository,
            BlockRepository blockRepository) {
        this.subjectRepository = subjectRepository;
        this.courseRepository = courseRepository;
        this.lessonRepository = lessonRepository;
        this.blockRepository = blockRepository;
    }

    @Override
    public void run(String... args) {
        if (courseRepository.count() > 0) {
            return;
        }

        // Bersihkan sisa data lama supaya isiannya konsisten.
        blockRepository.deleteAll();
        lessonRepository.deleteAll();
        courseRepository.deleteAll();
        subjectRepository.deleteAll();

        Subject pemrograman = subjectRepository.save(new Subject(
                "Pemrograman",
                "Dasar logika, web, dan bahasa pemrograman."));
        Subject matematika = subjectRepository.save(new Subject(
                "Matematika untuk IT",
                "Logika matematika, himpunan, dan dasar matematika diskrit."));
        Subject inggris = subjectRepository.save(new Subject(
                "Bahasa Inggris untuk IT",
                "Istilah teknologi dan membaca dokumentasi."));

        Course htmlCss = courseRepository.save(new Course(
                "HTML dan CSS",
                "Membuat dan menghias halaman web pertamamu.",
                "Pemula", 1, pemrograman));
        courseRepository.save(new Course(
                "Logika dan Algoritma Dasar",
                "Cara berpikir runut sebelum menulis kode.",
                "Pemula", 2, pemrograman));
        courseRepository.save(new Course(
                "JavaScript Dasar",
                "Membuat halaman web jadi hidup dan bisa diajak berinteraksi.",
                "Pemula", 3, pemrograman));
        courseRepository.save(new Course(
                "Git dan GitHub",
                "Menyimpan riwayat kode dan bekerja bersama tim.",
                "Pemula", 4, pemrograman));

        courseRepository.save(new Course(
                "Logika Matematika dan Himpunan",
                "Pernyataan, negasi, dan operasi himpunan.",
                "Pemula", 1, matematika));

        courseRepository.save(new Course(
                "Istilah IT Dasar",
                "Kosakata yang sering muncul di dokumentasi dan error.",
                "Pemula", 1, inggris));

        Lesson intro = lessonRepository.save(new Lesson(
                "Pengenalan HTML",
                "Mengenal bahasa penyusun halaman web.",
                1, htmlCss));
        Lesson struktur = lessonRepository.save(new Lesson(
                "Struktur Dasar Halaman",
                "Kerangka yang dimiliki setiap halaman HTML.",
                2, htmlCss));
        lessonRepository.save(new Lesson(
                "Heading dan Paragraf",
                "Menyusun judul dan teks biasa.",
                3, htmlCss));
        lessonRepository.save(new Lesson(
                "Link dan Gambar",
                "Menghubungkan halaman dan menampilkan gambar.",
                4, htmlCss));

        blockRepository.save(new Block(BlockType.TEXT,
                "HTML adalah bahasa untuk menyusun isi halaman web. "
                        + "Singkatannya HyperText Markup Language.",
                null, 1, intro));
        blockRepository.save(new Block(BlockType.TEXT,
                "HTML bukan bahasa pemrograman, melainkan bahasa penanda. "
                        + "Kita memberi tahu browser mana yang judul, mana paragraf, dan mana gambar.",
                null, 2, intro));
        blockRepository.save(new Block(BlockType.CODE,
                "<h1>Halaman Pertamaku</h1>\n<p>Halo, dunia!</p>",
                "html", 3, intro));
        blockRepository.save(new Block(BlockType.NOTE,
                "Coba ubah tulisan \"Halo, dunia!\" di editor, lalu klik Jalankan.",
                null, 4, intro));

        blockRepository.save(new Block(BlockType.TEXT,
                "Setiap halaman HTML punya kerangka yang sama.",
                null, 1, struktur));
        blockRepository.save(new Block(BlockType.CODE,
                "<!DOCTYPE html>\n<html>\n  <head>\n    <title>Judul Tab</title>\n  </head>\n"
                        + "  <body>\n    <h1>Selamat datang</h1>\n  </body>\n</html>",
                "html", 2, struktur));
    }
}
