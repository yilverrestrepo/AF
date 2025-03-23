import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import RegisterForm from "@/components/auth/RegisterForm"

export default async function RegisterPage({ params }: { params: { locale: string } }) {
  const session = await getServerSession(authOptions)

  // Redirigir si ya está autenticado
  if (session) {
    redirect(`/${params.locale}`)
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Crear cuenta</h1>

        <RegisterForm />

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            ¿Ya tienes una cuenta?{" "}
            <Link href={`/${params.locale}/login`} className="text-primary hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

