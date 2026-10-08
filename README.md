# Titik Koma Kode

Kurikulum Informatika empat tahun yang bisa ditempuh secara mandiri, berbahasa Indonesia.

43 mata kuliah, 134 SKS, delapan semester. Strukturnya disusun mengikuti pembagian
17 bidang pengetahuan [CS2023](https://csed.acm.org/knowledge-areas/) dari ACM dan IEEE,
dengan pola semester dan bobot SKS seperti program sarjana Informatika di Indonesia.
Mata kuliah umum di luar bidang keilmuan tidak disertakan.

Setiap mata kuliah punya kode, bobot SKS, bidang, capaian pembelajaran, dan prasyarat
yang saling terhubung, sehingga urutan belajarnya jelas.

Proyek ini dibuat untuk tiga tujuan: belajar, portofolio, dan peluang penghasilan tambahan.

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

Kerangka kurikulum sudah lengkap untuk 43 mata kuliah: kode, SKS, bidang, capaian
pembelajaran, dan prasyarat. Isi pelajarannya masih diisi bertahap, dimulai dari
IF205 Pemrograman Web.

## Status

Fase 0 sampai 3 selesai: model data, API baca, tampilan React, dan progres belajar.
Lihat [ROADMAP.md](ROADMAP.md) untuk fase berikutnya dan keputusan desain.
