# Release Notes - Finalisasi Desa Digital (v1.0-RC)

## 🚀 Deployment & Production Ready (v1.1.0)
- **Full-stack Dockerization**: Ditambahkan `Dockerfile` multi-stage untuk menggabungkan React (Frontend) dan Spring Boot (Backend) menjadi satu artefak `.jar`.
- **Hugging Face Spaces Support**: Konfigurasi khusus Hugging Face Spaces (`server.port=7860`), modifikasi keamanan Spring Security untuk mengizinkan iframe embedding (`X-Frame-Options: DISABLE`), dan metadata konfigurasi UI Hugging Face.
- **Dynamic API Routing**: Modifikasi axios base URL pada seluruh file frontend (`api.ts`, `WargaOnboarding.tsx`, `Finansial.tsx`, dsb) untuk menggunakan *relative path* (`/api/v1`) pada saat production, dan fallback ke `localhost:5000` di lokal.
- **Environment Fallbacks**: Penambahan file konfigurasi `application.properties` default dengan pemanggilan Environment Variables (untuk DB & JWT) untuk mendukung runtime Docker di cloud tanpa kredensial sensitif yang *hardcoded*.
- **Dockerignore**: Penambahan `.dockerignore` untuk mencegah kebocoran *build context* (seperti `node_modules` versi Windows) ke dalam proses kompilasi container berbasis Linux Alpine.

---

Pembaruan ini berfokus pada transisi dari *mock-data* ke *real-time data* serta penyelesaian alur fitur penting seperti laporan pengaduan warga.

## 🚀 Fitur Baru & Peningkatan (Enhancements)

### 1. Modul Pengaduan Warga (File Upload)
- **Frontend (`Lapor.tsx`)**:
  - Menambahkan kapabilitas bagi warga untuk mengunggah **Foto Bukti Fisik** terkait keluhan.
  - Implementasi *real-time image preview* saat warga memilih file dari perangkat mereka.
  - Migrasi pengiriman form dari format JSON ke `multipart/form-data` untuk mendukung transmisi biner.
- **Backend (`WargaPengaduanController` & `PengaduanService`)**:
  - Endpoint API kini menerima parameter `@RequestParam MultipartFile fotoBuktiFile`.
  - Sistem otomatis melakukan filter keamanan (hanya menerima ekstensi `.jpg`, `.jpeg`, dan `.png`).
  - Implementasi `FileStorage` mandiri yang menghasilkan *UUID unik* untuk tiap foto dan menyimpannya di `/uploads/pengaduan/`.

### 2. Modul Transparansi Keuangan (Dynamic Real-Time Stats)
- **Warga (`Finansial.tsx`) & Admin (`AdminKeuangan.tsx`)**:
  - **Penghapusan Dummy Data**: Grafik batang dan persentase tidak lagi statis.
  - **Live Calculation**: 
    - Sistem otomatis melacak dan mengakumulasi data transaksi `EXPENSE` per-kategori (*Infrastruktur, Sosial, Operasional*) dan menampilkannya sebagai grafik persentase (*Statistik Belanja*).
    - Nilai persentase raksasa **Target Penyerapan Anggaran** sekarang dihitung murni menggunakan rasio antara total uang keluar dibanding uang masuk (*Total Pengeluaran / Total Pemasukan*).
  - Sinkronisasi antarmuka antara Warga dan Admin kini sejajar, tidak ada *lag* pembaruan data karena ditarik langsung dari database MySQL yang sama.

## 🛠️ Modifikasi File Utama
| Direktori | File | Keterangan Perubahan |
| --- | --- | --- |
| `frontend/src/pages/` | `Finansial.tsx` | Kalkulasi dinamis grafik keuangan warga |
| `frontend/src/pages/` | `AdminKeuangan.tsx` | Kalkulasi dinamis grafik keuangan admin |
| `frontend/src/pages/` | `Lapor.tsx` | UI File Upload & migrasi ke FormData |
| `src/.../controller/` | `WargaPengaduanController.java`| Update anotasi Controller `MULTIPART_FORM_DATA` |
| `src/.../service/` | `PengaduanService.java` | Logika `storePengaduanEvidence` untuk local storage |

---
*Commit ini menandakan kesiapan aplikasi untuk proses Deployment ke lingkungan Staging/Production.*
