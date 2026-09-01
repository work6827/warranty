'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { HardHat, Pencil, Phone, Plus, UserCheck, UserX } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Alert } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLocale } from '@/lib/i18n/locale-context'

type Technician = {
  id: string
  name: string
  phone: string | null
  role: string | null
  is_active: boolean | null
  created_at: string | null
}

type TechnicianForm = { name: string; phone: string; role: string }
const EMPTY_FORM: TechnicianForm = { name: '', phone: '', role: 'Installation Technician' }

export function TechnicianManager({ initialTechnicians, loadError }: { initialTechnicians: Technician[]; loadError?: string }) {
  const router = useRouter()
  const { locale, t } = useLocale()
  const c = (en: string, id: string) => locale === 'id' ? id : en
  const [technicians, setTechnicians] = useState(initialTechnicians)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Technician | null>(null)
  const [form, setForm] = useState<TechnicianForm>(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [pendingId, setPendingId] = useState<string | null>(null)
  const [error, setError] = useState(loadError || '')

  const openCreate = () => {
    setEditing(null)
    setForm(EMPTY_FORM)
    setError('')
    setDialogOpen(true)
  }

  const openEdit = (technician: Technician) => {
    setEditing(technician)
    setForm({ name: technician.name, phone: technician.phone || '', role: technician.role || 'Installation Technician' })
    setError('')
    setDialogOpen(true)
  }

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault()
    const name = form.name.trim()
    if (!name) {
      setError(c('Technician name is required.', 'Nama teknisi wajib diisi.'))
      return
    }

    setSaving(true)
    setError('')
    const supabase = createClient()
    const payload = { name, phone: form.phone.trim() || null, role: form.role.trim() || null }

    if (editing) {
      const { data, error: updateError } = await supabase.from('installers').update(payload).eq('id', editing.id).select('id, name, phone, role, is_active, created_at').single()
      if (updateError || !data) {
        setError(updateError?.message || c('Unable to update technician.', 'Tidak dapat memperbarui teknisi.'))
        setSaving(false)
        return
      }
      setTechnicians((current) => current.map((item) => item.id === data.id ? data : item))
    } else {
      const { data, error: insertError } = await supabase.from('installers').insert(payload).select('id, name, phone, role, is_active, created_at').single()
      if (insertError || !data) {
        setError(insertError?.message || c('Unable to add technician.', 'Tidak dapat menambahkan teknisi.'))
        setSaving(false)
        return
      }
      setTechnicians((current) => [data, ...current])
    }

    setSaving(false)
    setDialogOpen(false)
    router.refresh()
  }

  const toggleActive = async (technician: Technician) => {
    setPendingId(technician.id)
    setError('')
    const nextActive = !technician.is_active
    const { error: updateError } = await createClient().from('installers').update({ is_active: nextActive }).eq('id', technician.id)
    if (updateError) {
      setError(updateError.message || c('Unable to update technician status.', 'Tidak dapat memperbarui status teknisi.'))
    } else {
      setTechnicians((current) => current.map((item) => item.id === technician.id ? { ...item, is_active: nextActive } : item))
      router.refresh()
    }
    setPendingId(null)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-10 lg:px-8">
      <div className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">{t('admin.technicians.title')}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{t('admin.technicians.subtitle')}</p>
        </div>
        <Button size="lg" className="h-10 w-full gap-1.5 sm:w-auto" onClick={openCreate}><Plus className="size-4" />{t('admin.technicians.add')}</Button>
      </div>

      {error && !dialogOpen && <Alert variant="destructive" className="mb-5">{error}</Alert>}

      {technicians.length === 0 ? (
        <Card><CardContent className="flex flex-col items-center gap-3 py-16 text-center">
          <HardHat className="size-9 text-muted-foreground/50" />
          <div><p className="font-medium text-foreground">{t('admin.technicians.empty')}</p><p className="mt-1 text-sm text-muted-foreground">{t('admin.technicians.emptyBody')}</p></div>
          <Button className="mt-2" onClick={openCreate}><Plus className="size-4" />{t('admin.technicians.add')}</Button>
        </CardContent></Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {technicians.map((technician) => (
            <Card key={technician.id} className={!technician.is_active ? 'opacity-65' : undefined}>
              <CardContent className="space-y-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft"><HardHat className="size-5 text-brand" /></div>
                    <div className="min-w-0"><h2 className="truncate font-medium text-foreground">{technician.name}</h2><p className="truncate text-sm text-muted-foreground">{technician.role || c('Installation Technician', 'Teknisi Pemasangan')}</p></div>
                  </div>
                  <Badge variant={technician.is_active ? 'default' : 'secondary'}>{technician.is_active ? t('admin.common.active') : t('admin.common.inactive')}</Badge>
                </div>
                <div className="min-h-5 text-sm text-muted-foreground">
                  {technician.phone ? <span className="flex items-center gap-1.5"><Phone className="size-3.5" />{technician.phone}</span> : t('admin.technicians.noPhone')}
                </div>
                <div className="flex gap-2 border-t border-border pt-4">
                  <Button variant="outline" className="flex-1" onClick={() => openEdit(technician)}><Pencil className="size-3.5" />{t('admin.technicians.edit')}</Button>
                  <Button variant="ghost" className="flex-1" disabled={pendingId === technician.id} onClick={() => toggleActive(technician)}>
                    {technician.is_active ? <UserX className="size-3.5" /> : <UserCheck className="size-3.5" />}{technician.is_active ? t('admin.technicians.deactivate') : t('admin.technicians.activate')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <form onSubmit={handleSave}>
            <DialogHeader><DialogTitle>{editing ? t('admin.technicians.editTitle') : t('admin.technicians.add')}</DialogTitle><DialogDescription>{editing ? t('admin.technicians.editBody') : t('admin.technicians.addBody')}</DialogDescription></DialogHeader>
            <div className="my-5 space-y-4">
              <div className="space-y-1.5"><Label htmlFor="technician-name">{t('admin.technicians.name')}</Label><Input id="technician-name" autoFocus required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></div>
              <div className="space-y-1.5"><Label htmlFor="technician-phone">{t('admin.technicians.phone')}</Label><Input id="technician-phone" type="tel" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} placeholder="e.g. 0812 3456 7890" /></div>
              <div className="space-y-1.5"><Label htmlFor="technician-role">{t('admin.technicians.role')}</Label><Input id="technician-role" value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })} /></div>
              {error && <Alert variant="destructive">{error}</Alert>}
            </div>
            <DialogFooter showCloseButton><Button type="submit" disabled={saving}>{saving ? t('admin.technicians.saving') : editing ? t('admin.technicians.save') : t('admin.technicians.add')}</Button></DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
