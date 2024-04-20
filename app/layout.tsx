import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ModelProvider } from '@/provider/model.provider'
import { ToastPrivder } from '@/provider/toast-provider'
import { ThemeProvider } from '@/provider/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Temitope ecommerce portfolio',
  description: 'Admin Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
        <ToastPrivder/>
        <ModelProvider/>
         {children}
         </ThemeProvider>
        </body>
    </html>
    </ClerkProvider>
  )
}
