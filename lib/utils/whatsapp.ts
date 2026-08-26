/**
 * Generate WhatsApp URL with pre-filled message
 */
export function generateWhatsAppUrl(phone: string, message: string): string {
  const cleanPhone = phone.replace(/\D/g, '')
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`
}

/**
 * Generate customer support message
 */
export function generateSupportMessage(projectId: string, customerName: string): string {
  return `Halo Halla Home, saya ${customerName} memerlukan bantuan untuk Project H Passport: ${projectId}`
}

/**
 * Generate service request message
 */
export function generateServiceRequestMessage(projectId: string, customerName: string, productInfo: string): string {
  return `Halo Halla Home, saya ${customerName} ingin request service untuk ${productInfo} (Project: ${projectId})`
}

/**
 * Generate warranty inquiry message
 */
export function generateWarrantyInquiryMessage(projectId: string, customerName: string): string {
  return `Halo Halla Home, saya ${customerName} ingin menanyakan tentang warranty untuk Project: ${projectId}`
}
