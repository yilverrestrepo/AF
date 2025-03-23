import { redirect } from "next/navigation"

export default function RootPage() {
  // Redirigir a la página con el locale por defecto
  redirect("/es")
}

