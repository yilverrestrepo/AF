"use client"

import { useState, useTransition } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import { locales } from "@/lib/i18n"

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
  const pathnameWithoutLocale = isValidLocale ? pathname.replace(`/${currentLocale}`, "") || "/" : pathname

  const handleLocaleChange = (newLocale: string) => {
    setIsOpen(false)

    if (newLocale === currentLocale) return

    startTransition(() => {
      router.push(`/${newLocale}${pathnameWithoutLocale}`)
    })
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" disabled={isPending}>
          <Globe className="h-5 w-5" />
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

