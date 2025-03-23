"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Check } from "lucide-react"
import { toast } from "@/hooks/use-toast"

const plans = [
  {
    id: "basic",
    name: "Básico",
    description: "Perfecto para empezar",
    priceMonthly: 0,
    priceYearly: 0,
    features: ["Hasta 3 propiedades", "Calendario básico", "Soporte por email"],
  },
  {
    id: "pro",
    name: "Profesional",
    description: "Para anfitriones activos",
    priceMonthly: 19.99,
    priceYearly: 199.99,
    features: [
      "Hasta 10 propiedades",
      "Calendario avanzado",
      "Estadísticas básicas",
      "Soporte prioritario",
      "Sin comisiones adicionales",
    ],
    popular: true,
  },
  {
    id: "business",
    name: "Empresarial",
    description: "Para gestores profesionales",
    priceMonthly: 49.99,
    priceYearly: 499.99,
    features: [
      "Propiedades ilimitadas",
      "Calendario avanzado",
      "Estadísticas completas",
      "Soporte 24/7",
      "Sin comisiones adicionales",
      "API para integración",
      "Usuarios múltiples",
    ],
  },
]

export default function PricingPlans() {
  const { data: session } = useSession()
  const router = useRouter()
  const [billingInterval, setBillingInterval] = useState<"monthly" | "yearly">("monthly")

  const handleSubscribe = async (planId: string) => {
    if (!session) {
      toast({
        title: "Inicia sesión primero",
        description: "Necesitas iniciar sesión para suscribirte a un plan",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    try {
      const response = await fetch("/api/subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planId,
          interval: billingInterval,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Error al crear la suscripción")
      }

      // Redirigir a la página de checkout de Stripe
      router.push(data.url)
    } catch (error) {
      console.error("Error subscribing to plan:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al procesar la suscripción",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">Planes de suscripción</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Elige el plan que mejor se adapte a tus necesidades como anfitrión
        </p>

        <div className="flex items-center justify-center mt-6">
          <span className={`mr-2 ${billingInterval === "monthly" ? "font-medium" : "text-gray-500"}`}>Mensual</span>
          <Switch
            checked={billingInterval === "yearly"}
            onCheckedChange={(checked) => setBillingInterval(checked ? "yearly" : "monthly")}
          />
          <span className={`ml-2 ${billingInterval === "yearly" ? "font-medium" : "text-gray-500"}`}>
            Anual <span className="text-green-600 text-sm">(2 meses gratis)</span>
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {plans.map((plan) => (
          <Card key={plan.id} className={`flex flex-col ${plan.popular ? "border-primary shadow-lg relative" : ""}`}>
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg rounded-tr-lg">
                Popular
              </div>
            )}

            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>

            <CardContent className="flex-1">
              <div className="mb-6">
                <span className="text-3xl font-bold">
                  €{billingInterval === "monthly" ? plan.priceMonthly : plan.priceYearly}
                </span>
                <span className="text-gray-500">/{billingInterval === "monthly" ? "mes" : "año"}</span>
              </div>

              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter>
              <Button
                onClick={() => handleSubscribe(plan.id)}
                className="w-full"
                variant={plan.popular ? "default" : "outline"}
              >
                {plan.id === "basic" ? "Comenzar gratis" : "Suscribirse"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

