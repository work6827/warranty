'use server'

import { z } from 'zod'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { checkRateLimit } from '@/lib/utils/rate-limit'

export type LookupState = { error: string } | null

const lookupSchema = z.object({
  code: z.string().trim().min(3, 'Enter your passport code').max(40),
  phone: z.string().trim().min(4, 'Enter the phone number on file').max(20),
})

// Deliberately generic — never reveal whether the code or the phone number
// was the part that didn't match, so the form can't be used to enumerate
// valid passport codes.
const NOT_FOUND: LookupState = {
  error: "We couldn't find a passport matching that code and phone number.",
}

export async function lookupPassport(
  _prevState: LookupState,
  formData: FormData
): Promise<LookupState> {
  const parsed = lookupSchema.safeParse({
    code: formData.get('code'),
    phone: formData.get('phone'),
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message || 'Check your details and try again.' }
  }

  const headerList = await headers()
  const ip = headerList.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'

  if (!checkRateLimit(`passport-lookup:${ip}`)) {
    return { error: 'Too many attempts. Please wait a few minutes and try again.' }
  }

  const supabase = await createClient()
  const { data: publicToken, error } = await supabase.rpc('lookup_public_passport', {
    p_code: parsed.data.code,
    p_phone: parsed.data.phone,
  })

  if (error || !publicToken) return NOT_FOUND
  redirect(`/p/${publicToken}`)
}
