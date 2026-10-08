# Roadmap Titik Koma Kode

## Keputusan desain

| Hal | Keputusan |
|---|---|
| Nama | Titik Koma Kode |
| Cakupan | Semua topik yang nyambung ke IT, dibuat bertahap |
| Login | Opsional. Progres tamu disimpan di browser (localStorage), lalu digabung ke akun saat daftar atau login |
| Isi pelajaran | Tabel `Block` dengan jenis berbeda: teks, rumus, kode, kuis |
| Admin | Satu orang dulu |
| Ditunda | Sertifikat, XP dan streak, forum, AI mentor, pembayaran |

## Data

- **Subject**: mata pelajaran, punya banyak Course
- **Course**: kursus, punya banyak Lesson
- **Lesson**: pelajaran, punya banyak Block
- **Block**: blok isi (jenis, isi, urutan)
- **Quiz** dan **Question**: soal dan jawaban
- **User**: akun dan peran
- **Progress**: pelajaran selesai dan skor kuis per User

## Materi

**Gelombang 1**
- Pemrograman: Logika dan Algoritma Dasar, HTML dan CSS, JavaScript Dasar, Git dan GitHub
- Matematika untuk IT: Logika Matematika dan Himpunan
- Bahasa Inggris untuk IT: Istilah IT Dasar

**Gelombang 2**
Java Dasar, SQL dan Database, DSA, Statistik Deskriptif, Linux Dasar

**Gelombang 3**
Jaringan, Keamanan, Cloud dan DevOps, Data dan Machine Learning, Karier dan Portofolio

## Fase kerja

Selesaikan satu fase sebelum lanjut ke fase berikutnya.

### Fase 0: Persiapan ✅
- [x] Folder proyek dan Git
- [x] Database `titikkoma` di PostgreSQL
- [x] Proyek Spring Boot (backend)
- [x] Repo GitHub dan push pertama

### Fase 1: Backend dasar ✅
- [x] Entitas Subject, Course, Lesson, Block
- [x] Endpoint baca data kursus dan pelajaran
- [x] Data awal (seed)

### Fase 2: Frontend dasar ✅
- [x] Proyek React (Vite)
- [x] Beranda, halaman kursus, halaman pelajaran
- [x] Blok isi: teks, kode, catatan, rumus
- [x] Ambil data dari API
- [x] Mode terang dan gelap

### Fase 3: Progres belajar ✅
- [x] Tombol selesai dan persen progres
- [x] Disimpan di browser untuk pengunjung tanpa akun

### Fase 4: Kuis
- Soal pilihan ganda dan skor

### Fase 5: Login dan akun
- Daftar dan login (Spring Security + JWT)
- Sinkronisasi progres browser ke akun

### Fase 6: Panel admin
- Tambah, ubah, hapus kursus dan pelajaran dari web

### Fase 7: Rilis
- Tampilan HP, tes untuk bagian penting, deploy
- README lengkap dengan screenshot

### Fase 8: Pengembangan lanjutan
- Materi gelombang 2 dan 3
- Fitur yang ditunda
- Rencana penghasilan

## Cara kerja

- Satu fitur satu branch, digabung ke `main` setelah jalan
- Pesan commit yang jelas
- Tugas dicatat sebagai issue di GitHub
