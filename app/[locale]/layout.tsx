import type React from "react"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { ThemeProvider } from "@/components/theme-provider"
import ReactQueryProvider from "@/lib/react-query"
import RegisterSW from "@/components/pwa/RegisterSW"
import InstallPrompt from "@/components/pwa/InstallPrompt"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = await getMessages()

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <ReactQueryProvider>
          <RegisterSW />
          <InstallPrompt />
          <div className="flex flex-col min-h-screen">
            <Header locale={locale} />
            <main className="flex-1">{children}</main>
            <Footer locale={locale} />
          </div>
        </ReactQueryProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  )
}

