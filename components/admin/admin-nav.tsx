'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Users, Package, HardHat, FolderKanban } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Logo } from '@/components/brand/logo'
import { SettingsMenu } from '@/components/settings/settings-menu'
import { buttonVariants } from '@/components/ui/button'
import { useLocale } from '@/lib/i18n/locale-context'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/admin', labelKey: 'admin.nav.dashboard', icon: LayoutDashboard },
  { href: '/admin/projects', labelKey: 'admin.nav.projects', icon: FolderKanban },
  { href: '/admin/customers', labelKey: 'admin.nav.customers', icon: Users },
  { href: '/admin/products', labelKey: 'admin.nav.products', icon: Package },
  { href: '/admin/installers', labelKey: 'admin.nav.technicians', icon: HardHat },
] as const

export function AdminNav({ userEmail }: { userEmail?: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const { t } = useLocale()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <nav className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" aria-label="Go to Halla+ homepage">
              <Logo size="sm" tagline={false} />
            </Link>
            <div className="hidden gap-1 sm:flex">
              {navItems.map((item) => {
                const active = item.href === '/admin'
                  ? pathname === item.href
                  : pathname.startsWith(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                      active
                        ? 'bg-secondary text-foreground'
                        : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                    )}
                  >
                    <item.icon className="size-4" />
                    {t(item.labelKey)}
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="flex items-center gap-1">
            <SettingsMenu />
            <DropdownMenu>
              <DropdownMenuTrigger className={buttonVariants({ variant: 'ghost', className: 'max-w-44 truncate text-sm' })}>
                {userEmail || 'Admin'}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem disabled className="text-xs text-muted-foreground">
                  {userEmail}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>{t('admin.nav.signOut')}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}
