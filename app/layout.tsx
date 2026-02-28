import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
})

const outfit = Outfit({ 
  subsets: ['latin'],
  weight: ['400', '600', '800'],
  variable: '--font-heading',
})

export const metadata: Metadata = {
  title: 'Demir Süt Ürünleri | Doğal Süt, Yumurta ve Adaklık',
  description: 'Çiftliğimizden sofranıza günlük taze süt, organik köy yumurtası ve adaklık kurbanlık satışı.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={`${inter.variable} ${outfit.variable}`}>{children}</body>
    </html>
  )
}
