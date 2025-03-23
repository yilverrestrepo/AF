"use client"

import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { notFound } from "next/navigation"
import PropertyDetails from "@/components/properties/PropertyDetails"
import { getProperty } from "@/lib/data"
import Price from "@/components/Price"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "@radix-ui/react-icons"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useState } from "react"
import ContactHost from "@/components/properties/ContactHost"

interface Params {
  id: string
}

interface SearchParams {
  startDate?: string
  endDate?: string
}

const PropertyDetailsPage = async ({ params, searchParams }: { params: Params; searchParams: SearchParams }) => {
  const property = await getProperty(params.id)

  if (!property) {
    notFound()
  }

  const session = await getServerSession(authOptions)

  const startDateString = searchParams?.startDate
  const endDateString = searchParams?.endDate

  const [date, setDate] = useState<Date | undefined>(() => {
    if (startDateString && endDateString) {
      return new Date(startDateString)
    }
    return undefined
  })

  return (
    <div>
      <div className="relative w-full h-[300px]">
        <Image
          src={property.image || "/placeholder.svg"}
          alt={property.title}
          fill
          style={{ objectFit: "cover" }}
          className="rounded-md"
        />
      </div>
      <div className="mt-4">
        <PropertyDetails property={property} />
      </div>
      <div className="flex items-center justify-between mt-4">
        <Price price={property.price} />
        {session?.user?.id === property.ownerId ? (
          <Link href={`/properties/${property.id}/edit`}>
            <Button>Edit</Button>
          </Link>
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn("w-[280px] justify-start text-left font-normal", !date && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="center" side="bottom">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        )}
      </div>

      {/* Si el usuario no es el propietario, mostrar el botón de contacto */}
      {session?.user && session.user.id !== property.ownerId && (
        <div className="mt-4">
          <ContactHost hostId={property.ownerId} propertyId={property.id} propertyTitle={property.title} />
        </div>
      )}
    </div>
  )
}

export default PropertyDetailsPage

