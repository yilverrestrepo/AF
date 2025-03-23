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
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function ListingForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [createdListingId, setCreatedListingId] = useState<number | null>(null)

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

    try {
      // Simulación de envío de formulario
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simular una respuesta con un ID
      const mockResponse = { id: Math.floor(Math.random() * 1000) + 1 }
      setCreatedListingId(mockResponse.id)

      // Mostrar diálogo de éxito
      setShowSuccessDialog(true)
    } catch (error) {
      console.error("Error al crear la propiedad:", error)
      toast({
        title: "Error al publicar la propiedad",
        description: "Ha ocurrido un error al publicar tu propiedad. Por favor, intenta de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleViewListing = () => {
    router.push(`/listings/${createdListingId}`)
  }

  const handleGoToDashboard = () => {
    router.push("/dashboard/host")
  }

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4))
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  return (
    <>
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
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Título de la propiedad</Label>
                      <Input
                        id="title"
                        name="title"
                        placeholder="Ej: Villa con vista al mar en Cartagena"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="h-12"
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
                        className="w-full p-3 border rounded-lg h-12"
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
                          className="h-12"
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
                          className="h-12"
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
                          className="h-12"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label>Comodidades</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <Label htmlFor="wifi" className="cursor-pointer">
                            WiFi
                          </Label>
                          <Switch
                            id="wifi"
                            checked={formData.amenities.wifi}
                            onCheckedChange={(checked) => handleAmenityChange("wifi", checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <Label htmlFor="pool" className="cursor-pointer">
                            Piscina
                          </Label>
                          <Switch
                            id="pool"
                            checked={formData.amenities.pool}
                            onCheckedChange={(checked) => handleAmenityChange("pool", checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <Label htmlFor="kitchen" className="cursor-pointer">
                            Cocina completa
                          </Label>
                          <Switch
                            id="kitchen"
                            checked={formData.amenities.kitchen}
                            onCheckedChange={(checked) => handleAmenityChange("kitchen", checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <Label htmlFor="ac" className="cursor-pointer">
                            Aire acondicionado
                          </Label>
                          <Switch
                            id="ac"
                            checked={formData.amenities.ac}
                            onCheckedChange={(checked) => handleAmenityChange("ac", checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <Label htmlFor="parking" className="cursor-pointer">
                            Estacionamiento
                          </Label>
                          <Switch
                            id="parking"
                            checked={formData.amenities.parking}
                            onCheckedChange={(checked) => handleAmenityChange("parking", checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <Label htmlFor="tv" className="cursor-pointer">
                            TV
                          </Label>
                          <Switch
                            id="tv"
                            checked={formData.amenities.tv}
                            onCheckedChange={(checked) => handleAmenityChange("tv", checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <Label htmlFor="washer" className="cursor-pointer">
                            Lavadora
                          </Label>
                          <Switch
                            id="washer"
                            checked={formData.amenities.washer}
                            onCheckedChange={(checked) => handleAmenityChange("washer", checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <Label htmlFor="petFriendly" className="cursor-pointer">
                            Acepta mascotas
                          </Label>
                          <Switch
                            id="petFriendly"
                            checked={formData.amenities.petFriendly}
                            onCheckedChange={(checked) => handleAmenityChange("petFriendly", checked)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end mt-6">
                <Button type="button" onClick={nextStep} className="rounded-full px-8">
                  Siguiente
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="step-2" className="pt-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="location">Ciudad o región</Label>
                      <Input
                        id="location"
                        name="location"
                        placeholder="Ej: Cartagena, Colombia"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        className="h-12"
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
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Info className="h-3 w-3" />
                        Esta información solo se compartirá con los huéspedes después de confirmar la reserva.
                      </p>
                    </div>

                    <div className="h-[300px] bg-accent rounded-lg flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=800')] bg-cover opacity-30"></div>
                      <div className="text-center relative z-10">
                        <MapPin className="h-12 w-12 mx-auto text-primary mb-4" />
                        <p className="text-muted-foreground mb-4">Aquí se mostrará un mapa para ubicar tu propiedad</p>
                        <Button variant="outline" className="rounded-full">
                          Ubicar en el mapa
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between mt-6">
                <Button type="button" variant="outline" onClick={prevStep} className="rounded-full px-8">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Anterior
                </Button>
                <Button type="button" onClick={nextStep} className="rounded-full px-8">
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
                        Sube fotos de alta calidad de tu propiedad. Recomendamos incluir fotos de todas las
                        habitaciones, áreas comunes y exteriores.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {Array.from({ length: 6 }).map((_, index) => (
                        <div
                          key={index}
                          className="aspect-square bg-accent rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-primary/20 hover:border-primary transition-colors cursor-pointer"
                        >
                          <Upload className="h-10 w-10 text-primary/50 group-hover:text-primary" />
                          <p className="text-sm text-muted-foreground mt-2">
                            {index === 0 ? "Foto principal" : `Foto ${index + 1}`}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="bg-accent p-4 rounded-lg">
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
                <Button type="button" variant="outline" onClick={prevStep} className="rounded-full px-8">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Anterior
                </Button>
                <Button type="button" onClick={nextStep} className="rounded-full px-8">
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
                        <DollarSign className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-primary" />
                        <Input
                          id="price"
                          name="price"
                          type="number"
                          min="1"
                          className="pl-10 h-12 text-lg font-medium"
                          value={formData.price}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="bg-accent p-4 rounded-lg">
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
                <Button type="button" variant="outline" onClick={prevStep} className="rounded-full px-8">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Anterior
                </Button>
                <Button type="submit" disabled={isSubmitting} className="rounded-full px-8">
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Publicando propiedad...
                    </>
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

      {/* Diálogo de éxito */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">¡Propiedad publicada con éxito!</DialogTitle>
            <DialogDescription className="text-center">
              Tu propiedad ha sido publicada y ya está disponible para reservas.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-6">
            <div className="bg-green-100 rounded-full p-4">
              <Check className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" className="flex-1" onClick={handleGoToDashboard}>
              Ir al panel de control
            </Button>
            <Button className="flex-1" onClick={handleViewListing}>
              Ver mi propiedad
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

