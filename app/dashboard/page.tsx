import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardProperties from "@/components/dashboard-properties"
import DashboardReservations from "@/components/dashboard-reservations"
import DashboardMessages from "@/components/dashboard-messages"
import DashboardProfile from "@/components/dashboard-profile"

export default function DashboardPage() {
  return (
    <div className="container px-4 md:px-6 py-6">
      <h1 className="text-3xl font-bold mb-6">Panel de control</h1>

      <Tabs defaultValue="properties" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="properties">Propiedades</TabsTrigger>
          <TabsTrigger value="reservations">Reservas</TabsTrigger>
          <TabsTrigger value="messages">Mensajes</TabsTrigger>
          <TabsTrigger value="profile">Perfil</TabsTrigger>
        </TabsList>

        <TabsContent value="properties">
          <DashboardProperties />
        </TabsContent>

        <TabsContent value="reservations">
          <DashboardReservations />
        </TabsContent>

        <TabsContent value="messages">
          <DashboardMessages />
        </TabsContent>

        <TabsContent value="profile">
          <DashboardProfile />
        </TabsContent>
      </Tabs>
    </div>
  )
}

