import PropertyForm from "@/components/property-form"

export default function ListPropertyPage() {
  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Publica tu propiedad</h1>
          <p className="text-muted-foreground">
            Completa el formulario a continuación para publicar tu propiedad en Fincos
          </p>
        </div>

        <PropertyForm />
      </div>
    </div>
  )
}

