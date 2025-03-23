"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface DashboardTabsProps {
  locale: string
  activeTab: string
}

export default function DashboardTabs({ locale, activeTab }: DashboardTabsProps) {
  const pathname = usePathname()

  const tabs = [
    { id: "overview", label: "Resumen", href: `/${locale}/dashboard` },
    { id: "properties", label: "Mis propiedades", href: `/${locale}/dashboard/properties` },
    { id: "reservations", label: "Reservas", href: `/${locale}/dashboard/reservations` },
    { id: "messages", label: "Mensajes", href: `/${locale}/dashboard/messages` },
    { id: "reviews", label: "Reseñas", href: `/${locale}/dashboard/reviews` },
  ]

  return (
    <Tabs defaultValue={activeTab} className="w-full">
      <TabsList className="w-full justify-start overflow-x-auto">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            className={cn("px-4 py-2", pathname === tab.href ? "bg-primary text-primary-foreground" : "")}
            asChild
          >
            <Link href={tab.href}>{tab.label}</Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

