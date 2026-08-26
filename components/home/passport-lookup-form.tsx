'use client'

import { useActionState } from 'react'
import { Search, TriangleAlert } from 'lucide-react'
import { lookupPassport, type LookupState } from '@/app/actions/passport-lookup'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const initialState: LookupState = null

export function PassportLookupForm() {
  const [state, formAction, pending] = useActionState(lookupPassport, initialState)

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="code" className="text-xs font-medium text-muted-foreground">
            Passport code
          </Label>
          <Input
            id="code"
            name="code"
            placeholder="H-260824-001"
            autoCapitalize="characters"
            autoComplete="off"
            required
            className="h-11 font-mono text-sm tracking-wide uppercase placeholder:normal-case placeholder:font-sans"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone" className="text-xs font-medium text-muted-foreground">
            Phone number on file
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="08123456789"
            autoComplete="tel"
            required
            className="h-11"
          />
        </div>
      </div>

      {state?.error && (
        <div className="flex items-start gap-2 rounded-lg bg-destructive/10 px-3 py-2.5 text-sm text-destructive">
          <TriangleAlert className="mt-0.5 size-4 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      <Button type="submit" disabled={pending} size="lg" className="h-11 w-full gap-2 text-[15px]">
        <Search className="size-4" />
        {pending ? 'Searching…' : 'Find my passport'}
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        Both the code and phone number were given to you at installation, and printed on your warranty card.
      </p>
    </form>
  )
}
