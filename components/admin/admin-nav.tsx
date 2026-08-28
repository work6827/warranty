'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ChevronDown, CircleUserRound, LayoutDashboard, Users, Package, HardHat, FolderKanban } from 'lucide-react'
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
    <nav className="sticky top-0 z-40 border-b border-black/5 bg-background/88 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[68px] items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-5 lg:gap-7">
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
                      'relative flex items-center gap-1.5 px-2.5 py-2 text-sm font-medium transition-colors after:absolute after:right-3 after:bottom-0 after:left-3 after:h-px after:origin-center after:scale-x-0 after:bg-brand after:transition-transform lg:px-3',
                      active
                        ? 'text-foreground after:scale-x-100'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <item.icon className="size-4" />
                    {t(item.labelKey)}
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1">
            <SettingsMenu />
            <DropdownMenu>
              <DropdownMenuTrigger
                aria-label="Open admin account menu"
                className={buttonVariants({ variant: 'ghost', className: 'h-9 gap-2 rounded-full pr-2 pl-1.5' })}
              >
                <span className="flex size-6 items-center justify-center rounded-full bg-secondary text-muted-foreground">
                  <CircleUserRound className="size-3.5" />
                </span>
                <span className="hidden text-sm lg:inline">Admin</span>
                <ChevronDown className="size-3.5 text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuItem disabled className="block truncate px-2 py-2 text-xs text-muted-foreground">
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
