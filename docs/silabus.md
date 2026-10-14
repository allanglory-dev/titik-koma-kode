# Silabus Titik Koma Kode

**Jalur Data dan Kecerdasan Buatan**
Versi 1, 14 Oktober 2026

Dokumen ini adalah sumber kebenaran untuk isi `backend/src/main/resources/seed/`.
Kalau ada perbedaan antara dokumen ini dan berkas seed, yang berlaku dokumen ini,
dan seed-nya yang diperbaiki.

---

## 1. Untuk siapa

Dua kelompok, dan keduanya dilayani oleh materi yang sama.

**Mahasiswa Informatika atau Ilmu Komputer.** Materi ini melengkapi kuliah,
bukan menggantikannya. Yang ditambahkan adalah bagian yang biasanya terlewat di
kelas: kenapa rumusnya begitu, dan bagaimana wujudnya di dalam kode.

**Orang yang pindah dari bidang lain.** Sarjana ekonomi, perawat, guru, atau
siapa pun yang mau masuk ke bidang data. Karena itu tidak ada satu pun yang
diandaikan sudah dikuasai. Tahap pertama dimulai dari cara mesin menyimpan
bilangan dan cara menulis perulangan.

Satu akibat penting dari keputusan ini: **tidak boleh ada materi yang menulis
"seperti yang sudah kamu pelajari di kuliah"**. Semua yang dibutuhkan harus ada
di dalam jalur ini.

---

## 2. Dasar penyusunan

Susunan di bawah ini tidak dikarang. Lima sumber yang dipakai:

