import ListingForm from "@/components/listings/ListingForm"

export default function CreateListingPage() {
  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Publica tu propiedad</h1>
          <p className="text-muted-foreground">
            Completa el formulario a continuación para publicar tu propiedad en Fincos
          </p>
        </div>

        <ListingForm />
      </div>
    </div>
  )
}

