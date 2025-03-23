import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import LoginForm from "@/components/auth/LoginForm"

export default async function LoginPage({ params }: { params: { locale: string } }) {
  const session = await getServerSession(authOptions)

  // Redirigir si ya está autenticado
  if (session) {
    redirect(`/${params.locale}`)
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Iniciar sesión</h1>

        <LoginForm locale={params.locale} />

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            ¿No tienes una cuenta?{" "}
            <Link href={`/${params.locale}/register`} className="text-primary hover:underline">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

