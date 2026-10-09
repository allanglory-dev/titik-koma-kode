package id.titikkoma.backend.block;

/** Jenis blok isi di dalam satu pelajaran. */
public enum BlockType {

    /** Paragraf penjelasan. */
    TEXT,

    /** Contoh kode yang bisa dijalankan di bagian "Coba Sendiri". */
    CODE,

    /** Rumus matematika. */
    MATH,

    /** Kotak catatan atau peringatan. */
    NOTE,

    /** Latihan soal. Jawabannya disimpan terpisah dan disembunyikan sampai diminta. */
    TASK
}
