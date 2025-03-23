import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getUserFavorites } from "@/lib/favorites"
import FavoritesList from "@/components/favorites/FavoritesList"

export default async function FavoritesPage({ params }: { params: { locale: string } }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect(`/${params.locale}/login?callbackUrl=/${params.locale}/favorites`)
  }

  const favorites = await getUserFavorites(session.user.id)

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Mis favoritos</h1>

      <FavoritesList favorites={favorites} locale={params.locale} />
    </div>
  )
}

