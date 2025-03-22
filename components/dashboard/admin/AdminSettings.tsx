"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"

export default function AdminSettings() {
  const { toast } = useToast()
  const [siteName, setSiteName] = useState("Fincos")
  const [siteDescription, setSiteDescription] = useState("Propiedades vacacionales premium")

  const handleSaveSettings = () => {
    // Simulate saving settings
    toast({
      title: "Configuración guardada",
      description: "La configuración del sitio ha sido guardada correctamente.",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configuración del sitio</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="siteName">Nombre del sitio</Label>
            <Input id="siteName" value={siteName} onChange={(e) => setSiteName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="siteDescription">Descripción del sitio</Label>
            <Input id="siteDescription" value={siteDescription} onChange={(e) => setSiteDescription(e.target.value)} />
          </div>
          <Button onClick={handleSaveSettings}>Guardar configuración</Button>
        </CardContent>
      </Card>
    </div>
  )
}

