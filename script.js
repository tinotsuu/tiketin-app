// =====================================================
// script.js - TiketIn
// Minggu 5: JavaScript murni + jQuery
// Dipakai di: index.html, event-form.html, event-detail.html
// =====================================================


// ---------- 1. DATA DUMMY (array of object) ----------
// Setiap objek = satu event. Data ini menggantikan isi tabel/kartu
// yang dulu ditulis manual di HTML.
let dataEvent = [
  {
    id: 1,
    nama: "Konser Kolaborasi Musisi Indonesia",
    kategori: "Musik",
    tanggal: "2026-10-12",
    waktu: "19:00 WIB - Selesai",
    lokasi: "Telkom University Convention Hall",
    harga: 300000,
    sisa: 320,
    gambar: "assets/konser1.jpg",
    unggulan: true,
    deskripsi: "Konser kolaborasi musisi Indonesia menghadirkan lineup terbaik tanah air dalam satu panggung megah. Nikmati penampilan spesial dengan tata suara dan visual kelas dunia di Telkom University Convention Hall."
  },
  {
    id: 2,
    nama: "Jazz Fest Bandung",
    kategori: "Musik",
    tanggal: "2026-10-26",
    waktu: "16:00 WIB - Selesai",
    lokasi: "Taman Lalu Lintas Bandung",
    harga: 350000,
    sisa: 150,
    gambar: "assets/konser1.jpg",
    unggulan: false,
    deskripsi: "Festival musik jazz outdoor dengan suasana santai dari sore hingga malam hari di tengah kota Bandung."
  },
  {
    id: 3,
    nama: "Teater Anu",
    kategori: "Teater",
    tanggal: "2026-10-02",
    waktu: "19:30 WIB - Selesai",
    lokasi: "Taman Gasibu Bandung",
    harga: 150000,
    sisa: 80,
    gambar: "assets/teater1.jpg",
    unggulan: true,
    deskripsi: "Pertunjukan teater klasik dengan sentuhan modern yang dibawakan oleh komunitas teater kampus."
  },
  {
    id: 4,
    nama: "Festival Kuliner Nusantara",
    kategori: "Festival",
    tanggal: "2026-11-14",
    waktu: "10:00 WIB - 21:00 WIB",
    lokasi: "Lapangan Gasibu Bandung",
    harga: 50000,
    sisa: 500,
    gambar: "assets/konser1.jpg",
    unggulan: false,
    deskripsi: "Ratusan stan makanan khas Nusantara, lengkap dengan panggung hiburan musik akustik."
  },
  {
    id: 5,
    nama: "Turnamen Futsal Antar Kampus",
    kategori: "Olahraga",
    tanggal: "2026-11-28",
    waktu: "08:00 WIB - 17:00 WIB",
    lokasi: "GOR Pajajaran Bandung",
    harga: 75000,
    sisa: 200,
    gambar: "assets/teater1.jpg",
    unggulan: false,
    deskripsi: "Turnamen futsal antar kampus se-Bandung Raya. Tiket untuk penonton umum."
  }
];

// event yang ditambah lewat form (dummy, hanya ada selama halaman terbuka)
let eventBaru = [];


// ---------- 2. FUNCTION (JavaScript murni) ----------

// 85000 -> "Rp 85.000"
function formatRupiah(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}

