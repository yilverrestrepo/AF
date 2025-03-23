import type React from "react"
import type { Metadata } from "next"
<<<<<<< HEAD
import "./globals.css"
import ReactQueryProvider from "@/lib/react-query"
import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from "next/font/google"
=======
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { UserProvider } from "@/contexts/UserContext"
import { Toaster } from "@/components/ui/toaster"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
>>>>>>> 07b70d897bbbb8dcc81ecc896f83a8f93e9c7d15

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
<<<<<<< HEAD
  title: "FINCAS - Plataforma de Alquiler de Propiedades",
  description: "Encuentra y reserva propiedades en alquiler",
  manifest: "/manifest.json",
  themeColor: "#4f46e5",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "FINCAS",
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
=======
  title: "Fincos - Plataforma de alquiler de propiedades",
  description: "Encuentra y alquila propiedades en los mejores destinos",
>>>>>>> 07b70d897bbbb8dcc81ecc896f83a8f93e9c7d15
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
<<<<<<< HEAD
    <html lang="es">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <ReactQueryProvider>{children}</ReactQueryProvider>
=======
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <UserProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </UserProvider>
>>>>>>> 07b70d897bbbb8dcc81ecc896f83a8f93e9c7d15
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'