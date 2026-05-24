import React from 'react'
import type { Metadata } from 'next'
import '../../styles/tailwind.css'
import '../../styles/theme.css'
import '../../styles/fonts.css'
import '../../../default_shadcn_theme.css'

export const metadata: Metadata = {
  title: "Tehreem Noor | Portfolio",
  description: "UI/UX Designer crafting scalable digital products focused on usability, clarity, and business impact.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" style={{ height: '100%' }}>
      <body style={{ height: '100%', margin: 0 }}>
        <div id="root" style={{ height: '100%' }}>
          {children}
        </div>
      </body>
    </html>
  )
}
