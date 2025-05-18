import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import FeaturedDoctors from "@/components/featured-doctors"
import { CalendarClock, Video, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Virtual Healthcare for You</h1>
            <p className="text-lg text-muted-foreground">
              Book appointments with top doctors for video consultations from the comfort of your home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link href="/doctors">Find Doctors</Link>
              </Button>
              <Button variant="outline" size="lg">
                <Link href="/how-it-works">How It Works</Link>
              </Button>
            </div>
          </div>
          <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 opacity-20 rounded-lg"></div>
            <img
              src="/placeholder.svg?height=400&width=600"
              alt="Doctor with patient in video call"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="mb-4 flex justify-center">
                <Users className="h-12 w-12 text-teal-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Find Doctors</h3>
              <p className="text-muted-foreground">Browse through our network of qualified healthcare professionals.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="mb-4 flex justify-center">
                <CalendarClock className="h-12 w-12 text-teal-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Book Appointment</h3>
              <p className="text-muted-foreground">
                Select a convenient time slot from the doctor's available schedule.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="mb-4 flex justify-center">
                <Video className="h-12 w-12 text-teal-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Video Consultation</h3>
              <p className="text-muted-foreground">Connect with your doctor through our secure video platform.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Doctors */}
      <section className="py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Doctors</h2>
          <Button variant="outline" asChild>
            <Link href="/doctors">View All</Link>
          </Button>
        </div>
        <FeaturedDoctors />
      </section>
    </div>
  )
}
