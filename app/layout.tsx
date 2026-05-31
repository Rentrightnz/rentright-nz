import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'RentRight NZ — Know Your Landlord Before You Sign',
  description: 'Verified landlord trust scores, Tribunal records, and anonymous tenant reviews. Built for New Zealand renters.',
  keywords: 'NZ landlord reviews, tenancy tribunal, rental trust score, New Zealand renting',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
