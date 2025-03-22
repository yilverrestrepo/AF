"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Save, User, Shield, CreditCard, Bell } from "lucide-react"

// Datos de ejemplo para el perfil
const profile = {
  name: "Carlos Martínez",
  email: "carlos.martinez@example.com",
  phone: "+57 300 123 4567",
  bio: "Propietario de varias propiedades vacacionales en Colombia. Me encanta viajar y conocer nuevas culturas.",
  image: "/placeholder.svg?height=200&width=200",
  joined: "Abril 2019",
  verified: {
    email: true,
    phone: true,
    id: true,
  },
}

export default function DashboardProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState(profile)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData({
      ...profileData,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí se implementaría la lógica para guardar los cambios
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList>
          <TabsTrigger value="personal">
            <User className="h-4 w-4 mr-2" />
            Información personal
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4 mr-2" />
            Seguridad
          </TabsTrigger>
          <TabsTrigger value="payment">
            <CreditCard className="h-4 w-4 mr-2" />
            Pagos
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notificaciones
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Información personal</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3 flex flex-col items-center gap-4">
                    <div className="relative h-40 w-40 rounded-full overflow-hidden">
                      <Image
                        src={profileData.image || "/placeholder.svg"}
                        alt={profileData.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <Button variant="outline" type="button">
                      <Upload className="h-4 w-4 mr-2" />
                      Cambiar foto
                    </Button>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Miembro desde {profileData.joined}</p>
                      <div className="flex gap-2 justify-center mt-2">
                        {profileData.verified.email && (
                          <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            Email verificado
                          </div>
                        )}
                        {profileData.verified.phone && (
                          <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            Teléfono verificado
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="md:w-2/3 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nombre completo</Label>
                        <Input
                          id="name"
                          name="name"
                          value={profileData.name}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={profileData.email}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Biografía</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        rows={4}
                        value={profileData.bio}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="flex justify-end gap-2">
                      {isEditing ? (
                        <>
                          <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                            Cancelar
                          </Button>
                          <Button type="submit">
                            <Save className="h-4 w-4 mr-2" />
                            Guardar cambios
                          </Button>
                        </>
                      ) : (
                        <Button type="button" onClick={() => setIsEditing(true)}>
                          Editar perfil
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Seguridad</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-medium">Cambiar contraseña</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Contraseña actual</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">Nueva contraseña</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirmar contraseña</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                    <Button>Actualizar contraseña</Button>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t">
                  <h3 className="font-medium">Verificación de identidad</h3>
                  <p className="text-sm text-muted-foreground">
                    Verifica tu identidad para aumentar la confianza de los huéspedes y propietarios.
                  </p>
                  <div className="space-y-2 mt-4">
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Documento de identidad</p>
                        <p className="text-sm text-muted-foreground">
                          {profileData.verified.id ? "Verificado" : "No verificado"}
                        </p>
                      </div>
                      <Button variant="outline">{profileData.verified.id ? "Ver documento" : "Verificar"}</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Métodos de pago</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Administra tus métodos de pago y configura tus preferencias de cobro.
                </p>

                <div className="space-y-2">
                  <h3 className="font-medium">Tarjetas guardadas</h3>
                  <div className="border rounded-lg divide-y">
                    <div className="p-4 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-16 bg-gray-100 rounded flex items-center justify-center">
                          <span className="font-medium">Visa</span>
                        </div>
                        <div>
                          <p className="font-medium">•••• •••• •••• 1234</p>
                          <p className="text-xs text-muted-foreground">Expira: 05/25</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Editar
                        </Button>
                        <Button variant="outline" size="sm">
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Button className="mt-2">Agregar método de pago</Button>
                </div>

                <div className="space-y-2 pt-4 border-t">
                  <h3 className="font-medium">Información de facturación</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="billing-name">Nombre</Label>
                      <Input id="billing-name" defaultValue={profileData.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="billing-address">Dirección</Label>
                      <Textarea id="billing-address" placeholder="Ingresa tu dirección de facturación" />
                    </div>
                    <Button>Guardar información</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Preferencias de notificaciones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Configura cómo y cuándo quieres recibir notificaciones.</p>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Nuevas reservas</p>
                      <p className="text-sm text-muted-foreground">
                        Recibe notificaciones cuando alguien reserve una de tus propiedades.
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="email-reservations" defaultChecked />
                        <Label htmlFor="email-reservations">Email</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="sms-reservations" defaultChecked />
                        <Label htmlFor="sms-reservations">SMS</Label>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Mensajes</p>
                      <p className="text-sm text-muted-foreground">
                        Recibe notificaciones cuando alguien te envíe un mensaje.
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="email-messages" defaultChecked />
                        <Label htmlFor="email-messages">Email</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="sms-messages" defaultChecked />
                        <Label htmlFor="sms-messages">SMS</Label>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Actualizaciones de la plataforma</p>
                      <p className="text-sm text-muted-foreground">
                        Recibe notificaciones sobre nuevas funcionalidades y mejoras.
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="email-updates" defaultChecked />
                        <Label htmlFor="email-updates">Email</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="sms-updates" />
                        <Label htmlFor="sms-updates">SMS</Label>
                      </div>
                    </div>
                  </div>
                </div>

                <Button className="mt-4">Guardar preferencias</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

