import type { Metadata } from 'next'
import { Header } from '@/components/header'
import './globals.css'
import '../fonts/stylesheet.css'
import Providers from 'providers/providers'

export const metadata: Metadata = {
  title: 'Edgar Araújo - Personal Portfolio',
  description:
    "The place to learn more about me and the projects I've worked on.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en dark'>
      <body className='bg-dark-primary text-white h-svh'>
        <Header />
        <main className='max-w-6xl mx-auto px-6 pb-12 pt-6 sm:pt-12'>
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  )
}
