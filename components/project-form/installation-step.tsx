'use client'

import { useState, useEffect } from 'react'
import { useProjectFormStore } from '@/lib/store/project-form-store'
import { createClient } from '@/lib/supabase/client'
import { Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert } from '@/components/ui/alert'
import { useLocale } from '@/lib/i18n/locale-context'

export function InstallationStep() {
  const { locale } = useLocale()
  const c = (en: string, id: string) => locale === 'id' ? id : en
  const supabase = createClient()
  const { areas, photos, addPhoto, removePhoto, updatePhoto, updateItem, setStep } = useProjectFormStore()

  const [installers, setInstallers] = useState<any[]>([])

  useEffect(() => {
    let active = true
    void supabase.from('installers').select('*').eq('is_active', true).order('name')
      .then(({ data }) => { if (active) setInstallers(data || []) })
    return () => { active = false }
  }, [supabase])

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    for (let i = 0; i < files.length; i++) {
      const file = files[i]

      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert(c('Please select only image files', 'Pilih file gambar saja'))
        continue
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert(c(`File ${file.name} is too large. Max size is 5MB`, `File ${file.name} terlalu besar. Ukuran maksimal 5 MB`))
        continue
      }

      // Create preview
      const preview = URL.createObjectURL(file)

      addPhoto({
        id: crypto.randomUUID(),
        file,
        preview,
        is_customer_visible: true,
      })
    }

    // Reset input
    e.target.value = ''
  }

  const handleUpdateInstaller = (itemId: string, installerId: string) => {
    updateItem(itemId, { installer_id: installerId === 'none' ? undefined : installerId })
  }

  const handleUpdateInstallationDate = (itemId: string, date: string) => {
    updateItem(itemId, { installation_date: date || undefined })
  }

  const handleContinue = () => {
    setStep('warranty')
  }

  const handleBack = () => {
    setStep('products')
  }

  const allItems = areas.flatMap((area) => area.items.map((item) => ({ ...item, area_name: area.name })))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{c('Step 5: Installation Documentation', 'Langkah 5: Dokumentasi Pemasangan')}</CardTitle>
        <p className="text-sm text-muted-foreground">{c('Upload photos and add installation details', 'Unggah foto dan tambahkan detail pemasangan')}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Installation Details per Product */}
        <div className="space-y-4">
          <h3 className="font-medium text-foreground">{c('Installation Details', 'Detail Pemasangan')}</h3>
          {allItems.length === 0 ? (
            <Alert>{c('No products added yet. Please add products first.', 'Belum ada produk. Tambahkan produk terlebih dahulu.')}</Alert>
          ) : (
            <div className="space-y-3">
              {allItems.map((item) => (
                <div key={item.id} className="space-y-3 rounded-lg border border-border bg-card p-4">
                  <div>
                    <p className="font-medium text-foreground">{item.product?.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.area_name} • {item.quantity} {item.unit}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label>{c('Installation Date', 'Tanggal Pemasangan')}</Label>
                      <Input
                        type="date"
                        value={item.installation_date || ''}
                        onChange={(e) => handleUpdateInstallationDate(item.id, e.target.value)}
                        className="h-10"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label>{c('Installation Technician', 'Teknisi Pemasangan')}</Label>
                      <Select
                        value={item.installer_id || 'none'}
                        onValueChange={(value) => handleUpdateInstaller(item.id, value ?? 'none')}
                      >
                        <SelectTrigger className="h-10 w-full">
                          <SelectValue placeholder={c('Select technician', 'Pilih teknisi')}>
                            {(value: string) =>
                              value === 'none'
                                ? c('No technician assigned', 'Belum ada teknisi')
                                : installers.find((i) => i.id === value)?.name
                            }
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">{c('No technician assigned', 'Belum ada teknisi')}</SelectItem>
                          {installers.map((installer) => (
                            <SelectItem key={installer.id} value={installer.id}>
                              {installer.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Photo Upload */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-foreground">{c('Installation Photos', 'Foto Pemasangan')}</h3>
            <Button
              variant="outline"
              onClick={() => document.getElementById('photo-upload')?.click()}
              className="h-9 gap-1.5"
            >
              <Upload className="size-4" />
              {c('Upload Photos', 'Unggah Foto')}
            </Button>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {photos.length === 0 ? (
            <div className="rounded-lg border-2 border-dashed border-border py-12 text-center">
              <p className="mb-4 text-muted-foreground">{c('No photos uploaded yet', 'Belum ada foto yang diunggah')}</p>
              <Button variant="outline" onClick={() => document.getElementById('photo-upload')?.click()}>
                {c('Upload Your First Photo', 'Unggah Foto Pertama')}
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {photos.map((photo) => (
                <div key={photo.id} className="overflow-hidden rounded-lg border border-border bg-card">
                  <img src={photo.preview} alt="Installation" className="h-40 w-full object-cover" />
                  <div className="space-y-2 p-3">
                    <Select
                      value={photo.photo_type || 'none'}
                      onValueChange={(value: any) =>
                        updatePhoto(photo.id, { photo_type: value === 'none' ? undefined : value })
                      }
                    >
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue placeholder={c('Photo type', 'Jenis foto')}>
                          {(value: string) =>
                            ({ none: c('No type', 'Tanpa jenis'), before: c('Before', 'Sebelum'), during: c('During', 'Saat pemasangan'), after: c('After', 'Sesudah') })[value]
                          }
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">{c('No type', 'Tanpa jenis')}</SelectItem>
                        <SelectItem value="before">{c('Before', 'Sebelum')}</SelectItem>
                        <SelectItem value="during">{c('During', 'Saat pemasangan')}</SelectItem>
                        <SelectItem value="after">{c('After', 'Sesudah')}</SelectItem>
                      </SelectContent>
                    </Select>

                    <label className="flex items-center gap-2 text-xs text-muted-foreground">
                      <input
                        type="checkbox"
                        checked={photo.is_customer_visible}
                        onChange={(e) => updatePhoto(photo.id, { is_customer_visible: e.target.checked })}
                        className="rounded"
                      />
                      {c('Show to customer', 'Tampilkan kepada pelanggan')}
                    </label>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removePhoto(photo.id)}
                      className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive"
                    >
                      {c('Remove', 'Hapus')}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <p className="text-xs text-muted-foreground">
            {c('Photos marked as “Show to customer” will appear on the public passport. Maximum file size: 5 MB per photo.', 'Foto yang ditandai “Tampilkan kepada pelanggan” akan muncul di paspor publik. Ukuran maksimal: 5 MB per foto.')}
          </p>
        </div>

        <div className="flex justify-between pt-2">
          <Button variant="outline" onClick={handleBack} className="h-10">
            {c('Back', 'Kembali')}
          </Button>
          <Button onClick={handleContinue} size="lg" className="h-10">
            {c('Continue to Warranty', 'Lanjut ke Garansi')}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
