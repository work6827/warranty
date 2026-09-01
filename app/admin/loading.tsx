export default function AdminLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14" role="status" aria-label="Loading page">
      <div className="mb-10 flex items-end justify-between gap-6">
        <div className="space-y-3">
          <div className="h-3 w-28 animate-pulse rounded-full bg-secondary" />
          <div className="h-9 w-52 animate-pulse rounded-xl bg-secondary" />
          <div className="h-4 w-72 max-w-full animate-pulse rounded-full bg-secondary" />
        </div>
        <div className="h-10 w-32 animate-pulse rounded-full bg-secondary" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="h-28 animate-pulse rounded-2xl border border-border bg-card" />
        ))}
      </div>
      <span className="sr-only">Loading…</span>
    </div>
  )
}
