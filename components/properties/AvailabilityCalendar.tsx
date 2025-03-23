"use client"

import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { useSession } from "next-auth/react"

interface AvailabilityCalendarProps {
  propertyId: string
  isOwner: boolean
}

export default function AvailabilityCalendar({ propertyId, isOwner }: AvailabilityCalendarProps) {
  const { data: session } = useSession()
  const [blockedDates, setBlockedDates] = useState<Date[]>([])
  const [selectedDates, setSelectedDates] = useState<Date[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchBlockedDates = async () => {
      try {
        const response = await fetch(`/api/properties/${propertyId}/availability`)
        const data = await response.json()

        // Convert string dates to Date objects
        setBlockedDates(data.blockedDates.map((dateStr: string) => new Date(dateStr)))
      } catch (error) {
        console.error("Error fetching blocked dates:", error)
        toast({
          title: "Error",
          description: "No se pudieron cargar las fechas bloqueadas",
          variant: "destructive",
        })
      }
    }

    fetchBlockedDates()
  }, [propertyId])

  const handleDateSelect = (date: Date | undefined) => {
    if (!date || !isOwner) return

    setSelectedDates((prev) => {
      const dateExists = prev.some((d) => d.toDateString() === date.toDateString())

      if (dateExists) {
        return prev.filter((d) => d.toDateString() !== date.toDateString())
      } else {
        return [...prev, date]
      }
    })
  }

  const handleSaveChanges = async () => {
    if (!isOwner || !session) return

    setIsLoading(true)

    try {
      const response = await fetch(`/api/properties/${propertyId}/availability`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dates: selectedDates.map((date) => date.toISOString()),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update availability")
      }

      // Update the blocked dates with the selected dates
      setBlockedDates(selectedDates)
      setSelectedDates([])

      toast({
        title: "Éxito",
        description: "Disponibilidad actualizada correctamente",
      })
    } catch (error) {
      console.error("Error updating availability:", error)
      toast({
        title: "Error",
        description: "No se pudo actualizar la disponibilidad",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const isDateBlocked = (date: Date) => {
    return blockedDates.some((blockedDate) => blockedDate.toDateString() === date.toDateString())
  }

  const isDateSelected = (date: Date) => {
    return selectedDates.some((selectedDate) => selectedDate.toDateString() === date.toDateString())
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Calendario de disponibilidad</h3>

      <div className="border rounded-lg p-4">
        <Calendar
          mode="multiple"
          selected={isOwner ? selectedDates : []}
          onSelect={isOwner ? handleDateSelect : undefined}
          disabled={[{ before: new Date() }, ...(isOwner ? [] : blockedDates.map((date) => ({ date })))]}
          modifiers={{
            blocked: blockedDates,
            selected: selectedDates,
          }}
          modifiersStyles={{
            blocked: { backgroundColor: "#FEE2E2", color: "#EF4444", opacity: 0.8 },
            selected: { backgroundColor: "#DBEAFE", color: "#3B82F6" },
          }}
          className="rounded-md border"
        />

        <div className="mt-4 flex items-center justify-between text-sm">
          <div className="flex items-center">
            <div className="h-4 w-4 rounded-full bg-red-100 border border-red-400 mr-2"></div>
            <span>Fechas no disponibles</span>
          </div>

          {isOwner && (
            <div className="flex items-center">
              <div className="h-4 w-4 rounded-full bg-blue-100 border border-blue-400 mr-2"></div>
              <span>Fechas seleccionadas</span>
            </div>
          )}
        </div>
      </div>

      {isOwner && (
        <div className="flex justify-end">
          <Button onClick={handleSaveChanges} disabled={isLoading || selectedDates.length === 0}>
            {isLoading ? "Guardando..." : "Guardar cambios"}
          </Button>
        </div>
      )}
    </div>
  )
}

