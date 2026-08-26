import type { Metadata } from 'next'
import { HomePageContent } from '@/components/home/home-page-content'

export const metadata: Metadata = {
  title: 'Halla Home — Project H Passport',
  description:
    'Every Halla Home installation comes with a digital Project H Passport: product records, warranty status, maintenance guides, and support, all in one place.',
}

export default function HomePage() {
  return <HomePageContent />
}
