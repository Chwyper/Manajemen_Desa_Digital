# 🏛️ Digital Village Hub (Desa Digital)

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.0.5-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-19.2-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0-blueviolet.svg)](https://vitejs.dev/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-orange.svg)](https://www.mysql.com/)
[![Java](https://img.shields.io/badge/JDK-21-red.svg)](https://www.oracle.com/java/)

**Digital Village Hub (Desa Digital)** adalah platform *full-stack* modern yang dirancang untuk mendigitalisasi layanan administrasi desa. Warga desa dapat mengajukan surat resmi secara mandiri, menyampaikan pengaduan atau aspirasi dengan lampiran berkas yang aman, sementara staf administrasi desa dapat mengelola data kependudukan, keuangan desa, permohonan surat, laporan, serta mengekspor data dalam format Excel dan PDF.

---

## ✨ Fitur Utama

- **Sistem Autentikasi Keamanan Tinggi:** Login dan register berbasis peran (*Role-Based Access Control* - Warga & Admin) menggunakan **JSON Web Token (JWT)**.
- **Pengajuan Surat Resmi:** Layanan permohonan berbagai surat keterangan desa secara digital dengan pelacakan status waktu nyata (*real-time*).
- **Pengaduan & Aspirasi Warga:** Warga dapat mengirim laporan pengaduan, lengkap dengan mekanisme **Unggah Dokumen Pendukung** yang aman.
- **Manajemen Kependudukan & Keuangan:** Pengelolaan data penduduk dan transparansi anggaran keuangan desa oleh Administrator.
- **Ekspor Dokumen:** Kemudahan cetak laporan administratif ke dalam file **Excel (.xlsx)** menggunakan Apache POI dan dokumen **PDF** via iText.
- **Keamanan Siber Tingkat Lanjut:**
  - Pencegahan celah **IDOR (Insecure Direct Object Reference)** melalui validasi kepemilikan data berbasis JWT Context di setiap endpoint sensitif.
  - Validasi ketat pengunggahan file (validasi ukuran, ekstensi, dan MIME-type asli) untuk menghindari ancaman *Arbitrary File Upload*.
  - Penyimpanan berkas menggunakan penamaan acak berbasis **UUID** untuk mencegah bentrokan nama dan *directory traversal*.

---

## 🛠️ Tech Stack

### Backend (API Server)
* **Runtime:** Java Development Kit (JDK) 21
* **Framework:** Spring Boot 4.0.5 (Spring MVC, Spring Security, Spring Data JPA)
* **Koneksi Database:** MySQL Connector/J & Hikari Connection Pool
* **Keamanan:** JSON Web Tokens (jjwt-api 0.11.5) & jBCrypt (untuk hashing password)
* **Utilitas Laporan:** Apache POI 5.0.0 (Excel) & iText 5.5.13.3 (PDF)
* **Lainnya:** Lombok, SLF4J + Logback (Logging), dotenv-java (Pemuatan environment variables)

### Frontend (Client Portal)
* **Framework:** React 19 (TypeScript)
* **Build Tool:** Vite 8.0
* **Styling:** Tailwind CSS & Framer Motion (Animasi Transisi & Hover Premium)
* **Manajemen Formulir:** React Hook Form & Zod (Validasi Skema Client-side)
* **HTTP Client:** Axios (dilengkapi interceptor global untuk penanganan status token 401 Unauthorized)
* **Notifikasi:** Sonner (Toast notification modern)

---

## 📁 Struktur Direktori Utama

```text
DesaDigital/
├── src/main/java/com/DigitalVillageHub/demo/
│   ├── config/            # Konfigurasi Security, JWT, Filter
│   ├── controller/        # Rest Controller API (Auth, Surat, Pengaduan, dll.)
│   ├── dto/               # Data Transfer Objects untuk Request & Response
│   ├── exception/         # Penanganan Exception Global (GlobalExceptionHandler)
│   ├── model/             # Entity Model database JPA & DTO pendukung
│   ├── persistence/       # Repository database JPA (Queries)
│   └── service/           # Logic bisnis inti
├── frontend/
│   ├── src/
│   │   ├── assets/        # Media, Gambar, Icon
│   │   ├── components/    # Reusable UI Components
│   │   ├── pages/         # Halaman Aplikasi (Dashboard, Login, Layanan, dll.)
│   │   ├── services/      # Konfigurasi API Axios & Integration
│   │   ├── App.tsx        # Routing & Layout Utama
│   │   └── main.tsx       # Entry point React
│   └── package.json       # Manajemen package npm frontend
├── .env                   # Variabel Lingkungan Lokal (diabaikan oleh git)
├── .envexample            # Template Konfigurasi Environment
└── pom.xml                # Konfigurasi dependensi Maven
```

---

## 🚀 Panduan Instalasi dan Menjalankan Aplikasi

### 1. Prasyarat Sistem
Pastikan perangkat Anda sudah terinstal:
* [JDK 21](https://www.oracle.com/java/technologies/downloads/) atau terbaru.
* [Node.js](https://nodejs.org/) (versi LTS terbaru) beserta `npm`.
* [MySQL Server](https://dev.mysql.com/downloads/mysql/) (versi 8.0+).

### 2. Setup Database
1. Jalankan layanan MySQL lokal Anda.
2. Buat database baru bernama `desa_digital`:
   ```sql
   CREATE DATABASE desa_digital;
   ```

### 3. Konfigurasi Environment Variable
1. Salin berkas `.envexample` menjadi `.env` di root direktori proyek:
   ```bash
   cp .envexample .env
   ```
2. Buka berkas `.env` baru tersebut, sesuaikan nilai kredensial database Anda dan generate kunci rahasia JWT (`JWT_SECRET`):
   ```env
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=desa_digital
   DB_DRIVER=com.mysql.cj.jdbc.Driver
   DB_URL=jdbc:mysql://127.0.0.1:3306/desa_digital?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=Asia/Jakarta
   JWT_SECRET=generate_kunci_rahasia_acak_minimal_32_karakter_di_sini
   ```

### 4. Menjalankan Backend (Spring Boot API)
Server backend secara default berjalan pada port **5000**.
* **Melalui terminal (Root Directory):**
  * Di Windows:
    ```cmd
    .\mvnw.cmd spring-boot:run
    ```
  * Di macOS/Linux:
    ```bash
    chmod +x mvnw
    ./mvnw spring-boot:run
    ```
* **Melalui IDE:** Buka root proyek di IntelliJ IDEA / VS Code, biarkan sinkronisasi Maven selesai, lalu jalankan class `DemoApplication.java`.

### 5. Menjalankan Frontend (React + Vite)
Client web secara default berjalan di `http://localhost:5173`.
1. Buka terminal baru dan masuk ke direktori frontend:
   ```bash
   cd frontend
   ```
2. Instal semua dependensi:
   ```bash
   npm install
   ```
3. Jalankan server development:
   ```bash
   npm run dev
   ```
4. Buka browser dan arahkan ke alamat `http://localhost:5173`.

---

## 🔒 Konfigurasi Keamanan (Security Hardening)
Platform ini telah dilengkapi pengamanan berkas dan proteksi akses data:
1. **Validasi JWT & Session:** Setiap request yang masuk ke API endpoint yang dilindungi harus melampirkan token JWT valid pada header `Authorization: Bearer <token>`.
2. **Remediasi IDOR:** Endpoint seperti `/api/v1/surat/user/{userId}` memvalidasi kecocokan antara `userId` yang diminta dengan `Name/Subject ID` (User ID) yang diekstrak dari JWT token user saat ini.
3. **Upload File Guard:**
   - Pembatasan ukuran file maksimal **10MB**.
   - Pemeriksaan *MIME-Type* secara presisi di level backend (menggunakan library Java NIO/Tika) dan pencocokan whitelist ekstensi berkas (`.png`, `.jpg`, `.jpeg`, `.pdf`).
   - Pembersihan nama file asli dan generate nama acak berbasis `UUID` untuk menghindari *File Execution* dan bentrokan nama berkas di storage `/uploads`.

---

## 📬 Ringkasan Endpoint API Utama

| Modul | Endpoint | HTTP Method | Keterangan |
|---|---|---|---|
| **Autentikasi** | `/api/v1/auth/register` | `POST` | Registrasi Warga Baru |
| | `/api/v1/auth/login` | `POST` | Autentikasi & Dapatkan JWT |
| | `/api/v1/auth/profile` | `GET` | Dapatkan Data Pengguna Aktif |
| | `/api/v1/auth/onboarding` | `POST` | Onboarding (Unggah Foto KTP/KK) |
| **Surat Warga** | `/api/v1/warga/surat/ajukan` | `POST` | Pengajuan Surat Resmi Baru |
| | `/api/v1/warga/surat/user/{userId}` | `GET` | Riwayat Pengajuan Surat User |
| **Pengaduan** | `/api/v1/warga/pengaduan` | `POST` | Pengajuan Laporan Pengaduan Baru |
| | `/api/v1/warga/pengaduan/riwayat` | `GET` | Riwayat Pengaduan User |
| **Laporan (Report)**| `/api/v1/reports` | `GET` | Melihat Semua Laporan (Admin) |
| | `/api/v1/reports/user/{userId}` | `GET` | Melihat Laporan milik User |

---

## ❓ Troubleshooting

- **Error: "Port 5000 / 5173 is already in use"**
  Cari proses yang berjalan pada port tersebut dan matikan (`netstat -ano | findstr 5000` di Windows lalu `taskkill /F /PID <PID>`), atau ubah port pada `application.properties` / `vite.config.ts`.
- **Database Connection Refused (MySQL)**
  Pastikan service MySQL di komputer Anda sedang berjalan dan periksa kembali kecocokan password serta port MySQL di `.env`.
- **JWT Signature Exception / Invalid Signature**
  Pastikan `JWT_SECRET` yang Anda konfigurasikan di `.env` memiliki panjang minimal **32 karakter/256-bit** dan bernilai sama antara sesi server berjalan.
- **Vite Error "Cannot find native binding" (Windows)**
  Hapus folder `node_modules` dan file `package-lock.json` di dalam folder `frontend`, kemudian bersihkan cache NPM (`npm cache clean --force`) lalu instal ulang (`npm install`).
