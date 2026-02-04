import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'REBAHIN - Streaming Dan Download Film Sub Indo Terbaru',
    description: 'Nonton film sub indo terbaru gratis di REBAHIN.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="id" suppressHydrationWarning={true}>
            <body className={inter.className} suppressHydrationWarning={true}>
                {children}
            </body>
        </html>
    )
}