// "2026-10-12" -> "12 Oktober 2026"
function formatTanggal(iso) {
  const tgl = new Date(iso + "T00:00:00");
  return tgl.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

// mencari satu event berdasarkan id
function cariEventById(id) {
  return dataEvent.find(function (e) {
    return e.id === id;
  });
}

// MENGHITUNG: jumlah event, total tiket, harga termurah, jumlah kategori
function hitungStatistik(daftar) {
  let totalTiket = 0;
  let termurah = null;
  const kategoriUnik = [];

  for (let i = 0; i < daftar.length; i++) {
    totalTiket += daftar[i].sisa;

    if (termurah === null || daftar[i].harga < termurah) {
      termurah = daftar[i].harga;
    }
    if (kategoriUnik.indexOf(daftar[i].kategori) === -1) {
      kategoriUnik.push(daftar[i].kategori);
    }
  }

  return {
    jumlah: daftar.length,
    totalTiket: totalTiket,
    termurah: termurah,
    jumlahKategori: kategoriUnik.length
  };
}

// MEMFILTER dan MENGURUTKAN daftar event
function cariEvent(daftar, kategori, kataKunci, urutan) {
  const hasil = daftar.filter(function (e) {
    const cocokKategori = kategori === "semua" || e.kategori === kategori;
    const cocokNama = e.nama.toLowerCase().includes(kataKunci.toLowerCase());
    return cocokKategori && cocokNama;
  });

  if (urutan === "murah") {
    hasil.sort(function (a, b) { return a.harga - b.harga; });
  } else if (urutan === "mahal") {
    hasil.sort(function (a, b) { return b.harga - a.harga; });
  } else if (urutan === "tanggal") {
    hasil.sort(function (a, b) { return a.tanggal.localeCompare(b.tanggal); });
  }

  return hasil;
}


// ---------- 3. TAMPILAN: render data dari array ke halaman ----------

// kartu ringkasan di dashboard (index.html)
function tampilkanStatistik() {
  const s = hitungStatistik(dataEvent);
  $("#statTotal").text(s.jumlah);
  $("#statTiket").text(s.totalTiket.toLocaleString("id-ID"));
  $("#statTermurah").text(s.termurah === null ? "-" : formatRupiah(s.termurah));
  $("#statKategori").text(s.jumlahKategori);
}

// kartu "Newest Event" (index.html): hanya event yang ditandai unggulan
function tampilkanKartu() {
  let html = "";
  const unggulan = dataEvent.filter(function (e) { return e.unggulan; });

  if (unggulan.length === 0) {
    html = '<p class="text-muted">Belum ada event terbaru.</p>';
  } else {
    unggulan.forEach(function (e) {
      html += `
        <div class="col-md-6">
          <article class="card h-100">
            <img src="${e.gambar}" class="card-img-top" alt="Poster ${e.nama}">
            <div class="card-body">
              <h3 class="card-title h5">${e.nama}</h3>
              <p class="card-text text-muted mb-1">${formatTanggal(e.tanggal)} - ${e.lokasi}</p>
              <p class="card-text fw-bold text-tiketin">${formatRupiah(e.harga)}</p>
              <a href="event-detail.html?id=${e.id}" class="btn btn-sm btn-tiketin">Lihat Detail</a>
            </div>
          </article>
        </div>`;
    });
  }
  $("#kartuEvent").html(html);
}

// tabel "Semua Event" (index.html), mengikuti filter/urutan yang dipilih
function tampilkanTabel() {
  const kategori = $("#filterKategori").val();
  const kataKunci = $("#cari").val().trim();
  const urutan = $("#urutkan").val();
  const hasil = cariEvent(dataEvent, kategori, kataKunci, urutan);

  let baris = "";
  if (hasil.length === 0) {
    baris = '<tr><td colspan="6" class="text-center text-muted">Tidak ada event yang cocok.</td></tr>';
  } else {
    hasil.forEach(function (e, i) {
      baris += `
        <tr data-id="${e.id}">
          <td>${i + 1}</td>
          <td>${e.nama}</td>
          <td>${formatTanggal(e.tanggal)}</td>
          <td>${e.lokasi}</td>
          <td>${formatRupiah(e.harga)}</td>
          <td>
            <a href="event-detail.html?id=${e.id}" class="btn btn-sm btn-outline-primary">Detail</a>
            <a href="event-form.html" class="btn btn-sm btn-outline-secondary">Edit</a>
            <button type="button" class="btn btn-sm btn-outline-danger btn-hapus">Hapus</button>
          </td>
        </tr>`;
    });
  }

  $("#tabelEvent").html(baris);
  $("#infoJumlah").text(`Menampilkan ${hasil.length} dari ${dataEvent.length} event`);
}

// daftar event yang baru ditambah (event-form.html)
// pakai .text() supaya isian pengguna tidak dibaca sebagai HTML
function tampilkanEventBaru() {
  const $tbody = $("#tabelBaru").empty();

  eventBaru.forEach(function (e, i) {
    const $tr = $("<tr>").attr("data-id", e.id);
    $tr.append($("<td>").text(i + 1));
    $tr.append($("<td>").text(e.nama));
    $tr.append($("<td>").text(e.kategori));
    $tr.append($("<td>").text(formatTanggal(e.tanggal)));
    $tr.append($("<td>").text(formatRupiah(e.harga)));
    $tr.append($("<td>").append(
      $('<button type="button" class="btn btn-sm btn-outline-danger btn-hapus-baru">Hapus</button>')
    ));
    $tbody.append($tr);
  });
}

// isi halaman detail sesuai ?id=... di alamat halaman (event-detail.html)
function isiDetail(e) {
  document.title = "TiketIn - " + e.nama;
  $("#judulEvent").text(e.nama);
  $("#deskripsiEvent").text(e.deskripsi);
  $("#posterEvent").attr({ src: e.gambar, alt: "Poster " + e.nama });
  $("#infoTanggal").text(formatTanggal(e.tanggal));
  $("#infoWaktu").text(e.waktu);
  $("#infoLokasi").text(e.lokasi);
  $("#infoKategori").text(e.kategori);
  $("#infoHarga").text(formatRupiah(e.harga));
  $("#infoSisa").text(e.sisa + " tiket");
  $("#totalHarga").text(formatRupiah(e.harga * Number($("#jumlah-tiket").val())));
}


// ---------- 4. FUNCTION BANTU jQuery ----------

// notifikasi: muncul pelan (fadeIn), diam 2,5 detik, lalu hilang (fadeOut)
function tampilNotif(pesan, tipe) {
  $("#notif")
    .stop(true, true)
    .removeClass("alert-success alert-danger alert-warning")
    .addClass("alert-" + tipe)
    .text(pesan)
    .fadeIn(300)
    .delay(2500)
    .fadeOut(500);
}

// tandai input salah / benar (kelas validasi Bootstrap)
function tandaiError($input, pesan) {
  $input.addClass("is-invalid").removeClass("is-valid");
  $input.next(".invalid-feedback").text(pesan);
}

function tandaiBenar($input) {
  $input.removeClass("is-invalid").addClass("is-valid");
}

function bersihkanValidasi($form) {
  $form.find(".is-invalid, .is-valid").removeClass("is-invalid is-valid");
}


// ---------- 5. EVENT HANDLING (jQuery) ----------

// ===== index.html : daftar event =====
function halamanDaftar() {
  tampilkanStatistik();
  tampilkanKartu();
  tampilkanTabel();

  // efek slideToggle: tampil/sembunyikan panel filter
  $("#btnFilter").on("click", function () {
    $("#panelFilter").slideToggle(250);
    const terbuka = $(this).attr("aria-expanded") === "true";
    $(this).attr("aria-expanded", String(!terbuka));
  });

  // filter & urutan langsung dijalankan saat pengguna mengetik / memilih
  $("#cari").on("input", tampilkanTabel);
  $("#filterKategori, #urutkan").on("change", tampilkanTabel);

  // hapus event dari tampilan (delegasi event, karena baris dibuat lewat JS)
  $("#tabelEvent").on("click", ".btn-hapus", function () {
    const $baris = $(this).closest("tr");
    const id = Number($baris.data("id"));
    const e = cariEventById(id);

    if (!confirm('Hapus event "' + e.nama + '" dari tampilan?')) {
      return;
    }

    $baris.fadeOut(300, function () {
      dataEvent = dataEvent.filter(function (item) { return item.id !== id; });
      tampilkanStatistik();
      tampilkanKartu();
      tampilkanTabel();
      tampilNotif('Event "' + e.nama + '" dihapus dari tampilan.', "warning");
    });
  });
}

// ===== event-form.html : tambah event =====
function halamanForm() {
  // aturan validasi: field kosong / tidak masuk akal ditolak
  const aturan = [
    { id: "#nama-event", cek: function (v) { return v.length >= 3; }, pesan: "Nama event minimal 3 karakter." },
    { id: "#tanggal", cek: function (v) { return v !== ""; }, pesan: "Tanggal event wajib diisi." },
    { id: "#lokasi", cek: function (v) { return v.length > 0; }, pesan: "Lokasi / venue wajib diisi." },
    { id: "#harga", cek: function (v) { return Number(v) > 0; }, pesan: "Harga tiket harus lebih dari 0." },
    { id: "#kuota", cek: function (v) { return Number(v) >= 1 && Number.isInteger(Number(v)); }, pesan: "Kuota minimal 1 tiket." },
    { id: "#deskripsi", cek: function (v) { return v.length >= 10; }, pesan: "Deskripsi minimal 10 karakter." }
  ];

  $("#formEvent").on("submit", function (ev) {
    ev.preventDefault();
    let semuaBenar = true;
    let inputPertamaSalah = null;

    for (let i = 0; i < aturan.length; i++) {
      const $input = $(aturan[i].id);
      if (aturan[i].cek($input.val().trim())) {
        tandaiBenar($input);
      } else {
        tandaiError($input, aturan[i].pesan);
        semuaBenar = false;
        if (inputPertamaSalah === null) inputPertamaSalah = $input;
      }
    }

    if (!semuaBenar) {
      inputPertamaSalah.trigger("focus");
      tampilNotif("Form belum lengkap, periksa kolom yang berwarna merah.", "danger");
      return;
    }

    // semua valid: "kirim" = masukkan ke array dummy
    eventBaru.push({
      id: Date.now(),
      nama: $("#nama-event").val().trim(),
      kategori: $("#kategori").val(),
      tanggal: $("#tanggal").val(),
      harga: Number($("#harga").val())
    });

    tampilkanEventBaru();
    $("#sectionBaru").fadeIn(400);
    tampilNotif("Event berhasil ditambahkan (data dummy).", "success");
    this.reset();
    bersihkanValidasi($(this));
  });

  // tombol Reset juga membersihkan tanda merah/hijau
  $("#formEvent").on("reset", function () {
    bersihkanValidasi($(this));
  });

  // hapus event baru dari daftar sementara
  $("#tabelBaru").on("click", ".btn-hapus-baru", function () {
    const $baris = $(this).closest("tr");
    const id = Number($baris.data("id"));

    $baris.fadeOut(300, function () {
      eventBaru = eventBaru.filter(function (item) { return item.id !== id; });
      tampilkanEventBaru();
      if (eventBaru.length === 0) {
        $("#sectionBaru").fadeOut(300);
      }
      tampilNotif("Event dihapus dari daftar.", "warning");
    });
  });
}

// ===== event-detail.html : detail + pemesanan tiket =====
function halamanDetail() {
  // ambil id dari alamat: event-detail.html?id=3 (kalau tidak ada, pakai event 1)
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id")) || 1;
  const e = cariEventById(id);

  if (!e) {
    $("#detailEvent").html('<p class="alert alert-warning">Event tidak ditemukan. <a href="index.html">Kembali ke daftar event</a></p>');
    return;
  }

  isiDetail(e);

  // total harga berubah otomatis saat jumlah tiket diganti
  $("#jumlah-tiket").on("change", function () {
    $("#totalHarga").text(formatRupiah(e.harga * Number($(this).val())));
  });

  // validasi sederhana saat form pemesanan dikirim
  $("#formPesan").on("submit", function (ev) {
    ev.preventDefault();
    const $jumlah = $("#jumlah-tiket");
    const $nama = $("#nama-pemesan");
    const $email = $("#email-pemesan");
    const jumlah = Number($jumlah.val());
    const nama = $nama.val().trim();
    const email = $email.val().trim();
    const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let benar = true;

    if (e.sisa === 0) {
      tandaiError($jumlah, "Maaf, tiket sudah habis.");
      benar = false;
    } else if (jumlah > e.sisa) {
      tandaiError($jumlah, "Sisa tiket hanya " + e.sisa + ".");
      benar = false;
    } else {
      tandaiBenar($jumlah);
    }

    if (nama.length < 3) {
      tandaiError($nama, "Nama pemesan wajib diisi (minimal 3 karakter).");
      benar = false;
    } else {
      tandaiBenar($nama);
    }

    if (!polaEmail.test(email)) {
      tandaiError($email, "Format email belum benar, contoh: nama@email.com");
      benar = false;
    } else {
      tandaiBenar($email);
    }

    if (!benar) {
      tampilNotif("Pesanan belum bisa dikirim, periksa kolom yang berwarna merah.", "danger");
      return;
    }

    // sukses: kurangi sisa tiket (dummy) dan beri notifikasi
    e.sisa = e.sisa - jumlah;
    $("#infoSisa").text(e.sisa + " tiket");
    tampilNotif(jumlah + " tiket \"" + e.nama + "\" atas nama " + nama +
      " berhasil dipesan. Total " + formatRupiah(e.harga * jumlah) + ".", "success");
    this.reset();
    bersihkanValidasi($(this));
    $("#totalHarga").text(formatRupiah(e.harga));
  });
}


// ---------- 6. JALANKAN SETELAH HALAMAN SIAP ----------
// Setiap halaman hanya menjalankan bagiannya sendiri
$(document).ready(function () {
  if ($("#tabelEvent").length) halamanDaftar();
  if ($("#formEvent").length) halamanForm();
  if ($("#formPesan").length) halamanDetail();
});
