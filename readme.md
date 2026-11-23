# TiketIn

TiketIn adalah aplikasi *online ticketing* untuk mempermudah pemesanan tiket event dan konser. Pengguna dapat melihat daftar event, membuka detail event, lalu memesan tiket. Admin dapat menambahkan dan mengelola data event.

Project ini dikembangkan secara bertahap sepanjang semester untuk mata kuliah Perancangan dan Pemrograman Web. README ini akan terus diperbarui setiap minggu.

## Teknologi

| Bagian | Teknologi |
|---|---|
| Struktur | HTML5 (semantic) |
| Styling | CSS native (minggu 3), Bootstrap 5.3 (minggu 4) |
| Interaksi | JavaScript dan jQuery 3.7.1 (minggu 5) |
| Data | Data dummy di `script.js` (belum terhubung backend) |

## Cara Menjalankan

1. Clone repository ini.
2. Buka `index.html` di browser.
3. Pastikan terhubung internet, karena Bootstrap dan jQuery dimuat lewat CDN.

## Struktur Folder

```
tiketin-app/
├── index.html          # dashboard + daftar event
├── event-form.html     # form tambah/edit event
├── event-detail.html   # detail event + form pemesanan tiket
├── style.css           # CSS native (minggu 3)
├── custom.css          # penyesuaian warna di atas Bootstrap (minggu 4-5)
├── script.js           # JavaScript dan jQuery (minggu 5)
├── assets/             # logo dan poster event
├── docs/screenshots/   # screenshot tiap minggu
└── README.md
```

## Halaman

| Halaman | File | Fungsi |
|---|---|---|
| Dashboard / Daftar Event | `index.html` | Ringkasan data, event terbaru, dan tabel semua event |
| Form Event | `event-form.html` | Menambahkan atau mengedit data event |
| Detail Event | `event-detail.html` | Informasi lengkap event dan pemesanan tiket |

---

## Riwayat Update

### Week 1 - Penentuan Studi Kasus
Menentukan studi kasus aplikasi yang dipakai sampai akhir semester, yaitu **TiketIn**: aplikasi pemesanan tiket event dan konser. Data utama aplikasi adalah data event (nama, kategori, tanggal, lokasi, harga, kuota tiket) dan data pemesanan tiket.

### Week 2 - HTML
Membangun struktur halaman memakai HTML murni (belum ada styling).

- Tiga halaman: daftar event, form tambah/edit event, dan detail event.
- Elemen dasar yang dipakai: heading, paragraf, hyperlink, tabel, gambar, dan elemen form (`input`, `select`, `textarea`).
- **Semantic HTML5**: `header`, `nav`, `main`, `section`, `article`, `footer`.
- **Aksesibilitas dasar**: setiap `<img>` punya atribut `alt` yang deskriptif, dan setiap input form terhubung ke `<label>` lewat pasangan `for` dan `id`.

### Week 3 - CSS (04/10/2026)
Menerapkan styling CSS native (tanpa framework) pada HTML minggu 2.

- **External stylesheet**: `style.css` dihubungkan ke seluruh halaman lewat `<link>`.
- **Font properties**: `font-family`, `font-size`, dan `font-weight` untuk heading dan teks isi.
- **List properties**: `list-style-type` pada navigasi (`.nav-list`).
- **Text alignment**: `text-align` pada header, label form, dan heading.
- **Warna konsisten**: ungu (`#4a148c`, `#7b1fa2`) dan oranye (`#ff6f00`) sebagai identitas warna TiketIn.
- **`<div>` dan `<span>`** untuk mengelompokkan elemen: `.card`, `.card-content`, `.form-group`, `.harga`, `.tanggal`, `.footer-content`.
- **Responsive**: `@media (max-width: 576px)` mengubah navigasi dari horizontal (flex row) menjadi vertikal (flex column) di layar sempit, serta menyesuaikan ukuran gambar dan tabel.
- Catatan: *positioning* belum diterapkan dan akan dilengkapi secara berkala.

### Week 4 - Kerangka Tampilan dengan Bootstrap
Tampilan dibangun ulang memakai **Bootstrap 5.3** (via CDN). Warna khas TiketIn dipertahankan lewat `custom.css` yang kecil. Halaman Bootstrap tidak lagi memakai `style.css`, karena class-nya bentrok dengan Bootstrap. File `style.css` tetap disimpan sebagai hasil minggu 3.

