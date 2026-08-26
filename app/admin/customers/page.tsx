import { Users } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export default async function CustomersPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-2xl font-semibold tracking-tight text-foreground">Customers</h1>
      <Card>
        <CardContent className="flex flex-col items-center gap-3 py-16 text-center text-muted-foreground">
          <Users className="size-8 text-muted-foreground/50" />
          Customer management coming soon
        </CardContent>
      </Card>
    </div>
  )
}
