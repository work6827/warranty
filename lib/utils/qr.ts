import QRCode from 'qrcode'

/**
 * Generate QR code as data URL
 */
export async function generateQRCode(url: string): Promise<string> {
  try {
    const qrDataUrl = await QRCode.toDataURL(url, {
      width: 512,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
      errorCorrectionLevel: 'M',
    })
    return qrDataUrl
  } catch (error) {
    console.error('Error generating QR code:', error)
    throw new Error('Failed to generate QR code')
  }
}

/**
 * Generate QR code as buffer (for server-side generation)
 */
export async function generateQRCodeBuffer(url: string): Promise<Buffer> {
  try {
    const buffer = await QRCode.toBuffer(url, {
      width: 512,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
      errorCorrectionLevel: 'M',
    })
    return buffer
  } catch (error) {
    console.error('Error generating QR code buffer:', error)
    throw new Error('Failed to generate QR code')
  }
}
