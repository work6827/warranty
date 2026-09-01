'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle2, KeyRound, Save, UserRound } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Alert } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLocale } from '@/lib/i18n/locale-context'

export function ProfileSettingsForm({
  userId,
  email,
  initialName,
  role,
}: {
  userId: string
  email: string
  initialName: string
  role: string
}) {
  const router = useRouter()
  const { locale } = useLocale()
  const c = (en: string, id: string) => locale === 'id' ? id : en
  const [name, setName] = useState(initialName)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [savingProfile, setSavingProfile] = useState(false)
  const [savingPassword, setSavingPassword] = useState(false)
  const [profileMessage, setProfileMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [passwordMessage, setPasswordMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const saveProfile = async (event: React.FormEvent) => {
    event.preventDefault()
    const cleanName = name.trim()
    if (cleanName.length < 2) {
      setProfileMessage({ type: 'error', text: c('Please enter at least 2 characters.', 'Masukkan minimal 2 karakter.') })
      return
    }

    setSavingProfile(true)
    setProfileMessage(null)
    const supabase = createClient()
    const { error: authError } = await supabase.auth.updateUser({ data: { full_name: cleanName } })
    const { error: profileError } = authError
      ? { error: null }
      : await supabase.from('admin_users').update({ full_name: cleanName }).eq('id', userId)

    if (authError || profileError) {
      setProfileMessage({ type: 'error', text: authError?.message || profileError?.message || c('Unable to save profile.', 'Profil tidak dapat disimpan.') })
    } else {
      setName(cleanName)
      setProfileMessage({ type: 'success', text: c('Profile updated successfully.', 'Profil berhasil diperbarui.') })
      router.refresh()
    }
    setSavingProfile(false)
  }

  const savePassword = async (event: React.FormEvent) => {
    event.preventDefault()
    setPasswordMessage(null)
    if (newPassword.length < 8) {
      setPasswordMessage({ type: 'error', text: c('Password must contain at least 8 characters.', 'Password harus berisi minimal 8 karakter.') })
      return
    }
    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: 'error', text: c('The passwords do not match.', 'Konfirmasi password tidak cocok.') })
      return
    }

    setSavingPassword(true)
    const { error } = await createClient().auth.updateUser({ password: newPassword })
    if (error) {
      setPasswordMessage({ type: 'error', text: error.message })
    } else {
      setNewPassword('')
      setConfirmPassword('')
      setPasswordMessage({ type: 'success', text: c('Password changed successfully.', 'Password berhasil diubah.') })
    }
    setSavingPassword(false)
  }

  return (
    <div className="grid items-start gap-5 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <CardTitle className="flex items-center gap-2 text-base"><UserRound className="size-4 text-brand" />{c('Profile details', 'Detail profil')}</CardTitle>
            <Badge variant="secondary" className="capitalize">{role}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={saveProfile} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="profile-name">{c('Display name', 'Nama tampilan')}</Label>
              <Input id="profile-name" value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" disabled={savingProfile} />
              <p className="text-xs text-muted-foreground">{c('This name identifies you inside the admin system.', 'Nama ini mengidentifikasi Anda di dalam sistem admin.')}</p>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="profile-email">Email</Label>
              <Input id="profile-email" value={email} readOnly disabled />
              <p className="text-xs text-muted-foreground">{c('Contact a super admin to change the login email.', 'Hubungi super admin untuk mengubah email login.')}</p>
            </div>
            {profileMessage && <Alert variant={profileMessage.type === 'error' ? 'destructive' : 'default'}>{profileMessage.type === 'success' && <CheckCircle2 />}{profileMessage.text}</Alert>}
            <Button type="submit" disabled={savingProfile || name.trim() === initialName} className="w-full sm:w-auto"><Save className="size-4" />{savingProfile ? c('Saving…', 'Menyimpan…') : c('Save profile', 'Simpan profil')}</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-base"><KeyRound className="size-4 text-brand" />{c('Change password', 'Ubah password')}</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={savePassword} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="new-password">{c('New password', 'Password baru')}</Label>
              <Input id="new-password" type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} autoComplete="new-password" disabled={savingPassword} placeholder="••••••••" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="confirm-password">{c('Confirm new password', 'Konfirmasi password baru')}</Label>
              <Input id="confirm-password" type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} autoComplete="new-password" disabled={savingPassword} placeholder="••••••••" />
            </div>
            {passwordMessage && <Alert variant={passwordMessage.type === 'error' ? 'destructive' : 'default'}>{passwordMessage.type === 'success' && <CheckCircle2 />}{passwordMessage.text}</Alert>}
            <Button type="submit" disabled={savingPassword || !newPassword || !confirmPassword} className="w-full sm:w-auto"><KeyRound className="size-4" />{savingPassword ? c('Updating…', 'Memperbarui…') : c('Update password', 'Perbarui password')}</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
