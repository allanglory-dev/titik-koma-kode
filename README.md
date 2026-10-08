# Titik Koma Kode

Platform belajar IT berbahasa Indonesia. Materinya mencakup pemrograman, matematika untuk IT, bahasa Inggris untuk IT, dan topik IT lain secara bertahap.

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
| `GET /api/subjects` | Semua mata pelajaran |
| `GET /api/courses` | Semua kursus |
| `GET /api/courses/html-dasar` | Satu kursus |
| `GET /api/courses/html-dasar/lessons` | Pelajaran di satu kursus |
| `GET /api/courses/html-dasar/lessons/apa-itu-html` | Satu pelajaran |
| `GET /api/courses/html-dasar/lessons/apa-itu-html/blocks` | Blok isi satu pelajaran |

## Mengubah materi

Seluruh materi ada di `backend/src/main/resources/seed/content.json`. Ubah berkas
itu lalu jalankan ulang backend. Tabel dibuat ulang setiap kali backend dijalankan,
jadi tidak perlu menyentuh database secara manual.

## Status

Fase 0 sampai 3 selesai: model data, API baca, tampilan React, dan progres belajar.
Lihat [ROADMAP.md](ROADMAP.md) untuk fase berikutnya dan keputusan desain.
