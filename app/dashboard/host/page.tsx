import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import HostProperties from "@/components/dashboard/host/HostProperties"
import HostReservations from "@/components/dashboard/host/HostReservations"
import HostMessages from "@/components/dashboard/host/HostMessages"
import HostCalendar from "@/components/dashboard/host/HostCalendar"
import HostAnalytics from "@/components/dashboard/host/HostAnalytics"
import HostProfile from "@/components/dashboard/host/HostProfile"
import HostHeader from "@/components/dashboard/host/HostHeader"

export default function HostDashboardPage() {
  return (
    <div className="container px-4 md:px-6 py-8">
      <HostHeader />

      <Tabs defaultValue="properties" className="space-y-6 mt-8">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="properties">Propiedades</TabsTrigger>
          <TabsTrigger value="reservations">Reservas</TabsTrigger>
          <TabsTrigger value="calendar">Calendario</TabsTrigger>
          <TabsTrigger value="messages">Mensajes</TabsTrigger>
          <TabsTrigger value="analytics">Analíticas</TabsTrigger>
          <TabsTrigger value="profile">Perfil</TabsTrigger>
        </TabsList>

        <TabsContent value="properties">
          <HostProperties />
        </TabsContent>

        <TabsContent value="reservations">
          <HostReservations />
        </TabsContent>

        <TabsContent value="calendar">
          <HostCalendar />
        </TabsContent>

        <TabsContent value="messages">
          <HostMessages />
        </TabsContent>

        <TabsContent value="analytics">
          <HostAnalytics />
        </TabsContent>

        <TabsContent value="profile">
          <HostProfile />
        </TabsContent>
      </Tabs>
    </div>
  )
}

