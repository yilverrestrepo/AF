"use client"

import { useState, useTransition } from "react"
import { useRouter, usePathname } from "@/app/i18n"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import config from "@/next-intl.config"

const locales = config.locales

const languageNames = {
  es: "Español",
  en: "English",
  fr: "Français",
  de: "Deutsch",
}

export default function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const [isOpen, setIsOpen] = useState(false)

  // Obtener el locale actual del pathname
  const currentLocale = pathname.split("/")[1]

  // Verificar si el locale actual es válido
  const isValidLocale = locales.includes(currentLocale)

  // Obtener el resto del pathname sin el locale
  const pathnameWithoutLocale = pathname

  const handleLocaleChange = (newLocale: string) => {
    setIsOpen(false)

    if (newLocale === currentLocale) return

    startTransition(() => {
      router.push(pathname, { locale: newLocale })
    })
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" disabled={isPending}>
          <span className="text-lg">🌐</span>
          <span className="sr-only">Cambiar idioma</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => handleLocaleChange(locale)}
            className={locale === currentLocale ? "bg-gray-100 font-medium" : ""}
          >
            {languageNames[locale as keyof typeof languageNames]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

