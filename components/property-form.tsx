"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Home, MapPin, ImageIcon, DollarSign, Check, Info, Upload, ChevronRight, ChevronLeft } from "lucide-react"

export default function PropertyForm() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Estado para el formulario
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "house",
    location: "",
    address: "",
    bedrooms: 1,
    bathrooms: 1,
    guests: 1,
    price: 100,
    amenities: {
      wifi: false,
      pool: false,
      kitchen: false,
      ac: false,
      parking: false,
      tv: false,
      washer: false,
      petFriendly: false,
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    setFormData({
      ...formData,
      amenities: {
        ...formData.amenities,
        [amenity]: checked,
      },
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulación de envío de formulario
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Redireccionar a página de éxito (simulado)
    alert("¡Propiedad publicada con éxito!")
    router.push("/")

    setIsSubmitting(false)
  }

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4))
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  return (
    <div className="space-y-8">
      <Tabs value={`step-${currentStep}`} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="step-1" disabled>
            <Home className="h-4 w-4 mr-2" />
            Información
          </TabsTrigger>
          <TabsTrigger value="step-2" disabled>
            <MapPin className="h-4 w-4 mr-2" />
            Ubicación
          </TabsTrigger>
          <TabsTrigger value="step-3" disabled>
            <ImageIcon className="h-4 w-4 mr-2" />
            Fotos
          </TabsTrigger>
          <TabsTrigger value="step-4" disabled>
            <DollarSign className="h-4 w-4 mr-2" />
            Precio
          </TabsTrigger>
        </TabsList>

        <form onSubmit={handleSubmit}>
          <TabsContent value="step-1" className="pt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título de la propiedad</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Ej: Villa con vista al mar en Cartagena"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descripción</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Describe tu propiedad, destacando sus características principales..."
                      rows={5}
                      value={formData.description}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo de propiedad</Label>
                    <select
                      id="type"
                      name="type"
                      className="w-full p-2 border rounded-md"
                      value={formData.type}
                      onChange={handleChange}
                    >
                      <option value="house">Casa</option>
                      <option value="apartment">Apartamento</option>
                      <option value="villa">Villa</option>
                      <option value="cabin">Cabaña</option>
                      <option value="other">Otro</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bedrooms">Habitaciones</Label>
                      <Input
                        id="bedrooms"
                        name="bedrooms"
                        type="number"
                        min="1"
                        value={formData.bedrooms}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bathrooms">Baños</Label>
                      <Input
                        id="bathrooms"
                        name="bathrooms"
                        type="number"
                        min="1"
                        step="0.5"
                        value={formData.bathrooms}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="guests">Huéspedes</Label>
                      <Input
                        id="guests"
                        name="guests"
                        type="number"
                        min="1"
                        value={formData.guests}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Comodidades</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="wifi"
                          checked={formData.amenities.wifi}
                          onCheckedChange={(checked) => handleAmenityChange("wifi", checked)}
                        />
                        <Label htmlFor="wifi">WiFi</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="pool"
                          checked={formData.amenities.pool}
                          onCheckedChange={(checked) => handleAmenityChange("pool", checked)}
                        />
                        <Label htmlFor="pool">Piscina</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="kitchen"
                          checked={formData.amenities.kitchen}
                          onCheckedChange={(checked) => handleAmenityChange("kitchen", checked)}
                        />
                        <Label htmlFor="kitchen">Cocina completa</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="ac"
                          checked={formData.amenities.ac}
                          onCheckedChange={(checked) => handleAmenityChange("ac", checked)}
                        />
                        <Label htmlFor="ac">Aire acondicionado</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="parking"
                          checked={formData.amenities.parking}
                          onCheckedChange={(checked) => handleAmenityChange("parking", checked)}
                        />
                        <Label htmlFor="parking">Estacionamiento</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="tv"
                          checked={formData.amenities.tv}
                          onCheckedChange={(checked) => handleAmenityChange("tv", checked)}
                        />
                        <Label htmlFor="tv">TV</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="washer"
                          checked={formData.amenities.washer}
                          onCheckedChange={(checked) => handleAmenityChange("washer", checked)}
                        />
                        <Label htmlFor="washer">Lavadora</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="petFriendly"
                          checked={formData.amenities.petFriendly}
                          onCheckedChange={(checked) => handleAmenityChange("petFriendly", checked)}
                        />
                        <Label htmlFor="petFriendly">Acepta mascotas</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end mt-6">
              <Button type="button" onClick={nextStep}>
                Siguiente
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="step-2" className="pt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Ciudad o región</Label>
                    <Input
                      id="location"
                      name="location"
                      placeholder="Ej: Cartagena, Colombia"
                      value={formData.location}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Dirección completa</Label>
                    <Textarea
                      id="address"
                      name="address"
                      placeholder="Dirección exacta de la propiedad"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      <Info className="h-3 w-3 inline mr-1" />
                      Esta información solo se compartirá con los huéspedes después de confirmar la reserva.
                    </p>
                  </div>

                  <div className="h-[300px] bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-8 w-8 mx-auto text-muted-foreground" />
                      <p className="text-muted-foreground mt-2">Aquí se mostrará un mapa para ubicar tu propiedad</p>
                      <Button variant="outline" className="mt-4">
                        Ubicar en el mapa
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between mt-6">
              <Button type="button" variant="outline" onClick={prevStep}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Anterior
              </Button>
              <Button type="button" onClick={nextStep}>
                Siguiente
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="step-3" className="pt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>Fotos de la propiedad</Label>
                    <p className="text-sm text-muted-foreground">
                      Sube fotos de alta calidad de tu propiedad. Recomendamos incluir fotos de todas las habitaciones,
                      áreas comunes y exteriores.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div
                        key={index}
                        className="aspect-square bg-gray-100 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-300 hover:border-primary transition-colors cursor-pointer"
                      >
                        <Upload className="h-8 w-8 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mt-2">
                          {index === 0 ? "Foto principal" : `Foto ${index + 1}`}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-primary/10 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium">Consejos para mejores fotos</h4>
                        <ul className="text-sm text-muted-foreground mt-1 space-y-1 list-disc pl-4">
                          <li>Usa luz natural siempre que sea posible</li>
                          <li>Asegúrate de que los espacios estén limpios y ordenados</li>
                          <li>Incluye fotos de todas las habitaciones y áreas comunes</li>
                          <li>Destaca características únicas de tu propiedad</li>
                          <li>Las fotos deben tener al menos 1024x768 píxeles</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between mt-6">
              <Button type="button" variant="outline" onClick={prevStep}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Anterior
              </Button>
              <Button type="button" onClick={nextStep}>
                Siguiente
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="step-4" className="pt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="price">Precio por noche (USD)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        min="1"
                        className="pl-9"
                        value={formData.price}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="bg-primary/10 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium">Información sobre precios</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Establece un precio competitivo para tu propiedad. Puedes ajustar los precios según la
                          temporada y la demanda más adelante desde tu panel de control.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Resumen de tu propiedad</Label>
                    <div className="border rounded-lg p-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Título:</span>
                        <span className="font-medium">{formData.title || "No especificado"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tipo:</span>
                        <span className="font-medium">
                          {formData.type === "house"
                            ? "Casa"
                            : formData.type === "apartment"
                              ? "Apartamento"
                              : formData.type === "villa"
                                ? "Villa"
                                : formData.type === "cabin"
                                  ? "Cabaña"
                                  : "Otro"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Ubicación:</span>
                        <span className="font-medium">{formData.location || "No especificado"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Capacidad:</span>
                        <span className="font-medium">{formData.guests} huéspedes</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Habitaciones:</span>
                        <span className="font-medium">{formData.bedrooms}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Baños:</span>
                        <span className="font-medium">{formData.bathrooms}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Precio por noche:</span>
                        <span className="font-medium">${formData.price} USD</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between mt-6">
              <Button type="button" variant="outline" onClick={prevStep}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Anterior
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>Publicando propiedad...</>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Publicar propiedad
                  </>
                )}
              </Button>
            </div>
          </TabsContent>
        </form>
      </Tabs>
    </div>
  )
}

