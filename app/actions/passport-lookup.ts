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

function normalizePhone(value: string) {
  return value.replace(/\D/g, '')
}

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

  const code = parsed.data.code.trim().toUpperCase()
  const phoneDigits = normalizePhone(parsed.data.phone)

  const supabase = await createClient()

  const { data: project } = await supabase
    .from('projects')
    .select('public_token, status, customer:customers(phone)')
    .eq('project_id', code)
    .eq('status', 'published')
    .maybeSingle()

  if (!project?.public_token) {
    return NOT_FOUND
  }

  const customer = project.customer as unknown as { phone: string | null } | null
  const customerPhone = normalizePhone(customer?.phone || '')

  // Compare the last 6 digits so formatting differences (+62, leading 0,
  // spaces/dashes) don't cause false negatives.
  const matches =
    phoneDigits.length >= 4 &&
    customerPhone.length >= 4 &&
    customerPhone.slice(-6) === phoneDigits.slice(-6)

  if (!matches) {
    return NOT_FOUND
  }

  redirect(`/p/${project.public_token}`)
}
