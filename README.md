# Titik Koma Kode

Teman belajar untuk mahasiswa Teknik Informatika dan Ilmu Komputer.

Materi kuliah yang sering bikin nyangkut, dijelaskan dalam bahasa Indonesia dan bisa
diutak-atik langsung di halamannya. Bukan pengganti kuliah, bukan lembaga pendidikan,
dan tidak menerbitkan ijazah atau gelar.

## Fokus

Mahasiswa Informatika punya kesulitan yang berulang: beberapa mata kuliah terkenal
bikin banyak orang tersendat, penjelasan di kelas cepat dan abstrak, dan buku acuannya
berbahasa Inggris. Sebagian konsep baru terasa masuk ketika dilihat bergerak, bukan
dibaca.

Platform ini menyasar celah itu.

## Susunan

43 topik yang mengikuti mata kuliah Informatika, dikelompokkan dalam empat tahap dari
dasar sampai penutup. Tiap topik punya perkiraan waktu, daftar hal yang bisa dilakukan
setelah menuntaskannya, dan prasyarat yang saling terhubung sehingga urutan belajarnya
jelas.

Di balik layar, rangkanya mengacu pada pembagian 17 bidang pengetahuan
[CS2023](https://csed.acm.org/knowledge-areas/) dari ACM dan IEEE, serta pola semester
program sarjana Informatika di Indonesia. Istilah akademiknya sengaja tidak ditampilkan
agar terasa seperti teman belajar, bukan ruang kuliah.

Proyek ini dibuat untuk tiga tujuan: belajar, portofolio, dan merintis usaha.

## Fitur yang direncanakan

- Daftar mata pelajaran, kursus, dan pelajaran
- Halaman pelajaran dengan blok isi: teks, rumus, kode, dan kuis
- Bagian "Coba Sendiri" (editor kode dan latihan)
- Kuis dengan skor
- Progres belajar
- Login opsional: pengunjung tanpa akun tetap bisa belajar, progresnya disimpan di browser
- Panel admin untuk mengelola kursus dan pelajaran

## Teknologi

| Bagian | Pilihan |
|---|---|
| Backend | Java + Spring Boot (Maven) |
| Database | PostgreSQL + Spring Data JPA |
| Frontend | React + Vite |
| Version control | Git + GitHub |

## Struktur folder

```
titik-koma-kode/
├── backend/    Spring Boot (API)
├── frontend/   React (tampilan)
├── README.md
└── ROADMAP.md
```

## Menjalankan di komputer sendiri

**Yang perlu ada:** JDK 21 atau lebih baru, Node.js 20 atau lebih baru, dan PostgreSQL.

**1. Siapkan database**

```bash
psql -U postgres -c "CREATE DATABASE titikkoma;"
```

**2. Isi password database**

Buat file `backend/src/main/resources/application-local.properties`:

```properties
spring.datasource.password=password_postgres_anda
```

File ini sengaja tidak masuk repo.

**3. Jalankan backend** (port 8080)

```bash
cd backend && ./mvnw spring-boot:run
```

**4. Jalankan frontend** (port 5173)

```bash
cd frontend && npm install && npm run dev
```

Buka `http://localhost:5173`.

## API

Kursus dan pelajaran dialamatkan dengan slug, bukan id. Slug dibuat dari judulnya,
jadi alamatnya tetap sama walau materi dimuat ulang.

| Endpoint | Isi |
|---|---|
| `GET /api/areas` | 17 bidang pengetahuan CS2023 |
| `GET /api/courses` | Semua mata kuliah, bisa disaring `?semester=2` atau `?area=SDF` |
| `GET /api/courses/pemrograman-web` | Satu mata kuliah beserta capaian dan prasyaratnya |
| `GET /api/courses/pemrograman-web/lessons` | Pelajaran di satu mata kuliah |
| `GET /api/courses/pemrograman-web/lessons/apa-itu-html` | Satu pelajaran |
| `GET /api/courses/pemrograman-web/lessons/apa-itu-html/blocks` | Blok isi satu pelajaran |

## Mengubah kurikulum

Seluruh kurikulum ada di satu berkas: `backend/src/main/resources/seed/kurikulum.json`.
Ubah berkas itu lalu jalankan ulang backend. Tabel dibuat ulang setiap kali backend
dijalankan, jadi tidak perlu menyentuh database secara manual.

Saat dimuat, prasyarat setiap mata kuliah diperiksa. Bila ada yang menunjuk kode
yang tidak terdaftar, aplikasi berhenti dengan pesan yang menyebut kodenya.

## Status materi

Rangka 43 topik sudah lengkap: perkiraan waktu, capaian, dan prasyarat. Isi
pelajarannya ditulis bertahap, dimulai dari Pemrograman Web.

Materi HTML disusun dari [MDN Web Docs](https://developer.mozilla.org), ditulis ulang
dalam bahasa Indonesia.

## Status

Fase 0 sampai 3 selesai: model data, API baca, tampilan React, dan progres belajar.
Lihat [ROADMAP.md](ROADMAP.md) untuk fase berikutnya dan keputusan desain.
