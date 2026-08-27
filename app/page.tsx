import type { Metadata } from 'next'
import { HomePageContent } from '@/components/home/home-page-content'

export const metadata: Metadata = {
  title: 'Halla+ — Digital Passport',
  description:
    'Every Halla+ installation comes with a digital passport: product records, warranty status, maintenance guides, and support, all in one place.',
}

export default function HomePage() {
  return <HomePageContent />
}
