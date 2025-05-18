import { create } from "zustand"

type Doctor = {
  id: string
  name: string
  specialty: string
  image?: string
  rating: number
  reviewCount: number
  nextAvailable: string
  tags: string[]
  bio?: string
  experience: number
  location: string
  fee: number
}

type DoctorFilters = {
  search?: string
  specialties?: string[]
  availabilities?: string[]
  minPrice?: number
  maxPrice?: number
  minExperience?: number
  maxExperience?: number
}

type DoctorsState = {
  doctors: Doctor[]
  filters: DoctorFilters
  updateFilters: (filters: DoctorFilters) => void
  fetchDoctors: (filters: DoctorFilters) => Promise<void>
  fetchFeaturedDoctors: () => Promise<void>
}

// Mock data for demo purposes
const MOCK_DOCTORS: Doctor[] = [
  {
    id: "doctor-1",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    image: "/placeholder.svg?height=120&width=120",
    rating: 4.9,
    reviewCount: 120,
    nextAvailable: "Today, 2:00 PM",
    tags: ["Heart Disease", "Hypertension", "Cardiac Surgery", "ECG"],
    bio: "Dr. Sarah Johnson is a board-certified cardiologist with over 10 years of experience in treating various heart conditions.",
    experience: 10,
    location: "New York, NY",
    fee: 150,
  },
  {
    id: "doctor-2",
    name: "Dr. Michael Chen",
    specialty: "Dermatologist",
    image: "/placeholder.svg?height=120&width=120",
    rating: 4.8,
    reviewCount: 95,
    nextAvailable: "Tomorrow, 10:00 AM",
    tags: ["Acne", "Eczema", "Skin Cancer", "Cosmetic Dermatology"],
    bio: "Dr. Michael Chen specializes in medical and cosmetic dermatology, with particular expertise in treating skin cancer and inflammatory skin conditions.",
    experience: 8,
    location: "San Francisco, CA",
    fee: 180,
  },
  {
    id: "doctor-3",
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrician",
    image: "/placeholder.svg?height=120&width=120",
    rating: 4.9,
    reviewCount: 150,
    nextAvailable: "Today, 4:00 PM",
    tags: ["Child Development", "Vaccinations", "Newborn Care", "Adolescent Medicine"],
    bio: "Dr. Emily Rodriguez is a compassionate pediatrician dedicated to providing comprehensive care for children from birth through adolescence.",
    experience: 12,
    location: "Chicago, IL",
    fee: 120,
  },
  {
    id: "doctor-4",
    name: "Dr. James Wilson",
    specialty: "Orthopedic",
    image: "/placeholder.svg?height=120&width=120",
    rating: 4.7,
    reviewCount: 88,
    nextAvailable: "Friday, 1:00 PM",
    tags: ["Sports Medicine", "Joint Replacement", "Fracture Care", "Spine"],
    bio: "Dr. James Wilson is an orthopedic surgeon specializing in sports medicine and minimally invasive joint replacement procedures.",
    experience: 15,
    location: "Boston, MA",
    fee: 200,
  },
  {
    id: "doctor-5",
    name: "Dr. Aisha Patel",
    specialty: "Psychiatrist",
    image: "/placeholder.svg?height=120&width=120",
    rating: 4.8,
    reviewCount: 110,
    nextAvailable: "Monday, 11:00 AM",
    tags: ["Anxiety", "Depression", "ADHD", "Therapy"],
    bio: "Dr. Aisha Patel specializes in treating mood disorders, anxiety, and ADHD with a holistic approach combining medication management and therapy.",
    experience: 9,
    location: "Seattle, WA",
    fee: 170,
  },
]

export const useDoctorsStore = create<DoctorsState>((set) => ({
  doctors: [],
  filters: {
    search: "",
    specialties: [],
    availabilities: [],
    minPrice: 0,
    maxPrice: 300,
    minExperience: 0,
    maxExperience: 30,
  },

  updateFilters: (filters) => {
    set({ filters })
  },

  fetchDoctors: async (filters) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    // In a real app, you would fetch from your backend with filters
    // For demo, we'll filter the mock data client-side
    let filteredDoctors = [...MOCK_DOCTORS]

    if (filters.search) {
      const search = filters.search.toLowerCase()
      filteredDoctors = filteredDoctors.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(search) ||
          doctor.specialty.toLowerCase().includes(search) ||
          doctor.tags.some((tag) => tag.toLowerCase().includes(search)),
      )
    }

    if (filters.specialties && filters.specialties.length > 0) {
      filteredDoctors = filteredDoctors.filter((doctor) => filters.specialties?.includes(doctor.specialty))
    }

    if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
      filteredDoctors = filteredDoctors.filter(
        (doctor) => doctor.fee >= filters.minPrice! && doctor.fee <= filters.maxPrice!,
      )
    }

    if (filters.minExperience !== undefined && filters.maxExperience !== undefined) {
      filteredDoctors = filteredDoctors.filter(
        (doctor) => doctor.experience >= filters.minExperience! && doctor.experience <= filters.maxExperience!,
      )
    }

    set({ doctors: filteredDoctors })
  },

  fetchFeaturedDoctors: async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))

    // In a real app, you would fetch featured doctors from your backend
    // For demo, we'll just use the first 3 doctors
    set({ doctors: MOCK_DOCTORS.slice(0, 3) })
  },
}))
