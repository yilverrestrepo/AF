import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import AnalyticsDashboard from "@/components/dashboard/AnalyticsDashboard"

export default async function AnalyticsPage() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    redirect("/login")
  }

  // Verificar si el usuario es anfitrión
  if (session.user.role !== "HOST") {
    redirect("/dashboard")
  }

  return (
    <div className="container mx-auto py-8">
      <AnalyticsDashboard />
    </div>
  )
}

