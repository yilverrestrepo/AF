import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getUserProfile } from "@/lib/users"
import ProfileTabs from "@/components/profile/ProfileTabs"
import ProfileHeader from "@/components/profile/ProfileHeader"
import ProfileInfo from "@/components/profile/ProfileInfo"
import { User } from "lucide-react"

export default async function ProfilePage({ params }: { params: { locale: string } }) {
  const session = await getServerSession(authOptions)

  // Si el usuario no está autenticado, mostrar un mensaje informativo
  if (!session) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center py-12 border rounded-lg">
          <User className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h1 className="text-3xl font-bold mb-4">Mi perfil</h1>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Para ver y editar tu perfil, por favor inicia sesión o regístrate.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild>
              <Link href={`/${params.locale}/login?callbackUrl=/${params.locale}/profile`}>Iniciar sesión</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={`/${params.locale}/register`}>Registrarse</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const userProfile = await getUserProfile(session.user.id)

  return (
    <div className="container mx-auto py-8">
      <ProfileHeader user={userProfile} />

      <div className="mt-6">
        <ProfileTabs locale={params.locale} activeTab="info" />
      </div>

      <div className="mt-6">
        <ProfileInfo user={userProfile} locale={params.locale} />
      </div>
    </div>
  )
}

