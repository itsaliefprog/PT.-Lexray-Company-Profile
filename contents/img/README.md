📁 FOLDER: contents/img

Tempat untuk menyimpan semua gambar dan aset visual website PT LEXRAY.

## 📸 File yang Ada:
- **logo.svg** - Logo placeholder default perusahaan

## 👥 Menambahkan Foto Tim (Team Member Photos)

### File yang Diperlukan:
Buat/tambahkan file gambar dengan nama berikut ke folder `contents/img/`:

1. **team-ceo.jpg** - Foto Pendiri & CEO (Muhammad Rey Faaz)
2. **team-director.jpg** - Foto Direktur Proyek
3. **team-design.jpg** - Foto Kepala Desain
4. **team-sales.jpg** - Foto Manajer Penjualan

### 📐 Spesifikasi Foto Tim:
- **Format**: JPG, PNG, atau WebP
- **Ukuran Rekomendasi**: 300x300px atau lebih (akan di-crop menjadi circular)
- **Rasio**: Square (1:1) untuk hasil terbaik
- **Ukuran File**: ≤ 500KB per foto untuk performa optimal

### 📝 Cara Implementasi:

1. **Siapkan Foto:**
   - Foto profil tim member (ID card size atau potret)
   - Pastikan wajah berada di tengah (akan di-crop menjadi lingkaran)

2. **Simpan File:**
   - Simpan ke folder `contents/img/` dengan nama sesuai list di atas
   - Contoh: `team-ceo.jpg`, `team-director.jpg`, dll

3. **Nama File Flexible:**
   - Jika ingin menggunakan nama berbeda, buka `index.html`
   - Cari baris: `<img src="contents/img/team-ceo.jpg" alt="..."`
   - Ubah path sesuai nama file Anda

### 🎨 Tips Fotografi:
- ✓ Gunakan background polos/profesional
- ✓ Pencahayaan cukup dan merata
- ✓ Posisi wajah di tengah frame
- ✓ Photo akan ditampilkan dalam bentuk circular
- ✓ Konsisten dalam style dan pencahayaan antar foto

## 🎨 Cara Mengganti Logo:

### Opsi 1: Mengganti File SVG Placeholder
1. Siapkan logo perusahaan Anda dalam format SVG
2. Ganti file `logo.svg` dengan logo Anda
3. Pastikan nama file tetap `logo.svg` atau update path di HTML jika ingin nama berbeda

### Opsi 2: Menggunakan Format Lain (PNG, JPG, etc)
1. Simpan logo Anda di folder ini dengan nama, misalnya: `logo.png`
2. Buka file `index.html`
3. Cari baris: `<img src="contents/img/logo.svg" alt="PT LEXRAY Logo" class="logo">`
4. Ubah menjadi: `<img src="contents/img/logo.png" alt="PT LEXRAY Logo" class="logo">`

## 📐 Spesifikasi Logo:
- **Ukuran**: 50x50px di desktop, 45x45px di tablet, 40x40px di mobile
- **Format**: SVG (rekomendasi) / PNG / JPG / WebP
- **Rasio**: Square (1:1) untuk hasil terbaik
- **Transparansi**: Disarankan untuk kompatibilitas

## 💡 Tips Umum:
- JPG bagus untuk foto (lebih kecil), PNG untuk gambar dengan transparansi
- SVG logo lebih baik karena scalable dan ukuran file lebih kecil
- Pastikan logo punya kontras baik dengan background biru navbar
- Warna emas/kuning (#f39c12) akan kontras baik dengan navbar biru

## 🔄 Struktur Folder (Setelah Lengkap):
```
contents/
└── img/
    ├── logo.svg
    ├── README.md (file ini)
    ├── Screenshotlogolexray.png (logo actual)
    ├── team-ceo.jpg (Foto CEO)
    ├── team-director.jpg (Foto Direktur)
    ├── team-design.jpg (Foto Kepala Desain)
    ├── team-sales.jpg (Foto Manajer Penjualan)
    └── ... (file lain sesuai kebutuhan)
```

Selamat mendesain! 🎨
