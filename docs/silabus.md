# Silabus Titik Koma Kode

**Jalur Data dan Kecerdasan Buatan**
Versi 2, 14 Oktober 2026

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

Delapan belas kursus: lima di bagian Umum yang bebas dipilih, tiga belas dalam
tiga tahap berurutan, ditambah tiga modul keterampilan.

### Umum — bebas dipilih

Lima kursus, seluruhnya sudah ditulis. **Bukan syarat masuk.** Bagian ini ada
supaya orang yang belum pernah menulis kode punya tempat mulai, dan supaya yang
sudah bisa tinggal melewatinya. Tidak ada urutan wajib di dalamnya; ambil yang
kamu butuhkan.

Kodenya diawali `UM` justru untuk menandai bahwa bagian ini di luar urutan
tahap. Bagian ini juga yang akan tumbuh kalau nanti ada bahasa pemrograman lain
atau topik umum lain yang layak ditambahkan.

| Kode | Judul | Jam | Isi pokok |
|---|---|---|---|
| UM01 | Pengantar Ilmu Komputer | 45 | Bagaimana mesin menyimpan segala sesuatu sebagai bilangan, dan di mana letak data serta AI |
| UM02 | Algoritma dan Pemrograman Python | 60 | Menyusun langkah dan menuliskannya dalam Python |
| UM03 | Logika Informatika | 45 | Proposisi, tabel kebenaran, kuantor. Dasar penyaringan data dan kondisi pada kueri |
| UM04 | Matematika Diskrit | 45 | Himpunan, relasi, fungsi, kombinatorik, graf |
| UM05 | Bahasa Inggris untuk Teknologi | 30 | Membaca dokumentasi dan makalah, menguraikan pesan kesalahan |

Kombinatorik di UM04 adalah pintu masuk ke peluang di DS102. Teori himpunan di
UM04 menjelaskan cara kerja penggabungan tabel di DS104. Kedua sambungan itu
disebut langsung di materinya.

### Tahap 1 — Matematika dan Data

Alas yang membuat model bisa dimengerti, bukan sekadar dijalankan.

| Kode | Judul | Jam | Isi pokok |
|---|---|---|---|
| DS101 | Aljabar Linear untuk Data | 45 | Vektor, matriks, perkalian matriks, nilai eigen |
| DS102 | Statistika dan Probabilitas | 45 | Peluang, sebaran, sampel, uji hipotesis, uji A/B |
| DS103 | Kalkulus untuk Pembelajaran Mesin | 35 | Turunan, aturan rantai, gradien, penurunan gradien |
| DS104 | SQL dan Basis Data | 40 | Kueri, penggabungan, pengelompokan, indeks |

DS103 hanya memuat bagian kalkulus yang benar-benar dipakai. Tidak ada integral
tentu, tidak ada deret Taylor. Yang ada hanya yang menjelaskan bagaimana sebuah
model memperbaiki dirinya sendiri.

### Tahap 2 — Analisis Data

Perkakas yang dipakai setiap hari.

| Kode | Judul | Jam | Isi pokok |
|---|---|---|---|
| DS201 | NumPy dan Komputasi Numerik | 35 | Larik, operasi vektor, penyiaran, bilangan pecahan dan NaN |
| DS202 | Analisis Data dengan Pandas | 45 | Memuat, membersihkan, menggabungkan, meringkas |
| DS203 | Visualisasi dan Papan Pantau | 35 | Memilih bentuk grafik, merancang papan pantau, menentukan metrik |

Tiga bab dari Organisasi Komputer yang sudah ditulis dipindahkan ke DS201:
sistem bilangan, bilangan pecahan, dan tembolok serta lokalitas. Ketiganya
persis menjelaskan kenapa NumPy jauh lebih cepat daripada perulangan biasa, dan
kenapa pelatihan model kadang menghasilkan NaN.

### Tahap 3 — Pembelajaran Mesin dan AI

