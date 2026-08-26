import { cn } from '@/lib/utils'

/**
 * The Halla Home mark: a quiet monogram (a roofline resolving into an "H")
 * plus a two-tier wordmark — "Halla Home" as the company, "Project H" as
 * the passport product it issues. Used across the public site, the
 * passport, and the admin console so the whole system reads as one brand.
 */
export function Logo({
  className,
  tagline = true,
  size = 'default',
}: {
  className?: string
  tagline?: boolean
  size?: 'default' | 'sm'
}) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <Monogram size={size === 'sm' ? 28 : 34} />
      <div className="leading-none">
        <div
          className={cn(
            'font-semibold tracking-tight text-foreground',
            size === 'sm' ? 'text-[15px]' : 'text-[17px]'
          )}
        >
          Halla Home
        </div>
        {tagline && (
          <div className="mt-0.5 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
            Project H Passport
          </div>
        )}
      </div>
    </div>
  )
}

export function Monogram({ size = 34, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 34 34"
      fill="none"
      className={cn('shrink-0', className)}
      aria-hidden="true"
    >
      <rect width="34" height="34" rx="9" fill="var(--primary)" />
      <path
        d="M10 24V10.5M24 24V10.5M10 17H24"
        stroke="var(--brand)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M9 12L17 7L25 12"
        stroke="var(--brand)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
