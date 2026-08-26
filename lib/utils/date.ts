import { format, addMonths, differenceInDays, isPast, isFuture } from 'date-fns'
import { id as localeId } from 'date-fns/locale'

/**
 * Format date for display
 */
export function formatDate(date: string | Date | null | undefined, formatStr: string = 'dd MMMM yyyy'): string {
  if (!date) return '-'
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return format(dateObj, formatStr, { locale: localeId })
}

/**
 * Calculate warranty expiration date
 */
export function calculateExpirationDate(startDate: string | Date, durationMonths: number): Date {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate
  return addMonths(start, durationMonths)
}

/**
 * Get warranty status based on expiration date
 */
export function getWarrantyStatus(expirationDate: string | Date | null, isEnabled: boolean = true): 'active' | 'expiring_soon' | 'expired' | 'no_warranty' {
  if (!isEnabled || !expirationDate) return 'no_warranty'
  
  const expDate = typeof expirationDate === 'string' ? new Date(expirationDate) : expirationDate
  
  if (isPast(expDate)) return 'expired'
  
  const daysRemaining = differenceInDays(expDate, new Date())
  if (daysRemaining <= 90) return 'expiring_soon'
  
  return 'active'
}

/**
 * Get days remaining until expiration
 */
export function getDaysRemaining(expirationDate: string | Date): number {
  const expDate = typeof expirationDate === 'string' ? new Date(expirationDate) : expirationDate
  return Math.max(0, differenceInDays(expDate, new Date()))
}

/**
 * Format date for input fields (YYYY-MM-DD)
 */
export function formatDateForInput(date: string | Date | null | undefined): string {
  if (!date) return ''
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return format(dateObj, 'yyyy-MM-dd')
}
