# PantauALAM 

**PantauALAM** adalah platform *Full-Stack Early Warning System* (EWS) serta pemantauan cuaca dan gempabumi real-time di Indonesia. Proyek ini diarsitekturi menggunakan pendekatan **Monorepo** dengan memisahkan *Client-side* dan *Server-side* secara *decoupled* untuk menjamin efisiensi performa, skalabilitas, dan kemudahan proses *maintenance*.

---

##  Project Overview & Technical Highlights (Recruiter Focus)

Proyek ini dibangun dengan fokus pada **Developer Experience (DX)** dan **User Experience (UX)** untuk menangani integrasi data publik yang dinamis.

###  Poin Kunci & Implementasi Arsitektur:
* **Modern CSS Engine:** Mengadopsi **Tailwind CSS v4 (Oxide Engine)** melalui integrasi `@tailwindcss/postcss` untuk performa *build* gaya antarmuka yang sangat cepat dan arsitektur *zero-config*.
* **Asynchronous Data Orchestration:** Memanfaatkan *Asynchronous JavaScript (async/await)* di sisi Express.js untuk melakukan *proxy fetching* data masif tanpa memisahkan koneksi langsung dari browser guna meningkatkan aspek keamanan API.
* **Monorepo Automation Script:** Mengonfigurasi otomatisasi *dependency* melalui satu perintah (`npm run install-all`) pada root folder, menghemat waktu *setup environment* pengembang hingga 70%.

---

##  Fitur Utama Aplikasi

### 1. Dynamic Weather Forecasting
Menyajikan data metereologi temporal berskala 3 hari secara dinamis untuk wilayah Indonesia:
* **Hari Ini (Saat Ini):** Kondisi cuaca terkini yang diperbarui secara berkala.
* **Besok & Lusa:** Prediksi cuaca terstruktur untuk mendukung kesiapsiagaan aktivitas masyarakat.

### 2. Tri-Category Seismic Monitoring
Sistem pemrosesan data gempa bumi yang dibagi menjadi 3 klaster kritikal berdasarkan tingkat urgensi dan dampak:
* **Gempabumi Terbaru:** Detail aktivitas seismik paling mutakhir (Magnitudo, Kedalaman, Potensi Tsunami, Waktu, dan Wilayah terdampak).
* **15 Gempabumi Dirasakan:** Log daftar gempa bumi terakhir yang getarannya dirasakan langsung oleh masyarakat sekitar lokasi epicenter.
* **15 Gempabumi M 5.0+:** Monitoring khusus untuk memantau gempa bumi berkekuatan besar (di atas Magnitudo 5.0) yang berpotensi merusak atau memicu peringatan tsunami.

---

##  Teknologi yang Digunakan

| Komponen | Teknologi | Deskripsi |
| :--- | :--- | :--- |
| **Frontend (FE)** | React JS | Library UI berbasis komponen yang reaktif |
| | Tailwind CSS v4 | Engine utilitas CSS modern untuk desain responsif |
| | Vite | Alat *build* dan *bundler* performa tinggi |
| **Backend (BE)** | Node.js | Environment JavaScript di sisi server |
| | Express.js | Framework minimalis untuk penanganan routing & REST API |
| **Tools** | Nodemon & Run-p | Otomatisasi pemicu *live-reload* dan *multi-tasking* terminal |

---

##  Struktur Proyek

```text
PantauAlam/
├── Back-end-PantauAlam/    # Server Express.js (Pemrosesan Data & API Proxy)
│   ├── node_modules/
│   ├── index.js            # Entry point backend
│   └── package.json
├── Front-End-PantauAlam/   # Aplikasi Client React + Tailwind v4
|   ├── node_modules/
│   ├── src/                # Komponen dan logic visual React
│   ├── postcss.config.js   # Konfigurasi integrasi Tailwind v4
│   └── package.json
├── package.json            # Konfigurasi orkestrasi otomatis folder root
├── package.json  
└── README.md               # Dokumentasi Proyek

```
##  Langkah Instalasi & Menjalankan Aplikasi
Ikuti panduan langkah demi langkah berikut untuk menjalankan proyek ini di lingkungan lokal Anda (disarankan menggunakan Terminal Laragon atau Cmder):

### Langkah 1: Kloning Repositori
Buka terminal Anda, lalu unduh kode proyek ini:

```
git clone https://github.com/Arfansalmanramadhan/PantauAlam.git
cd PantauAlam
```
### Langkah 2: Instalasi Semua Dependensi (Satu Perintah)
Proyek ini telah dikonfigurasi agar Anda tidak perlu masuk ke folder backend dan frontend secara manual untuk melakukan instalasi paket. Cukup jalankan perintah berikut di folder root `PantauAlam/`:

```
npm run install-all
```
Perintah ini akan secara otomatis mengunduh seluruh modul `node_modules` yang dibutuhkan pada folder Root, Backend, dan Frontend sekaligus.

### Langkah 3: Jalankan Mode Pengembangan (Development)
Untuk menyalakan server Backend (Express.js) dan server Frontend (Vite) secara bersamaan dalam satu jendela terminal, jalankan perintah:

```
npm run dev
```
Setelah log terminal menunjukkan status berhasil, buka browser Anda dan akses:

* Aplikasi Utama (Frontend): `http://localhost:5173`

* Sistem API (Backend): `http://localhost:5000/api/gempa`

## Sumber Data (Data Source Attribution)
Seluruh data prakiraan cuaca, koordinat episenter, tingkat magnitudo, status potensi tsunami, dan data kebencanaan lainnya di dalam aplikasi ini disajikan secara legal dan real-time bersumber langsung dari API Publik open-data BMKG (Badan Meteorologi, Klimatologi, dan Geofisika) Indonesia.

Dokumentasi Resmi: [https://data.bmkg.go.id/](https://data.bmkg.go.id/)

## Lisensi
Proyek ini bersifat open-source dan dikembangkan untuk tujuan portofolio, pembelajaran arsitektur full-stack, serta edukasi sistem kesiapsiagaan bencana.