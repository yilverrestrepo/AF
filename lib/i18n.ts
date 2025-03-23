import { getRequestConfig } from "next-intl/server"

export const locales = ["es", "en", "fr", "de"]
export const defaultLocale = "es"

// Carga las traducciones usando dynamic import
const getMessages = async (locale: string, namespace: string) => {
  try {
    return (await import(`../locales/${locale}/${namespace}.json`)).default
  } catch (error) {
    console.error(`Error loading translations for ${locale}/${namespace}:`, error)
    return {}
  }
}

export default getRequestConfig(async ({ locale }) => {
  // Cargar traducciones para el locale actual
  const messages: Record<string, Record<string, string>> = {}

  // Cargar los namespaces comunes
  const namespaces = ["common", "auth", "properties", "reservations"]

  for (const namespace of namespaces) {
    try {
      messages[namespace] = await getMessages(locale, namespace)
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

