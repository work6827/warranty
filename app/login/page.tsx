'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Logo } from '@/components/brand/logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert } from '@/components/ui/alert'
import { SettingsMenu } from '@/components/settings/settings-menu'
import { useLocale } from '@/lib/i18n/locale-context'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const { t } = useLocale()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Create the browser client only in response to user interaction.
      // Instantiating it during render makes static prerendering depend on
      // deployment environment variables and caused Vercel builds to fail.
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      router.push('/admin')
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/40 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/">
            <Logo />
          </Link>
          <SettingsMenu />
        </div>

        <div className="rounded-2xl border border-border bg-card p-8 shadow-soft">
          <h1 className="text-lg font-semibold text-foreground">{t('admin.login.title')}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {t('admin.login.subtitle')}
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="email">{t('admin.login.email')}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@hallahome.id"
                required
                autoComplete="email"
                disabled={loading}
                className="h-10"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">{t('admin.login.password')}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
                disabled={loading}
                className="h-10"
              />
            </div>

            {error && <Alert variant="destructive">{error}</Alert>}

            <Button type="submit" className="h-10 w-full" disabled={loading}>
              {loading ? t('admin.login.submitting') : t('admin.login.submit')}
            </Button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            ← {t('admin.login.back')}
          </Link>
        </p>
      </div>
    </div>
  )
}
