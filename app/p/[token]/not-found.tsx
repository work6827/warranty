import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export default function PassportNotFound() {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-neutral-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-semibold text-neutral-900 mb-2">
          Passport Not Found
        </h1>
        <p className="text-neutral-600 mb-6">
          This Halla+ Digital Passport doesn&apos;t exist or has been removed.
        </p>

        <div className="space-y-3">
          <p className="text-sm text-neutral-500">
            If you believe this is a mistake, please contact Halla+.
          </p>
          <Link href="/" className={buttonVariants({ className: 'mt-3 h-10' })}>
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
