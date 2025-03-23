"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ProfileTabsProps {
  locale: string
  activeTab: string
}

export default function ProfileTabs({ locale, activeTab }: ProfileTabsProps) {
  const pathname = usePathname()

  const tabs = [
    { id: "info", label: "Información personal", href: `/${locale}/profile` },
    { id: "security", label: "Seguridad", href: `/${locale}/profile/security` },
    { id: "payments", label: "Pagos", href: `/${locale}/profile/payments` },
    { id: "notifications", label: "Notificaciones", href: `/${locale}/profile/notifications` },
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

