import type { Metadata } from 'next'
import { Orbitron, Space_Grotesk } from 'next/font/google'
import './globals.css'
import MouseFollower from '@/components/MouseFollower'

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  weight: ['400', '500', '600', '700', '800', '900'],
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'TENZOR LABS | Innovate • Build • Evolve',
  description:
    'TENZOR LABS - Professional IT & Data Science project support. Web & Software Development, Data Analysis, Machine Learning & AI Projects, Final Year Project Support.',
  keywords: [
    'TENZOR LABS',
    'software company',
    'IT support',
    'data science',
    'machine learning',
    'web development',
    'final year project',
    'SLIIT',
  ],
  openGraph: {
    title: 'TENZOR LABS | Innovate • Build • Evolve',
    description:
      'Professional IT & Data Science project support for university students.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${orbitron.variable} ${spaceGrotesk.variable} font-space bg-darker text-white antialiased`}>
        <MouseFollower />
        {children}
      </body>
    </html>
  )
}
