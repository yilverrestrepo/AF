import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AdminHeader from "@/components/dashboard/admin/AdminHeader"
import AdminUsers from "@/components/dashboard/admin/AdminUsers"
import AdminProperties from "@/components/dashboard/admin/AdminProperties"
import AdminReservations from "@/components/dashboard/admin/AdminReservations"
import AdminAnalytics from "@/components/dashboard/admin/AdminAnalytics"
import AdminSettings from "@/components/dashboard/admin/AdminSettings"

export default function AdminPage() {
  return (
    <div className="container px-4 md:px-6 py-8">
      <AdminHeader />

      <Tabs defaultValue="users" className="space-y-6 mt-8">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="users">Usuarios</TabsTrigger>
          <TabsTrigger value="properties">Propiedades</TabsTrigger>
          <TabsTrigger value="reservations">Reservas</TabsTrigger>
          <TabsTrigger value="analytics">Analíticas</TabsTrigger>
          <TabsTrigger value="settings">Configuración</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <AdminUsers />
        </TabsContent>

        <TabsContent value="properties">
          <AdminProperties />
        </TabsContent>

        <TabsContent value="reservations">
          <AdminReservations />
        </TabsContent>

        <TabsContent value="analytics">
          <AdminAnalytics />
        </TabsContent>

        <TabsContent value="settings">
          <AdminSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}

