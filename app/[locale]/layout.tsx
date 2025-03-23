import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { ThemeProvider } from "@/components/theme-provider"
import ReactQueryProvider from "@/lib/react-query"
import RegisterSW from "@/components/pwa/RegisterSW"
import InstallPrompt from "@/components/pwa/InstallPrompt"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import "@/app/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
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
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <ReactQueryProvider>
              <RegisterSW />
              <InstallPrompt />
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            </ReactQueryProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}


