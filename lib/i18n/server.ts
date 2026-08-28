import 'server-only'

import { cookies } from 'next/headers'
import { dictionary, type DictionaryKey, type Locale } from './dictionary'

export async function getServerLocale(): Promise<Locale> {
  const value = (await cookies()).get('halla-plus-locale')?.value
  return value === 'id' ? 'id' : 'en'
}

export function translate(locale: Locale, key: DictionaryKey): string {
  return dictionary[key]?.[locale] ?? dictionary[key]?.en ?? key
}
