'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SearchProvider } from './hooks/SearchContext'

const inter = Inter({ subsets: ['latin'] })

const metadata = {
  title: 'OnlineStore',
  description: 'By anything with ease',
}

const queryClient= new QueryClient()

export default function RootLayout({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchProvider>
        <html lang="en">
            <body className={inter.className}>
              <Navbar title='OnlineStore' classname='hidden'/>
              {children}
            </body>
        </html>
        </SearchProvider>
    </QueryClientProvider>
  )
}

export {metadata}
