<<<<<<< HEAD
import { redirect } from "next/navigation"

export default function RootPage() {
  // Redirigir a la página con el locale por defecto
  redirect("/es")
=======
import Hero from "@/components/home/Hero"
import FeaturedListings from "@/components/home/FeaturedListings"
import HowItWorks from "@/components/home/HowItWorks"
import Testimonials from "@/components/home/Testimonials"
import CallToAction from "@/components/home/CallToAction"
import SearchBar from "@/components/search/SearchBar"
import PopularDestinations from "@/components/home/PopularDestinations"
import ExperiencesSection from "@/components/home/ExperiencesSection"
import TrustBadges from "@/components/home/TrustBadges"
import BecomeHostSection from "@/components/home/BecomeHostSection"
import AppDownload from "@/components/home/AppDownload"
import ReviewsSlider from "@/components/home/ReviewsSlider"

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <div className="container px-4 md:px-6 relative z-10">
        <SearchBar className="-mt-24 mb-16" />
        <TrustBadges />
        <PopularDestinations />
        <FeaturedListings />
        <BecomeHostSection />
        <ExperiencesSection />
        <HowItWorks />
        <Testimonials />
        <ReviewsSlider />
        <AppDownload />
        <CallToAction />
      </div>
    </div>
  )
>>>>>>> 07b70d897bbbb8dcc81ecc896f83a8f93e9c7d15
}

