'use client'

import { useProjectFormStore } from '@/lib/store/project-form-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useLocale } from '@/lib/i18n/locale-context'

const projectTypes = [
  { value: 'residential', label: 'Residential' },
  { value: 'office', label: 'Office' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'hospitality', label: 'Hospitality' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'education', label: 'Education' },
  { value: 'other', label: 'Other' },
]

export function ProjectStep() {
  const { locale } = useLocale()
  const c = (en: string, id: string) => locale === 'id' ? id : en
  const { projectData, setProjectData, setStep, customerData } = useProjectFormStore()

  const handleContinue = () => {
    if (!projectData.name || !projectData.project_type) {
      alert(c('Please fill in required fields', 'Silakan lengkapi kolom wajib'))
      return
    }
    setStep('areas')
  }

  const handleBack = () => {
    setStep('customer')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{c('Step 2: Project Information', 'Langkah 2: Informasi Proyek')}</CardTitle>
        {customerData && (
          <p className="text-sm text-muted-foreground">{c('Customer', 'Pelanggan')}: {customerData.name}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="project-name">
              {c('Project Name', 'Nama Proyek')} <span className="text-destructive">*</span>
            </Label>
            <Input
              id="project-name"
              value={projectData.name}
              onChange={(e) => setProjectData({ name: e.target.value })}
              placeholder="PIK Residence Renovation"
              className="h-10"
            />
            <p className="text-xs text-muted-foreground">{c('A descriptive name for this project', 'Nama yang menggambarkan proyek ini')}</p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="project-type">
              {c('Project Type', 'Jenis Proyek')} <span className="text-destructive">*</span>
            </Label>
            <Select value={projectData.project_type} onValueChange={(value: any) => setProjectData({ project_type: value })}>
              <SelectTrigger id="project-type" className="h-10 w-full">
                <SelectValue placeholder={c('Select project type', 'Pilih jenis proyek')}>
                  {(value: string) => {
                    const type = projectTypes.find((t) => t.value === value)?.label
                    return locale === 'id' ? ({ Residential: 'Hunian', Office: 'Kantor', Commercial: 'Komersial', Hospitality: 'Hospitalitas', Healthcare: 'Kesehatan', Education: 'Pendidikan', Other: 'Lainnya' } as Record<string, string>)[type || ''] || type : type
                  }}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {projectTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {locale === 'id' ? ({ Residential: 'Hunian', Office: 'Kantor', Commercial: 'Komersial', Hospitality: 'Hospitalitas', Healthcare: 'Kesehatan', Education: 'Pendidikan', Other: 'Lainnya' } as Record<string, string>)[type.label] : type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="installation-date">{c('Installation Date', 'Tanggal Instalasi')}</Label>
            <Input
              id="installation-date"
              type="date"
              value={projectData.installation_date || ''}
              onChange={(e) => setProjectData({ installation_date: e.target.value })}
              className="h-10"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="address">{c('Project Address (Internal Only)', 'Alamat Proyek (Internal Saja)')}</Label>
            <Textarea
              id="address"
              value={projectData.address || ''}
              onChange={(e) => setProjectData({ address: e.target.value })}
              placeholder={c('Full project address', 'Alamat lengkap proyek')}
              rows={3}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="notes">{c('Internal Notes', 'Catatan Internal')}</Label>
            <Textarea
              id="notes"
              value={projectData.notes || ''}
              onChange={(e) => setProjectData({ notes: e.target.value })}
              placeholder={c('Any internal notes about this project', 'Catatan internal mengenai proyek ini')}
              rows={3}
            />
          </div>
        </div>

        <div className="flex justify-between pt-2">
          <Button variant="outline" onClick={handleBack} className="h-10">
            {c('Back', 'Kembali')}
          </Button>
          <Button onClick={handleContinue} size="lg" className="h-10">
            {c('Continue to Areas', 'Lanjut ke Area')}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
