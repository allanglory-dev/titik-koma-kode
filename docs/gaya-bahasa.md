# Panduan Gaya Bahasa

**Titik Koma Kode**
Versi 1, 14 Oktober 2026

Dokumen ini mengikat untuk seluruh materi. Kalau ada materi lama yang
melanggarnya, materi itu yang diperbaiki, bukan panduannya yang dilonggarkan.

---

## 1. Sapaan

**Pembaca disapa "Anda". Tindakan bersama memakai "kita".**

```
Benar   Anda akan sering menemui galat ini.
Benar   Mari kita susun fungsinya dari nol.
Salah   Kamu akan sering menemui galat ini.
```

Pembaca materi ini bukan hanya mahasiswa. Ada yang sudah bekerja dan pindah
dari bidang lain, dan sebagian lebih tua dari penulisnya. "Anda" sopan tanpa
membuat jarak, dan tidak terdengar seperti bicara kepada anak kuliahan saja.

Akhiran `-mu` ikut berubah: `kodemu` menjadi `kode Anda`, `membantumu` menjadi
`membantu Anda`. Hati-hati dengan kata yang kebetulan berakhiran sama tetapi
bukan kata ganti: **ilmu, tamu, bertemu, ketemu**.

Berlaku juga di dalam contoh kode. Program contoh yang meminta masukan ditulis
`input("Siapa nama Anda? ")`, bukan `input("Siapa namamu? ")`.

---

## 2. Istilah asing

**Istilah Inggris dipertahankan dan dimiringkan. Padanan Indonesianya disebut
sekali saja, di kemunculan pertama.**

```
Kemunculan pertama
  Pesan itu muncul sebagai *stack trace* (jejak tumpukan).

Seterusnya
  Baca *stack trace* dari baris paling bawah.
```

Alasannya bukan selera. Pembaca yang hanya hafal "jejak tumpukan" tidak akan
mengenali *stack trace* ketika kata itu muncul di pesan galat, di dokumentasi
resmi, di jawaban Stack Overflow, atau di wawancara kerja. Kita bahkan punya
kursus Bahasa Inggris untuk Teknologi yang tujuannya persis supaya mereka bisa
membaca sumber aslinya. Menerjemahkan istilahnya justru melawan tujuan itu.

### Yang tetap memakai istilah Inggris

```
stack trace      array          cache         broadcasting
backpropagation  gradient descent             overfitting
training set     test set       feature       label
dataframe        query          commit        deployment
garbage collector               bytecode      compiler
```

### Yang tetap memakai istilah Indonesia

Istilah yang sudah mapan di buku teks Indonesia dan akan pembaca dengar dari
dosennya. Menggantinya ke Inggris justru membuat mereka asing di kelas sendiri.

```
himpunan     simpul      sisi       graf        pohon
peluang      sebaran     turunan    integral    matriks
vektor       fungsi      relasi     bilangan    pecahan
berkas       galat       perulangan percabangan
```

Rujukannya buku Rinaldi Munir untuk matematika diskrit dan istilah graf.

### Kalau ragu

Tanyakan satu hal: **kata mana yang akan pembaca ketik di mesin pencari ketika
tersangkut?** Itu kata yang dipakai sebagai istilah utama.

---

## 3. Panjang kalimat

**Kalimat boleh dua sampai tiga klausa dan mengalir. Yang dilarang bukan
panjangnya, melainkan isi yang kosong.**

```
Terlalu patah
  Algoritma adalah urutan langkah. Tidak harus soal komputer.
  Resep masakan juga algoritma.

Pas
  Algoritma adalah urutan langkah untuk menyelesaikan persoalan, dan
  tidak harus menyangkut komputer sama sekali. Resep masakan dan
  petunjuk arah pun termasuk.
```

Yang tetap dilarang:

- Kalimat pembuka yang tidak membawa isi. *"Di dunia yang serba cepat ini…"*
- Penutup yang menggurui. *"Jadi, teruslah berlatih dan jangan menyerah!"*
- Perumpamaan yang dipaksakan. Perumpamaan dipakai hanya kalau ia benar-benar
  menjelaskan mekanismenya, bukan sekadar menghangatkan.
- Pengulangan isi paragraf sebelumnya dengan kata berbeda.

---

## 4. Nada

Sopan dan profesional, seperti penulis buku teks yang baik. Bukan seperti
pembawa acara, bukan pula seperti dokumen peraturan.

Boleh:

- Menyebut kesulitan secara jujur. *"Bagian ini memang paling sering membuat
  tersendat, dan itu wajar."*
- Menyebut apa yang akan dibahas nanti. *"Alasannya baru akan jelas di bagian
  tembolok."*
- Mengakui batas. *"Angka ini perkiraan kasar dan berbeda antar prosesor."*

Hindari:

- Seruan dan tanda seru bertumpuk.
- Memuji pembaca. *"Hebat, Anda sudah sampai di sini!"*
- Menjanjikan kemudahan yang tidak benar. *"Ternyata gampang, kan?"*

---

## 5. Penulisan kode dan istilah

| Hal | Cara menulis | Contoh |
|---|---|---|
| Nama fungsi, variabel, berkas | Kode sebaris | `` `len()` ``, `` `config.json` `` |
| Istilah Inggris dalam kalimat | Miring | `*stack trace*` |
| Penekanan | Tebal, hemat | `**Satu hal yang menentukan.**` |
| Nama diri | Biasa | James Gosling, NumPy, PostgreSQL |

Nama pustaka ditulis sesuai penulisan resminya: NumPy bukan Numpy, pandas
bukan Pandas, scikit-learn bukan Scikit-Learn, PyTorch bukan Pytorch.

---

## 6. Susunan satu bab

Susunan yang dipakai sejak awal dan tetap berlaku:

1. Satu paragraf pembuka yang menyebut persoalannya, bukan definisinya.
2. Isi, selang-seling antara penjelasan, contoh kode, dan diagram bila perlu.
3. Catatan di margin untuk hal yang mudah terlewat atau sering disalahpahami.
4. Empat latihan beserta pembahasan lengkapnya.

Panjang sasaran sekitar 1.000 sampai 1.300 kata per bab, termasuk pembahasan
latihan.

Setiap kode yang bisa dijalankan **harus sudah dijalankan** sebelum masuk
materi, dan angka yang disebut di teks harus berasal dari keluaran yang
benar-benar terukur.

---

## 7. Rujukan

Setiap kursus mencantumkan daftar rujukan di halaman kursusnya, lengkap dengan
keterangan singkat tentang bagian mana yang bersandar pada sumber itu.

Klaim angka, sejarah, dan hasil penelitian wajib punya sumber. Kalau sumbernya
lemah atau tidak konsisten antar sumber, sebutkan hal itu di materinya, jangan
dibulatkan jadi fakta.
