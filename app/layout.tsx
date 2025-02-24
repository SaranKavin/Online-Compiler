import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Compiler Website",
  description: "A website for compiling and analyzing code",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-blue-800 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">
            &lt;Online-Compiler&gt;
            </Link>
            <div className="space-x-4">
              <Link href="/" className="hover:text-gray-300">
                Compiler
              </Link>
              <Link href="/compiler-phases" className="hover:text-gray-300">
                Phases Of Compiler
              </Link>
            </div>
          </div>
        </nav>
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  )
}



import './globals.css'