| Kode | Judul | Jam | Isi pokok |
|---|---|---|---|
| DS301 | Pembelajaran Mesin | 60 | Regresi, klasifikasi, pengelompokan, penilaian model |
| DS302 | Pembelajaran Mendalam | 55 | Jaringan saraf dan perambatan balik dari NumPy |
| DS303 | Pemrosesan Bahasa Alami dan Model Bahasa | 50 | Dari pencacahan kata sampai penyematan dan transformer |
| DS304 | Dari Notebook ke Produksi | 45 | Saluran data, penyajian model, pemantauan, versi data |
| DS305 | Rekayasa Aplikasi AI | 45 | RAG, agen, perancangan prompt, dan cara menilai keluarannya |
| DS306 | Proyek Data | 50 | Satu daur penuh, dari pertanyaan bisnis sampai laporan akhir |

Setiap algoritma di DS301 ditulis sendiri lebih dulu sebelum memakai
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
| 1 | Bagian Umum, sejauh yang kamu butuhkan |
| 2 | DS104 SQL dan Basis Data |
| 3 | DS202 Analisis Data dengan Pandas |
| 4 | DS102 Statistika dan Probabilitas |
| 5 | DS203 Visualisasi dan Papan Pantau |
| 6 | DS306 Proyek Data |

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
| 1 | Bagian Umum, sejauh yang kamu butuhkan |
| 2 | DS101 Aljabar Linear, DS102 Statistika, DS103 Kalkulus |
| 3 | DS104 SQL |
| 4 | DS201 NumPy, DS202 Pandas, DS203 Visualisasi |
| 5 | DS301 Pembelajaran Mesin |
| 6 | DS302 Pembelajaran Mendalam |
| 7 | DS306 Proyek Data |

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
| 1 | Bagian Umum, sejauh yang kamu butuhkan |
| 2 | DS104 SQL dan Basis Data, lebih dalam daripada jalur lain |
| 3 | KT01 Git, KT02 Linux |
| 4 | DS201 NumPy, DS202 Pandas |
| 5 | KT03 Docker |
| 6 | DS304 Dari Notebook ke Produksi |
| 7 | DS306 Proyek Data |

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
| 1 | Bagian Umum, sejauh yang kamu butuhkan |
| 2 | DS101 Aljabar Linear, DS103 Kalkulus |
| 3 | DS201 NumPy, DS202 Pandas |
| 4 | DS301 Pembelajaran Mesin |
| 5 | DS302 Pembelajaran Mendalam |
| 6 | DS303 NLP dan Model Bahasa |
| 7 | KT01 Git, KT03 Docker, DS304 Produksi |
| 8 | DS306 Proyek Data |

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
| 1 | Bagian Umum, sejauh yang kamu butuhkan |
| 2 | DS201 NumPy, DS202 Pandas |
| 3 | DS303 NLP dan Model Bahasa |
| 4 | DS305 Rekayasa Aplikasi AI |
| 5 | KT01 Git, KT03 Docker, DS304 Produksi |
| 6 | DS306 Proyek Data |

Tidak wajib: kalkulus, dan sebagian besar DS302.

**Keluaran portofolio.** Satu aplikasi berbasis model bahasa, beserta berkas uji
dan angka yang menunjukkan seberapa sering keluarannya benar.

### Ringkasan dalam satu tabel

Tanda centang berarti wajib, tanda hubung berarti sebaiknya ada, kosong berarti
tidak perlu. Bagian Umum tidak pernah wajib di jalur mana pun: ia ada untuk
diambil seperlunya, bukan untuk dilewati seluruhnya.