| Sumber | Dipakai untuk |
|---|---|
| [ACM Data Science Task Force, *Computing Competencies for Undergraduate Data Science Curricula* (2021)](https://dstf.acm.org/DSTF_Final_Report.pdf) | Pembagian bidang pengetahuan dan urutan prasyaratnya |
| [SKKNI Kepmenaker 299/2020, bidang Kecerdasan Artifisial](https://uu.vlsm.org/KEPMEN/KEMNAKER/2020/KEPMENAKER-2020-299-SKKNI-Keahlian-Artificial-Intelligence.pdf) | 21 unit kompetensi yang jadi acuan sertifikasi BNSP di Indonesia |
| SKKNI Kepmenaker 268/2020, bidang Manajemen Data | Unit kompetensi untuk jalur Data Engineer |
| [Skema sertifikasi BNSP Associate Data Scientist, LSP Gunadarma](https://lsp.gunadarma.ac.id/media/skema/Skema_Ilmuwan_Data_Madya_0703222.pdf) | Unit mana saja yang benar-benar diujikan di tingkat pemula |
| Analisis lowongan AI Engineer 2026 | Pemisahan peran AI Engineer dari ML Engineer |

Satu batasan teknis ikut menentukan susunan: **materi harus bisa dijalankan di
browser**. Pyodide 0.26.4 yang dipakai di lab halaman sudah memuat NumPy,
pandas, scikit-learn, matplotlib, SciPy, statsmodels, SymPy, XGBoost, dan
LightGBM. PyTorch dan TensorFlow tidak ada. Karena itu dasar jaringan saraf
dibangun dengan NumPy, dan kerangka siap pakai baru diperkenalkan setelah
mekanismenya jelas.

Kebetulan itu menguntungkan. Menulis perambatan balik sendiri sekali jauh lebih
mengajarkan daripada memanggil `model.fit()`.

---

## 3. Peta kursus

Delapan belas kursus dalam empat tahap, ditambah tiga modul keterampilan.

### Tahap 1 — Bekal

Lima kursus, seluruhnya sudah ditulis. Ini yang membuat jalur ini bisa dimulai
oleh orang yang belum pernah menulis kode sama sekali.

| Kode | Judul | Jam | Isi pokok |
|---|---|---|---|
| DS101 | Pengantar Ilmu Komputer | 45 | Bagaimana mesin menyimpan segala sesuatu sebagai bilangan, dan di mana letak data serta AI |
| DS102 | Algoritma dan Pemrograman Python | 60 | Menyusun langkah dan menuliskannya dalam Python |
| DS103 | Logika Informatika | 45 | Proposisi, tabel kebenaran, kuantor. Dasar penyaringan data dan kondisi pada kueri |
| DS104 | Matematika Diskrit | 45 | Himpunan, relasi, fungsi, kombinatorik, graf |
| DS105 | Bahasa Inggris untuk Teknologi | 30 | Membaca dokumentasi dan makalah, menguraikan pesan kesalahan |

Kombinatorik di DS104 adalah pintu masuk ke peluang di DS202. Teori himpunan di
DS104 menjelaskan cara kerja penggabungan tabel di DS204. Kedua sambungan itu
disebut langsung di materinya.

### Tahap 2 — Matematika dan Data

Alas yang membuat model bisa dimengerti, bukan sekadar dijalankan.

| Kode | Judul | Jam | Isi pokok |
|---|---|---|---|
| DS201 | Aljabar Linear untuk Data | 45 | Vektor, matriks, perkalian matriks, nilai eigen |
| DS202 | Statistika dan Probabilitas | 45 | Peluang, sebaran, sampel, uji hipotesis, uji A/B |
| DS203 | Kalkulus untuk Pembelajaran Mesin | 35 | Turunan, aturan rantai, gradien, penurunan gradien |
| DS204 | SQL dan Basis Data | 40 | Kueri, penggabungan, pengelompokan, indeks |

DS203 hanya memuat bagian kalkulus yang benar-benar dipakai. Tidak ada integral
tentu, tidak ada deret Taylor. Yang ada hanya yang menjelaskan bagaimana sebuah
model memperbaiki dirinya sendiri.

### Tahap 3 — Analisis Data

Perkakas yang dipakai setiap hari.

| Kode | Judul | Jam | Isi pokok |
|---|---|---|---|
| DS301 | NumPy dan Komputasi Numerik | 35 | Larik, operasi vektor, penyiaran, bilangan pecahan dan NaN |
| DS302 | Analisis Data dengan Pandas | 45 | Memuat, membersihkan, menggabungkan, meringkas |
| DS303 | Visualisasi dan Papan Pantau | 35 | Memilih bentuk grafik, merancang papan pantau, menentukan metrik |

Tiga bab dari Organisasi Komputer yang sudah ditulis dipindahkan ke DS301:
sistem bilangan, bilangan pecahan, dan tembolok serta lokalitas. Ketiganya
persis menjelaskan kenapa NumPy jauh lebih cepat daripada perulangan biasa, dan
kenapa pelatihan model kadang menghasilkan NaN.

### Tahap 4 — Pembelajaran Mesin dan AI

| Kode | Judul | Jam | Isi pokok |
|---|---|---|---|
| DS401 | Pembelajaran Mesin | 60 | Regresi, klasifikasi, pengelompokan, penilaian model |
| DS402 | Pembelajaran Mendalam | 55 | Jaringan saraf dan perambatan balik dari NumPy |
| DS403 | Pemrosesan Bahasa Alami dan Model Bahasa | 50 | Dari pencacahan kata sampai penyematan dan transformer |
| DS404 | Dari Notebook ke Produksi | 45 | Saluran data, penyajian model, pemantauan, versi data |
| DS405 | Rekayasa Aplikasi AI | 45 | RAG, agen, perancangan prompt, dan cara menilai keluarannya |
| DS406 | Proyek Data | 50 | Satu daur penuh, dari pertanyaan bisnis sampai laporan akhir |

Setiap algoritma di DS401 ditulis sendiri lebih dulu sebelum memakai
scikit-learn. Regresi linear, pohon keputusan, dan k-rata-rata cukup sederhana
untuk dibangun dalam tiga puluh baris, dan sekali membangunnya mengubah cara
membaca dokumentasi selamanya.

### Modul keterampilan

Tidak masuk tahap mana pun, tapi dipakai hampir setiap hari begitu bekerja
dengan data sungguhan.

| Kode | Judul | Jam |
|---|---|---|
| KT01 | Git dan GitHub | 20 |
| KT02 | Linux dan Baris Perintah | 20 |
| KT03 | Docker | 20 |

---

## 4. Lima jalur peran

Pembagian peran di bawah ini mengikuti pembagian yang benar-benar dipakai saat
merekrut. Satu catatan jujur: **judul jabatan tidak seragam antar perusahaan**.
Yang menentukan isi pekerjaannya adalah uraian lowongannya, bukan namanya.

### Data Analyst

**Pekerjaannya.** Menjawab apa yang terjadi dan kenapa. Menulis kueri,
membersihkan data, membuat papan pantau, lalu menjelaskan temuannya kepada orang
yang bukan teknis.

**Pintu masuk paling lapang**, dan jalur yang paling sering dipakai orang yang
pindah dari bidang lain. Matematikanya paling ringan di antara kelima jalur.

| Urutan | Kursus |
|---|---|
| 1 | DS101–DS105 Bekal |
| 2 | DS204 SQL dan Basis Data |
| 3 | DS302 Analisis Data dengan Pandas |
| 4 | DS202 Statistika dan Probabilitas |
| 5 | DS303 Visualisasi dan Papan Pantau |
| 6 | DS406 Proyek Data |

Tidak perlu: aljabar linear, kalkulus, pembelajaran mendalam.

**Keluaran portofolio.** Satu papan pantau dari data nyata, beserta tulisan yang
menjelaskan keputusan apa yang bisa diambil darinya.

### Data Scientist

**Pekerjaannya.** Menjawab pertanyaan yang belum punya jawaban baku. Menyusun
hipotesis, merancang percobaan, membangun model, dan menilai apakah hasilnya
benar-benar berarti.

Menuntut dasar matematika yang lebih kuat daripada jalur analis.

| Urutan | Kursus |
|---|---|
| 1 | DS101–DS105 Bekal |
| 2 | DS201 Aljabar Linear, DS202 Statistika, DS203 Kalkulus |
| 3 | DS204 SQL |
| 4 | DS301 NumPy, DS302 Pandas, DS303 Visualisasi |
| 5 | DS401 Pembelajaran Mesin |
| 6 | DS402 Pembelajaran Mendalam |
| 7 | DS406 Proyek Data |

**Keluaran portofolio.** Satu model beserta laporan yang menyebutkan batas
kemampuannya, bukan cuma angka ketepatannya.

### Data Engineer

**Pekerjaannya.** Membangun jalan supaya datanya sampai. Saluran yang
memindahkan data dari sumbernya ke tempat yang bisa dipakai analis dan model,
lalu menjaganya tetap jalan.

Lebih dekat ke rekayasa perangkat lunak daripada ke statistika. Matematikanya
paling ringan, kodenya paling berat.

| Urutan | Kursus |
|---|---|
| 1 | DS101–DS105 Bekal |
| 2 | DS204 SQL dan Basis Data, lebih dalam daripada jalur lain |
| 3 | KT01 Git, KT02 Linux |
| 4 | DS301 NumPy, DS302 Pandas |
| 5 | KT03 Docker |
| 6 | DS404 Dari Notebook ke Produksi |
| 7 | DS406 Proyek Data |

Tidak perlu: kalkulus, pembelajaran mendalam.

**Keluaran portofolio.** Satu saluran data yang berjalan terjadwal, lengkap
dengan penanganan data yang datang rusak.

### Machine Learning Engineer

**Pekerjaannya.** Melatih model dan membuatnya bekerja di luar notebook.
Menyetel, mengukur di keadaan nyata, menyajikan lewat layanan, dan memantau
apakah mutunya menurun.

Menuntut dasar matematika seorang data scientist sekaligus kebiasaan kerja
seorang rekayasawan. Jalur paling berat dari kelimanya.

| Urutan | Kursus |
|---|---|
| 1 | DS101–DS105 Bekal |
| 2 | DS201 Aljabar Linear, DS203 Kalkulus |
| 3 | DS301 NumPy, DS302 Pandas |
| 4 | DS401 Pembelajaran Mesin |
| 5 | DS402 Pembelajaran Mendalam |
| 6 | DS403 NLP dan Model Bahasa |
| 7 | KT01 Git, KT03 Docker, DS404 Produksi |
| 8 | DS406 Proyek Data |

**Keluaran portofolio.** Satu model yang disajikan lewat layanan, beserta
pemantauan yang menunjukkan mutunya dari waktu ke waktu.

### AI Engineer

**Pekerjaannya.** Membangun produk di atas model yang sudah dilatih orang lain.
Perancangan prompt, pengambilan konteks, orkestrasi agen, dan yang paling sering
diremehkan, **penilaian keluaran**.

Pembedaannya dari ML Engineer cukup tegas: kalau timmu melatih model dari datanya
sendiri, itu ML Engineer. Kalau timmu memanggil model yang dilatih orang lain dan
membangun produk di sekitarnya, itu AI Engineer.

Dari analisis lowongan 2026, yang paling sering diminta adalah RAG (sekitar 36
persen), perancangan prompt (29 persen), penyambungan model bahasa (25 persen),
dan agen (14 persen). Penyetelan ulang model justru paling jarang, sekitar 9
persen. Python muncul di 83 persen lowongan.

| Urutan | Kursus |
|---|---|
| 1 | DS101–DS105 Bekal |
| 2 | DS301 NumPy, DS302 Pandas |
| 3 | DS403 NLP dan Model Bahasa |
| 4 | DS405 Rekayasa Aplikasi AI |
| 5 | KT01 Git, KT03 Docker, DS404 Produksi |
| 6 | DS406 Proyek Data |

Tidak wajib: kalkulus, dan sebagian besar DS402.

**Keluaran portofolio.** Satu aplikasi berbasis model bahasa, beserta berkas uji
dan angka yang menunjukkan seberapa sering keluarannya benar.

### Ringkasan dalam satu tabel

Tanda centang berarti wajib, tanda hubung berarti sebaiknya ada, kosong berarti
tidak perlu.

| Kursus | Analyst | Scientist | Engineer | ML Eng | AI Eng |
|---|:--:|:--:|:--:|:--:|:--:|
| DS101–105 Bekal | ✓ | ✓ | ✓ | ✓ | ✓ |
| DS201 Aljabar Linear | | ✓ | | ✓ | |
| DS202 Statistika | ✓ | ✓ | | ✓ | – |
| DS203 Kalkulus | | ✓ | | ✓ | |
| DS204 SQL | ✓ | ✓ | ✓ | – | – |
| DS301 NumPy | – | ✓ | ✓ | ✓ | ✓ |
| DS302 Pandas | ✓ | ✓ | ✓ | ✓ | ✓ |
| DS303 Visualisasi | ✓ | ✓ | | | |
| DS401 Pembelajaran Mesin | – | ✓ | | ✓ | – |
| DS402 Pembelajaran Mendalam | | ✓ | | ✓ | – |
| DS403 NLP dan Model Bahasa | | – | | ✓ | ✓ |
| DS404 Produksi | | | ✓ | ✓ | ✓ |
| DS405 Rekayasa Aplikasi AI | | | | – | ✓ |
| DS406 Proyek Data | ✓ | ✓ | ✓ | ✓ | ✓ |
| KT01 Git | – | – | ✓ | ✓ | ✓ |
| KT02 Linux | | | ✓ | ✓ | – |
| KT03 Docker | | | ✓ | ✓ | ✓ |

---

## 5. Pemetaan ke SKKNI

SKKNI Kepmenaker 299/2020 memuat 21 unit kompetensi yang menutup seluruh daur
proyek data science. Unit-unit inilah yang diujikan pada sertifikasi BNSP di
Indonesia, jadi menutupnya memberi nilai yang nyata bagi pembaca.

| Unit | Judul | Ditutup oleh |
|---|---|---|
| J.62DMI00.001.1 | Menentukan Objektif Bisnis | DS406 |
| J.62DMI00.002.1 | Menentukan Tujuan Teknis Data Science | DS406 |
| J.62DMI00.003.1 | Membuat Rencana Proyek Data Science | DS406 |
| J.62DMI00.004.1 | Mengumpulkan Data | DS204, DS302 |
| J.62DMI00.005.1 | Menelaah Data | DS302, DS303 |
| J.62DMI00.006.1 | Memvalidasi Data | DS302 |
| J.62DMI00.007.1 | Menentukan Objek Data | DS401 |
| J.62DMI00.008.1 | Membersihkan Data | DS302 |
| J.62DMI00.009.1 | Mengkonstruksi Data | DS302, DS401 |
| J.62DMI00.010.1 | Menentukan Label Data | DS401 |
| J.62DMI00.011.1 | Mengintegrasikan Data | DS204, DS404 |
| J.62DMI00.012.1 | Membangun Skenario Model | DS401 |
| J.62DMI00.013.1 | Membangun Model | DS401, DS402 |
| J.62DMI00.014.1 | Mengevaluasi Hasil Pemodelan | DS401 |
| J.62DMI00.015.1 | Melakukan Proses Review Pemodelan | DS401 |
| J.62DMI00.016.1 | Membuat Rencana Deployment Model | DS404 |
| J.62DMI00.017.1 | Melakukan Deployment Model | DS404 |
| J.62DMI00.018.1 | Membuat Rencana Pemeliharaan Model | DS404 |
| J.62DMI00.019.1 | Melakukan Pemeliharaan Model | DS404 |
| J.62DMI00.020.1 | Melakukan Review Proyek Data Science | DS406 |
| J.62DMI00.021.1 | Melakukan Laporan Akhir Proyek Data Science | DS406 |

Seluruh 21 unit tertutup. Skema Associate Data Scientist yang diujikan LSP hanya
memakai sembilan di antaranya, yaitu unit 004 sampai 010 ditambah 013 dan 014,
dan kesembilannya ada di DS204, DS302, dan DS401.

**Catatan yang perlu dipegang.** Menutup unitnya bukan berarti menerbitkan
sertifikatnya. Sertifikat BNSP hanya boleh dikeluarkan Lembaga Sertifikasi
Profesi berlisensi. Yang boleh dijanjikan jalur ini adalah kesiapan menghadapi
ujiannya, bukan sertifikatnya.

---

## 6. Yang membedakan dari yang sudah ada

Tiga hal, dan semuanya bisa diperiksa.

**Rumusnya diturunkan, tidak disodorkan.** Kebanyakan materi data berbahasa
Indonesia berhenti di tingkat memanggil pustaka. Di sini setiap algoritma
ditulis sendiri lebih dulu. Perambatan balik ditulis dengan NumPy sebelum
menyentuh kerangka siap pakai.

**Bisa dijalankan tanpa memasang apa pun.** Seluruh tumpukan data science jalan
di dalam browser lewat Pyodide. Mahasiswa dengan laptop pas-pasan bisa langsung
latihan, tanpa `pip install`, tanpa pengaturan lingkungan, tanpa CUDA. Ini
keunggulan yang tidak dimiliki platform pembanding mana pun di Indonesia.

**Terhubung ke SKKNI.** Pembaca bisa tahu persis unit kompetensi mana yang sudah
dikuasainya, dengan kode unit yang sama seperti yang dipakai di ujian sertifikasi.

---

## 7. Keadaan sekarang dan urutan pengerjaan

| Tahap | Ditulis | Rangka | Kosong |
|---|---|---|---|
| 1 Bekal | 5 | 0 | 0 |
| 2 Matematika dan Data | 0 | 2 | 2 |
| 3 Analisis Data | 0 | 3 | 0 |
| 4 ML dan AI | 0 | 2 | 4 |
| Modul | 0 | 3 | 0 |

Sudah ditulis 58.651 kata. Sisanya sekitar 150.000 kata.

Urutan pengerjaan yang disarankan, dipilih supaya tiap kursus yang selesai
langsung membuka satu jalur lebih jauh:

1. **DS301 NumPy dan Komputasi Numerik.** Hasilnya langsung terlihat, rangkanya
   sudah ada, dan tiga bab dari Organisasi Komputer bisa dipindah ke sini.
2. **DS302 Analisis Data dengan Pandas.** Menutup enam unit SKKNI sekaligus.
3. **DS204 SQL dan Basis Data.** Bersama DS302, jalur Data Analyst mulai nyata.
4. **DS202 Statistika dan Probabilitas.**
5. **DS303 Visualisasi dan Papan Pantau.** Jalur Data Analyst selesai.
6. **DS201 Aljabar Linear**, menggantikan draf lama yang babnya masih sekitar
   280 kata tanpa latihan.
7. **DS203 Kalkulus**, lalu **DS401 Pembelajaran Mesin**. Jalur Data Scientist
   selesai.
8. Sisanya: DS402, DS403, DS404, DS405, DS406, dan tiga modul keterampilan.

Jalur Data Analyst selesai paling dulu karena pintu masuknya paling lapang dan
paling cepat memberi hasil yang bisa ditunjukkan.
