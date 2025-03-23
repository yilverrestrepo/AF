import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import DashboardTabs from "@/components/dashboard/DashboardTabs"
import { Button } from "@/components/ui/button"
import { getUserProperties } from "@/lib/properties"
import PropertyTable from "@/components/dashboard/PropertyTable"
import { Plus } from "lucide-react"

export default async function DashboardPropertiesPage({ params }: { params: { locale: string } }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect(`/${params.locale}/login?callbackUrl=/${params.locale}/dashboard/properties`)
  }

  const properties = await getUserProperties(session.user.id)

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Mis propiedades</h1>
        <Button asChild>
          <Link href={`/${params.locale}/properties/new`} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nueva propiedad
          </Link>
        </Button>
      </div>

      <DashboardTabs locale={params.locale} activeTab="properties" />

      <div className="mt-6">
        <PropertyTable properties={properties} locale={params.locale} />
      </div>
    </div>
  )
}