- **Dashboard** (`index.html`): kartu ringkasan dan kartu event terbaru memakai layout grid (`container`, `row`, `col-*`).
- **Halaman tabel**: daftar semua event memakai `table table-striped table-hover` di dalam `table-responsive`, jadi tabel bisa digeser di layar kecil.
- **Halaman form** (`event-form.html`): form horizontal (`row`, `col-sm-*`, `form-control`, `form-select`).
- **Detail event** (`event-detail.html`): layout dua kolom, poster di kiri dan informasi di kanan.
- **Navbar responsif**: tampil horizontal di layar lebar dan berubah menjadi hamburger menu di layar kecil (`navbar-expand-lg` dan `navbar-toggler`).

**Alasan memilih Bootstrap:** TiketIn didominasi komponen yang berulang, yaitu navbar, kartu event, tabel data, dan form. Bootstrap sudah menyediakan semuanya dengan grid 12 kolom dan komponen responsif bawaan, jadi tidak perlu menulis CSS dari nol di setiap halaman. Waktu pengerjaan bisa lebih banyak dipakai untuk logika aplikasi (JavaScript, React, lalu backend) di minggu berikutnya. Kekurangannya, tampilan cenderung mirip situs Bootstrap lain, sehingga identitas TiketIn ditambahkan lewat `custom.css`.

| Halaman | Desktop | Mobile |
|---|---|---|
| Dashboard | ![](docs/screenshots/w4-index-desktop.png) | ![](docs/screenshots/w4-index-mobile.png) |
| Form Event | ![](docs/screenshots/w4-form-desktop.png) | ![](docs/screenshots/w4-form-mobile.png) |
| Detail Event | ![](docs/screenshots/w4-detail-desktop.png) | ![](docs/screenshots/w4-detail-mobile.png) |

Navbar di layar mobile (menu terbuka):

![](docs/screenshots/w4-navbar-mobile-terbuka.png)

### Week 5 - JavaScript dan jQuery
Menambahkan interaktivitas di halaman yang sama lewat satu file `script.js` dan library jQuery 3.7.1. Tidak ada halaman baru. Data masih dummy, jadi perubahan data hilang saat halaman dimuat ulang.

**JavaScript murni**
- **Data dummy**: `dataEvent`, yaitu array of object berisi data event (nama, kategori, tanggal, lokasi, harga, sisa tiket).
- **Function pemroses data**:
  - `hitungStatistik()` menghitung jumlah event, total tiket, harga termurah, dan jumlah kategori.
  - `cariEvent()` memfilter berdasarkan kategori dan kata kunci, lalu mengurutkan hasilnya.
- **Perulangan dan percabangan** (`for`, `forEach`, `if/else`) dipakai untuk merender kartu dan tabel dari array, bukan ditulis manual di HTML.
- Halaman detail membaca `?id=` dari alamat halaman, sehingga tiap event punya halaman detailnya sendiri.

**jQuery**

| Fitur | Halaman | Efek / event |
|---|---|---|
| Panel "Filter & Urutkan" | `index.html` | `slideToggle()` saat tombol diklik |
| Cari, filter kategori, urutkan | `index.html` | `on("input")` dan `on("change")` |
| Hapus event dari tampilan | `index.html` | `on("click")`, `fadeOut()`, statistik ikut diperbarui |
| Validasi form tambah event | `event-form.html` | `on("submit")`, cek field kosong dan nilai tidak wajar |
| Daftar event yang baru ditambah | `event-form.html` | `fadeIn()` dan `fadeOut()`, tombol hapus per baris |
| Total harga otomatis | `event-detail.html` | `on("change")` pada jumlah tiket |
| Validasi form pemesanan tiket | `event-detail.html` | cek nama, email, dan sisa tiket; sisa tiket berkurang |
| Notifikasi | semua halaman | `fadeIn()`, `delay()`, `fadeOut()` |


| Interaksi | Sebelum | Sesudah |
|---|---|---|
| Filter kategori "Musik" | ![](docs/screenshots/w5-filter-sebelum.png) | ![](docs/screenshots/w5-filter-sesudah.png) |
| Hapus event | ![](docs/screenshots/w5-hapus-sebelum.png) | ![](docs/screenshots/w5-hapus-sesudah.png) |
| Validasi form tambah event | ![](docs/screenshots/w5-form-sebelum.png) | ![](docs/screenshots/w5-form-error.png) |
| Tambah event berhasil | ![](docs/screenshots/w5-form-error.png) | ![](docs/screenshots/w5-form-sukses.png) |
| Pesan tiket | ![](docs/screenshots/w5-detail-sebelum.png) | ![](docs/screenshots/w5-detail-sesudah.png) |

---

## Rencana Berikutnya
Project akan terus dikembangkan secara bertahap, antara lain ke React, konsumsi API, lalu backend dan database. README ini akan diperbarui setiap ada update.
