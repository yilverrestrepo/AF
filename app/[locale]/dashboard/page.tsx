import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import DashboardTabs from "@/components/dashboard/DashboardTabs"
import DashboardOverview from "@/components/dashboard/DashboardOverview"
import { UserCircle } from "lucide-react"

export default async function DashboardPage({ params }: { params: { locale: string } }) {
  const session = await getServerSession(authOptions)

  // Si el usuario no está autenticado, mostrar un mensaje de bienvenida
  if (!session) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center py-12 border rounded-lg">
          <UserCircle className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h1 className="text-3xl font-bold mb-4">Bienvenido al Panel de Control</h1>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Para acceder a todas las funcionalidades del panel de control, por favor inicia sesión o regístrate.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild>
              <Link href={`/${params.locale}/login?callbackUrl=/${params.locale}/dashboard`}>Iniciar sesión</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={`/${params.locale}/register?callbackUrl=/${params.locale}/dashboard`}>Registrarse</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Panel de control</h1>

      <DashboardTabs locale={params.locale} activeTab="overview" />

      <div className="mt-6">
        <DashboardOverview userId={session.user.id} locale={params.locale} />
      </div>
    </div>
  )
}

