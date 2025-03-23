import GuestHeader from "@/components/dashboard/guest/GuestHeader"
import GuestTrips from "@/components/dashboard/guest/GuestTrips"
import GuestWishlist from "@/components/dashboard/guest/GuestWishlist"
import GuestReviews from "@/components/dashboard/guest/GuestReviews"

export default function GuestDashboardPage() {
  return (
    <div className="container px-4 md:px-6 py-8">
      <GuestHeader />
      <div className="mt-8 space-y-6">
        <GuestTrips />
        <GuestWishlist />
        <GuestReviews />
      </div>
    </div>
  )
}

