import Link from 'next/link'
import { BookOpenCheck, CheckCircle2, Package, QrCode, ShieldCheck, UserRoundPlus } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { buttonVariants } from '@/components/ui/button'
import { getServerLocale } from '@/lib/i18n/server'

export default async function StaffGuidePage() {
  const locale = await getServerLocale()
  const c = (en: string, id: string) => locale === 'id' ? id : en

  const workflow = [
    [c('Customer', 'Pelanggan'), c('Select an existing customer or create a new customer record.', 'Pilih pelanggan yang sudah ada atau buat data pelanggan baru.')],
    [c('Project', 'Proyek'), c('Enter the project name, type, address, and installation date.', 'Masukkan nama, jenis, alamat, dan tanggal pemasangan proyek.')],
    [c('Areas', 'Area'), c('Add every room or physical area included in the installation.', 'Tambahkan setiap ruangan atau area fisik yang termasuk dalam pemasangan.')],
    [c('Products', 'Produk'), c('Assign catalog products, quantities, and specifications to each area.', 'Tetapkan produk katalog, jumlah, dan spesifikasi ke setiap area.')],
    [c('Installation', 'Pemasangan'), c('Assign technicians and upload clear before, during, and after photos.', 'Tetapkan teknisi dan unggah foto sebelum, proses, dan sesudah yang jelas.')],
    [c('Warranty', 'Garansi'), c('Confirm coverage dates, duration, and terms for each product.', 'Konfirmasi tanggal cakupan, durasi, dan ketentuan untuk setiap produk.')],
    [c('Review & publish', 'Tinjau & terbitkan'), c('Check every detail, then publish and share the generated QR code.', 'Periksa semua detail, lalu terbitkan dan bagikan kode QR yang dibuat.')],
  ]

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="mb-10 max-w-2xl">
        <Badge variant="outline" className="mb-4 gap-1.5"><BookOpenCheck className="size-3.5" />{c('New staff handbook', 'Buku panduan staf baru')}</Badge>
        <h1 className="text-3xl font-semibold tracking-[-0.035em] text-foreground sm:text-4xl">{c('How to use Halla+', 'Cara menggunakan Halla+')}</h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{c('A practical guide to creating accurate digital passports, from initial setup to the customer handoff.', 'Panduan praktis untuk membuat paspor digital yang akurat, mulai dari persiapan hingga penyerahan kepada pelanggan.')}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card><CardHeader><UserRoundPlus className="size-5 text-brand" /><CardTitle className="text-base">{c('1. Prepare', '1. Persiapkan')}</CardTitle></CardHeader><CardContent className="text-sm leading-6 text-muted-foreground">{c('Make sure the customer, products, and assigned technicians are available before creating a project.', 'Pastikan pelanggan, produk, dan teknisi yang ditugaskan tersedia sebelum membuat proyek.')}</CardContent></Card>
        <Card><CardHeader><Package className="size-5 text-brand" /><CardTitle className="text-base">{c('2. Record accurately', '2. Catat dengan akurat')}</CardTitle></CardHeader><CardContent className="text-sm leading-6 text-muted-foreground">{c('Use the actual installed quantities, batch details, dates, and customer-visible photos.', 'Gunakan jumlah terpasang, detail batch, tanggal, dan foto yang dapat dilihat pelanggan secara akurat.')}</CardContent></Card>
        <Card><CardHeader><QrCode className="size-5 text-brand" /><CardTitle className="text-base">{c('3. Publish & hand off', '3. Terbitkan & serahkan')}</CardTitle></CardHeader><CardContent className="text-sm leading-6 text-muted-foreground">{c('Open the passport once, verify it on mobile, then give the QR code to the customer.', 'Buka paspor sekali, periksa di ponsel, lalu berikan kode QR kepada pelanggan.')}</CardContent></Card>
      </div>

      <Card className="mt-6">
        <CardHeader><CardTitle>{c('Create a project in seven steps', 'Buat proyek dalam tujuh langkah')}</CardTitle></CardHeader>
        <CardContent className="space-y-1">
          {workflow.map(([title, description], index) => (
            <div key={title} className="flex gap-4 border-b border-border/70 py-4 last:border-0">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-soft text-sm font-semibold text-brand">{index + 1}</span>
              <div><h2 className="font-medium text-foreground">{title}</h2><p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p></div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Card><CardHeader><CardTitle className="flex items-center gap-2 text-base"><ShieldCheck className="size-5 text-brand" />{c('Before publishing', 'Sebelum menerbitkan')}</CardTitle></CardHeader><CardContent className="space-y-3 text-sm text-muted-foreground">{[
          c('Confirm the customer phone number.', 'Konfirmasi nomor telepon pelanggan.'),
          c('Check product quantities and installation dates.', 'Periksa jumlah produk dan tanggal pemasangan.'),
          c('Hide internal-only photos from customers.', 'Sembunyikan foto khusus internal dari pelanggan.'),
          c('Verify warranty dates and written terms.', 'Verifikasi tanggal dan ketentuan garansi.'),
        ].map((item) => <p key={item} className="flex gap-2"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand" />{item}</p>)}</CardContent></Card>
        <Card><CardHeader><CardTitle className="text-base">{c('Important to know', 'Penting untuk diketahui')}</CardTitle></CardHeader><CardContent className="space-y-3 text-sm leading-6 text-muted-foreground"><p>{c('Published passports are immediately available to anyone with their secure link or QR code.', 'Paspor yang diterbitkan langsung tersedia bagi siapa pun yang memiliki tautan aman atau kode QR.')}</p><p>{c('Project editing after publication is not available yet, so review carefully before publishing.', 'Pengeditan proyek setelah diterbitkan belum tersedia, jadi tinjau dengan teliti sebelum menerbitkan.')}</p><p>{c('Never place passwords, private customer notes, or sensitive documents in customer-visible fields.', 'Jangan pernah memasukkan kata sandi, catatan pribadi pelanggan, atau dokumen sensitif di kolom yang terlihat pelanggan.')}</p></CardContent></Card>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/admin/projects/new" className={buttonVariants({ size: 'lg' })}>{c('Create a practice project', 'Buat proyek latihan')}</Link>
        <Link href="/demo" className={buttonVariants({ variant: 'outline', size: 'lg' })}>{c('View customer passport demo', 'Lihat demo paspor pelanggan')}</Link>
      </div>
    </div>
  )
}