| Kursus | Analyst | Scientist | Engineer | ML Eng | AI Eng |
|---|:--:|:--:|:--:|:--:|:--:|
| UM01–UM05 Umum | – | – | – | – | – |
| DS101 Aljabar Linear | | ✓ | | ✓ | |
| DS102 Statistika | ✓ | ✓ | | ✓ | – |
| DS103 Kalkulus | | ✓ | | ✓ | |
| DS104 SQL | ✓ | ✓ | ✓ | – | – |
| DS201 NumPy | – | ✓ | ✓ | ✓ | ✓ |
| DS202 Pandas | ✓ | ✓ | ✓ | ✓ | ✓ |
| DS203 Visualisasi | ✓ | ✓ | | | |
| DS301 Pembelajaran Mesin | – | ✓ | | ✓ | – |
| DS302 Pembelajaran Mendalam | | ✓ | | ✓ | – |
| DS303 NLP dan Model Bahasa | | – | | ✓ | ✓ |
| DS304 Produksi | | | ✓ | ✓ | ✓ |
| DS305 Rekayasa Aplikasi AI | | | | – | ✓ |
| DS306 Proyek Data | ✓ | ✓ | ✓ | ✓ | ✓ |
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
| J.62DMI00.001.1 | Menentukan Objektif Bisnis | DS306 |
| J.62DMI00.002.1 | Menentukan Tujuan Teknis Data Science | DS306 |
| J.62DMI00.003.1 | Membuat Rencana Proyek Data Science | DS306 |
| J.62DMI00.004.1 | Mengumpulkan Data | DS104, DS202 |
| J.62DMI00.005.1 | Menelaah Data | DS202, DS203 |
| J.62DMI00.006.1 | Memvalidasi Data | DS202 |
| J.62DMI00.007.1 | Menentukan Objek Data | DS301 |
| J.62DMI00.008.1 | Membersihkan Data | DS202 |
| J.62DMI00.009.1 | Mengkonstruksi Data | DS202, DS301 |
| J.62DMI00.010.1 | Menentukan Label Data | DS301 |
| J.62DMI00.011.1 | Mengintegrasikan Data | DS104, DS304 |
| J.62DMI00.012.1 | Membangun Skenario Model | DS301 |
| J.62DMI00.013.1 | Membangun Model | DS301, DS302 |
| J.62DMI00.014.1 | Mengevaluasi Hasil Pemodelan | DS301 |
| J.62DMI00.015.1 | Melakukan Proses Review Pemodelan | DS301 |
| J.62DMI00.016.1 | Membuat Rencana Deployment Model | DS304 |
| J.62DMI00.017.1 | Melakukan Deployment Model | DS304 |
| J.62DMI00.018.1 | Membuat Rencana Pemeliharaan Model | DS304 |
| J.62DMI00.019.1 | Melakukan Pemeliharaan Model | DS304 |
| J.62DMI00.020.1 | Melakukan Review Proyek Data Science | DS306 |
| J.62DMI00.021.1 | Melakukan Laporan Akhir Proyek Data Science | DS306 |

Seluruh 21 unit tertutup. Skema Associate Data Scientist yang diujikan LSP hanya
memakai sembilan di antaranya, yaitu unit 004 sampai 010 ditambah 013 dan 014,
dan kesembilannya ada di DS104, DS202, dan DS301.

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
| Umum | 5 | 0 | 0 |
| 1 Matematika dan Data | 0 | 2 | 2 |
| 2 Analisis Data | 0 | 3 | 0 |
| 3 ML dan AI | 0 | 2 | 4 |
| Modul | 0 | 3 | 0 |

Sudah ditulis 58.651 kata. Sisanya sekitar 150.000 kata.

Urutan pengerjaan yang disarankan, dipilih supaya tiap kursus yang selesai
langsung membuka satu jalur lebih jauh:

1. **DS201 NumPy dan Komputasi Numerik.** Hasilnya langsung terlihat, rangkanya
   sudah ada, dan tiga bab dari Organisasi Komputer bisa dipindah ke sini.
2. **DS202 Analisis Data dengan Pandas.** Menutup enam unit SKKNI sekaligus.
3. **DS104 SQL dan Basis Data.** Bersama DS202, jalur Data Analyst mulai nyata.
4. **DS102 Statistika dan Probabilitas.**
5. **DS203 Visualisasi dan Papan Pantau.** Jalur Data Analyst selesai.
6. **DS101 Aljabar Linear**, menggantikan draf lama yang babnya masih sekitar
   280 kata tanpa latihan.
7. **DS103 Kalkulus**, lalu **DS301 Pembelajaran Mesin**. Jalur Data Scientist
   selesai.
8. Sisanya: DS302, DS303, DS304, DS305, DS306, dan tiga modul keterampilan.

Jalur Data Analyst selesai paling dulu karena pintu masuknya paling lapang dan
paling cepat memberi hasil yang bisa ditunjukkan.
