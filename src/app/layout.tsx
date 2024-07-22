import { NextUIProvider } from '@nextui-org/react'
   import type { Metadata } from 'next'
   import { Inter } from 'next/font/google'
   import './globals.css'

   const inter = Inter({ subsets: ['latin'] })

   export const metadata: Metadata = {
     title: 'Healthcare Case Management',
     description: 'A web app for healthcare case managers',
   }

   export default function RootLayout({
     children,
   }: {
     children: React.ReactNode
   }) {
     return (
       <html lang="en">
         <body className={inter.className}>
           <NextUIProvider>
             {children}
           </NextUIProvider>
         </body>
       </html>
     )
   }