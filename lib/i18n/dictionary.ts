export type Locale = 'en' | 'id'
export type FontSize = 'sm' | 'md' | 'lg'

// Flat key → { en, id } dictionary. Scoped to the customer-facing surfaces
// (home page, passport, and the settings menu itself) — the admin console
// is an internal Halla Home tool and stays English-only by design.
export const dictionary = {
  'settings.label': { en: 'Settings', id: 'Pengaturan' },
  'settings.language': { en: 'Language', id: 'Bahasa' },
  'settings.fontSize': { en: 'Text size', id: 'Ukuran teks' },
  'settings.fontSize.sm': { en: 'Small', id: 'Kecil' },
  'settings.fontSize.md': { en: 'Default', id: 'Standar' },
  'settings.fontSize.lg': { en: 'Large', id: 'Besar' },

  'nav.adminLogin': { en: 'Admin login', id: 'Masuk Admin' },

  'home.badge': { en: 'Verified Halla Home installation', id: 'Instalasi Halla Home terverifikasi' },
  'home.hero.title': {
    en: 'The digital record for everything Halla installed in your home.',
    id: 'Catatan digital untuk semua yang Halla pasang di rumah Anda.',
  },
  'home.hero.subtitle': {
    en: 'Every Project H Passport holds your product specifications, warranty status, and maintenance guidance — accessible by QR code, no app or account required.',
    id: 'Setiap Project H Passport menyimpan spesifikasi produk, status garansi, dan panduan perawatan Anda — dapat diakses lewat kode QR, tanpa aplikasi atau akun.',
  },
  'home.hero.scanHint': { en: 'Scan the code on your warranty card', id: 'Pindai kode pada kartu garansi Anda' },
  'home.hero.orLookup': { en: 'Or look it up below', id: 'Atau cari di bawah ini' },

  'home.lookup.title': { en: 'Find your passport', id: 'Temukan paspor Anda' },
  'home.lookup.subtitle': {
    en: 'Enter the passport code and phone number from your installation documentation.',
    id: 'Masukkan kode paspor dan nomor telepon dari dokumentasi instalasi Anda.',
  },
  'home.lookup.code': { en: 'Passport code', id: 'Kode paspor' },
  'home.lookup.phone': { en: 'Phone number on file', id: 'Nomor telepon terdaftar' },
  'home.lookup.submit': { en: 'Find my passport', id: 'Cari paspor saya' },
  'home.lookup.submitting': { en: 'Searching…', id: 'Mencari…' },
  'home.lookup.hint': {
    en: 'Both the code and phone number were given to you at installation, and printed on your warranty card.',
    id: 'Kode dan nomor telepon diberikan saat instalasi, dan tercetak di kartu garansi Anda.',
  },
  'home.lookup.error': {
    en: "We couldn't find a passport matching that code and phone number.",
    id: 'Kami tidak menemukan paspor yang cocok dengan kode dan nomor telepon tersebut.',
  },

  'home.features.eyebrow': { en: "What's in your passport", id: 'Apa isi paspor Anda' },
  'home.features.title': {
    en: 'One page, everything about your installation.',
    id: 'Satu halaman, semua tentang instalasi Anda.',
  },
  'home.features.records.title': { en: 'Complete product records', id: 'Catatan produk lengkap' },
  'home.features.records.body': {
    en: 'Brand, series, specifications, and quantities for every product installed in your home — organized by room.',
    id: 'Merek, seri, spesifikasi, dan jumlah setiap produk yang terpasang di rumah Anda — tersusun per ruangan.',
  },
  'home.features.warranty.title': { en: 'Warranty, tracked automatically', id: 'Garansi, terlacak otomatis' },
  'home.features.warranty.body': {
    en: "Coverage dates and terms per product, with a clear active / expiring / expired status you never have to chase down.",
    id: 'Tanggal dan ketentuan cakupan per produk, dengan status aktif / akan habis / kedaluwarsa yang jelas tanpa perlu dicari-cari.',
  },
  'home.features.maintenance.title': { en: 'Maintenance, made simple', id: 'Perawatan jadi mudah' },
  'home.features.maintenance.body': {
    en: 'Care instructions specific to what was actually installed, so your products last as long as they should.',
    id: 'Instruksi perawatan sesuai produk yang benar-benar terpasang, agar produk Anda tahan lama.',
  },
  'home.features.contact.title': { en: 'Direct line to Halla', id: 'Jalur langsung ke Halla' },
  'home.features.contact.body': {
    en: 'Warranty claims and service requests, one tap away on WhatsApp — no call center, no ticket number.',
    id: 'Klaim garansi dan permintaan servis, cukup satu ketuk lewat WhatsApp — tanpa call center, tanpa nomor tiket.',
  },

  'home.steps.title': { en: 'How it works', id: 'Cara kerjanya' },
  'home.steps.1.title': { en: 'Halla completes your installation', id: 'Halla menyelesaikan instalasi Anda' },
  'home.steps.1.body': {
    en: 'Every product, photo, and warranty term is recorded against your project.',
    id: 'Setiap produk, foto, dan ketentuan garansi dicatat pada proyek Anda.',
  },
  'home.steps.2.title': { en: 'You get a passport', id: 'Anda mendapat paspor' },
  'home.steps.2.body': {
    en: 'A QR code on your documentation, and a code + phone lookup if you ever misplace it.',
    id: 'Kode QR pada dokumentasi Anda, dan pencarian kode + telepon jika suatu saat hilang.',
  },
  'home.steps.3.title': { en: 'It stays with your home', id: 'Selalu tersedia untuk rumah Anda' },
  'home.steps.3.body': {
    en: 'Come back any time — from any device — to check warranty status or request service.',
    id: 'Kembali kapan saja — dari perangkat apa pun — untuk memeriksa status garansi atau meminta servis.',
  },

  'home.footer.tagline': {
    en: 'Professional interior finishing & building materials, Halla Home.',
    id: 'Interior finishing & material bangunan profesional, Halla Home.',
  },

  'passport.badge': { en: 'Verified Halla Installation', id: 'Instalasi Halla Terverifikasi' },
  'passport.home': { en: 'Home', id: 'Beranda' },
  'passport.title': { en: 'Project H Passport', id: 'Project H Passport' },
  'passport.installed': { en: 'Installed', id: 'Dipasang' },

  'passport.products.title': { en: 'Your Halla Project', id: 'Proyek Halla Anda' },
  'passport.products.quantity': { en: 'Installed', id: 'Dipasang' },
  'passport.products.by': { en: 'By', id: 'Oleh' },
  'passport.products.warrantyUntil': { en: 'Warranty until', id: 'Garansi hingga' },

  'passport.warranty.title': { en: 'Your Halla Protection', id: 'Perlindungan Halla Anda' },
  'passport.warranty.active': { en: 'Active', id: 'Aktif' },
  'passport.warranty.expiringSoon': { en: 'Expiring soon', id: 'Akan berakhir' },
  'passport.warranty.expired': { en: 'Expired', id: 'Kedaluwarsa' },
  'passport.warranty.validUntil': { en: 'Valid until', id: 'Berlaku hingga' },
  'passport.warranty.remaining': { en: 'Remaining', id: 'Sisa waktu' },
  'passport.warranty.days': { en: 'days', id: 'hari' },
  'passport.warranty.coverage': { en: 'Coverage', id: 'Durasi cakupan' },
  'passport.warranty.months': { en: 'months', id: 'bulan' },

  'passport.maintenance.title': { en: 'Take Care of Your Halla Products', id: 'Rawat Produk Halla Anda' },
  'passport.maintenance.tip': { en: 'Regular maintenance matters.', id: 'Perawatan rutin itu penting.' },
  'passport.maintenance.tipBody': {
    en: 'It extends the life of your products and keeps your warranty valid.',
    id: 'Ini memperpanjang usia produk Anda dan menjaga garansi tetap berlaku.',
  },

  'passport.photos.title': { en: 'Your Installation', id: 'Instalasi Anda' },
  'passport.photos.before': { en: 'Before', id: 'Sebelum' },
  'passport.photos.during': { en: 'During', id: 'Selama' },
  'passport.photos.after': { en: 'After', id: 'Sesudah' },
  'passport.photos.other': { en: 'Photos', id: 'Foto' },

  'passport.contact.title': { en: 'Need Help With Your Halla Project?', id: 'Butuh Bantuan untuk Proyek Halla Anda?' },
  'passport.contact.body': {
    en: 'Our team is here to help with warranty claims, maintenance questions, or service requests.',
    id: 'Tim kami siap membantu klaim garansi, pertanyaan perawatan, atau permintaan servis.',
  },
  'passport.contact.whatsapp': { en: 'Contact Halla', id: 'Hubungi Halla' },
  'passport.contact.service': { en: 'Request Service', id: 'Minta Servis' },
  'passport.contact.company': { en: 'Halla Home', id: 'Halla Home' },
  'passport.contact.companyTagline': {
    en: 'Professional Interior Finishing & Building Materials',
    id: 'Interior Finishing & Material Bangunan Profesional',
  },

  'passport.footer.by': { en: 'Project H Passport by Halla Home', id: 'Project H Passport oleh Halla Home' },
  'passport.footer.published': { en: 'Published', id: 'Diterbitkan' },
} as const

export type DictionaryKey = keyof typeof dictionary
