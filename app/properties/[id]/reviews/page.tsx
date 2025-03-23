import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import ReviewsList from "@/components/reviews/ReviewsList"
import ReviewForm from "@/components/reviews/ReviewForm"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default async function PropertyReviewsPage({
  params,
}: {
  params: { id: string }
}) {
  const propertyId = params.id
  const session = await getServerSession(authOptions)

  // Obtener la propiedad
  const property = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
    select: {
      id: true,
      title: true,
      ownerId: true,
    },
  })

  if (!property) {
    notFound()
  }

  // Obtener las reseñas
  const reviews = await prisma.review.findMany({
    where: {
      propertyId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  // Calcular la valoración media
  const averageRating =
    reviews.length > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0

  // Verificar si el usuario actual puede dejar una reseña
  let canReview = false
  let hasReviewed = false

  if (session?.user) {
    // El propietario no puede dejar reseñas a su propia propiedad
    if (property.ownerId !== session.user.id) {
      // Verificar si el usuario ha completado una reserva
      const completedReservation = await prisma.reservation.findFirst({
        where: {
          propertyId,
          guestId: session.user.id,
          status: "COMPLETED",
        },
      })

      canReview = !!completedReservation

      // Verificar si el usuario ya ha dejado una reseña
      const existingReview = await prisma.review.findFirst({
        where: {
          propertyId,
          userId: session.user.id,
        },
      })

      hasReviewed = !!existingReview
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Link href={`/properties/${propertyId}`} className="flex items-center text-primary hover:underline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a la propiedad
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
      <h2 className="text-2xl font-semibold mb-6">Reseñas y valoraciones</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ReviewsList reviews={reviews} averageRating={averageRating} />
        </div>

        <div className="lg:col-span-1">
          {session?.user ? (
            canReview && !hasReviewed ? (
              <div className="bg-gray-50 p-6 rounded-lg">
                <ReviewForm propertyId={propertyId} />
              </div>
            ) : hasReviewed ? (
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-600">Ya has dejado una reseña para esta propiedad.</p>
              </div>
            ) : (
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-600">
                  Solo los huéspedes que han completado una estancia pueden dejar reseñas.
                </p>
              </div>
            )
          ) : (
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600 mb-4">Inicia sesión para dejar una reseña.</p>
              <Button asChild>
                <Link href="/login">Iniciar sesión</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

