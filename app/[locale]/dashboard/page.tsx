import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import DashboardTabs from "@/components/dashboard/DashboardTabs"
import DashboardOverview from "@/components/dashboard/DashboardOverview"

export default async function DashboardPage({ params }: { params: { locale: string } }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect(`/${params.locale}/login?callbackUrl=/${params.locale}/dashboard`)
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

