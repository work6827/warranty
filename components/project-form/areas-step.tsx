'use client'

import { useState } from 'react'
import { useProjectFormStore } from '@/lib/store/project-form-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useLocale } from '@/lib/i18n/locale-context'

const commonAreas = [
  'Living Room',
  'Master Bedroom',
  'Bedroom 2',
  'Bedroom 3',
  'Kitchen',
  'Dining Room',
  'Bathroom',
  'Office',
  'Lobby',
  'Reception',
  'Meeting Room',
  'Windows',
  'Facade',
]

export function AreasStep() {
  const { locale } = useLocale()
  const c = (en: string, id: string) => locale === 'id' ? id : en
  const { areas, addArea, removeArea, setStep } = useProjectFormStore()
  const [newAreaName, setNewAreaName] = useState('')

  const handleAddArea = () => {
    if (!newAreaName.trim()) return
    addArea(newAreaName.trim())
    setNewAreaName('')
  }

  const handleQuickAdd = (name: string) => {
    addArea(name)
  }

  const handleContinue = () => {
    if (areas.length === 0) {
      alert(c('Please add at least one area', 'Tambahkan setidaknya satu area'))
      return
    }
    setStep('products')
  }

  const handleBack = () => {
    setStep('project')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{c('Step 3: Project Areas', 'Langkah 3: Area Proyek')}</CardTitle>
        <p className="text-sm text-muted-foreground">
          {c('Add areas or rooms where products will be installed', 'Tambahkan area atau ruangan tempat produk akan dipasang')}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Quick add common areas */}
        <div className="space-y-2">
          <Label>{c('Quick Add Common Areas', 'Tambah Cepat Area Umum')}</Label>
          <div className="flex flex-wrap gap-2">
            {commonAreas.map((area) => (
              <Badge
                key={area}
                variant="outline"
                className="cursor-pointer hover:bg-secondary"
                onClick={() => handleQuickAdd(area)}
              >
                + {locale === 'id' ? ({'Living Room':'Ruang Tamu','Master Bedroom':'Kamar Tidur Utama','Bedroom 2':'Kamar Tidur 2','Bedroom 3':'Kamar Tidur 3','Kitchen':'Dapur','Dining Room':'Ruang Makan','Bathroom':'Kamar Mandi','Office':'Kantor','Lobby':'Lobi','Reception':'Resepsionis','Meeting Room':'Ruang Rapat','Windows':'Jendela','Facade':'Fasad'} as Record<string,string>)[area] : area}
              </Badge>
            ))}
          </div>
        </div>

        {/* Add custom area */}
        <div className="space-y-1.5">
          <Label htmlFor="new-area">{c('Add Custom Area', 'Tambah Area Lain')}</Label>
          <div className="flex gap-2">
            <Input
              id="new-area"
              value={newAreaName}
              onChange={(e) => setNewAreaName(e.target.value)}
              placeholder={c('Enter area name', 'Masukkan nama area')}
              className="h-10"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleAddArea()
                }
              }}
            />
            <Button onClick={handleAddArea} className="h-10">
              {c('Add', 'Tambah')}
            </Button>
          </div>
        </div>

        {/* Current areas */}
        {areas.length > 0 && (
          <div className="space-y-2">
            <Label>{c('Project Areas', 'Area Proyek')} ({areas.length})</Label>
            <div className="space-y-2">
              {areas.map((area) => (
                <div
                  key={area.id}
                  className="flex items-center justify-between rounded-lg border border-border bg-card p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="font-medium text-foreground">{area.name}</div>
                    {area.items.length > 0 && (
                      <Badge variant="secondary">
                        {area.items.length} {c(area.items.length === 1 ? 'product' : 'products', 'produk')}
                      </Badge>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeArea(area.id)}
                    className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                  >
                    {c('Remove', 'Hapus')}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between pt-2">
          <Button variant="outline" onClick={handleBack} className="h-10">
            {c('Back', 'Kembali')}
          </Button>
          <Button onClick={handleContinue} size="lg" className="h-10">
            {c('Continue to Products', 'Lanjut ke Produk')}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
