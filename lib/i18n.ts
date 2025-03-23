import { createInstance } from "i18next"
import resourcesToBackend from "i18next-resources-to-backend"
import { initReactI18next } from "react-i18next/initReactI18next"
import { getRequestConfig } from "next-intl/server"

export const locales = ["es", "en", "fr", "de"]
export const defaultLocale = "es"

// Carga las traducciones usando dynamic import
const getResources = (locale: string, namespace: string) =>
  import(`../locales/${locale}/${namespace}.json`).then((module) => module.default)

export async function createI18nInstance(locale: string, namespaces: string[]) {
  const i18nInstance = createInstance()

  await i18nInstance
    .use(initReactI18next)
    .use(resourcesToBackend((language: string, namespace: string) => getResources(language, namespace)))
    .init({
      lng: locale,
      fallbackLng: defaultLocale,
      supportedLngs: locales,
      defaultNS: "common",
      fallbackNS: "common",
      ns: namespaces,
      react: {
        useSuspense: false,
      },
    })

  return i18nInstance
}

export const getI18nConfig = getRequestConfig(async ({ locale }) => {
  // Cargar traducciones para el locale actual
  const messages = {}

  // Cargar los namespaces comunes
  const namespaces = ["common", "auth", "properties", "reservations"]

  for (const namespace of namespaces) {
    try {
      const translations = await getResources(locale, namespace)
      messages[namespace] = translations
    } catch (error) {
      console.error(`Error loading translations for ${locale}/${namespace}:`, error)
    }
  }

  return {
    messages,
    timeZone: "Europe/Madrid",
    now: new Date(),
  }
})

