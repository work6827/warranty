import Image from 'next/image'
import { cn } from '@/lib/utils'

/**
 * The Halla+ mark, used across the public site, passports, and admin console.
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
    <div className={cn('inline-flex flex-col items-start', className)}>
      <div className={cn('relative overflow-hidden', size === 'sm' ? 'h-7 w-[106px]' : 'h-8 w-[124px]')}>
        <Image
          src="/halla-plus-wordmark-upright.png"
          alt="Halla+"
          width={2162}
          height={727}
          priority
          className="absolute top-1/2 left-1/2 h-auto w-[108%] max-w-none -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      {tagline && (
        <div className={cn('font-medium tracking-[0.18em] text-muted-foreground uppercase', size === 'sm' ? 'mt-0.5 text-[8px]' : 'mt-1 text-[9px]')}>
          Digital Passport
        </div>
      )}
    </div>
  )
}
