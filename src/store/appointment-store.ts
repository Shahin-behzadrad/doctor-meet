import { create } from "zustand"

type Doctor = {
  id: string
  name: string
  specialty: string
  image?: string
}

type Appointment = {
  id: string
  doctorId: string
  userId: string
  date: string
  timeSlot: string
  notes?: string
  status: "upcoming" | "completed" | "cancelled"
  doctor: Doctor
}

type AppointmentInput = {
  doctorId: string
  userId: string
  date: string
  timeSlot: string
  notes?: string
}

type AppointmentState = {
  appointments: Appointment[]
  isLoading: boolean
  fetchAppointments: (status?: "upcoming" | "completed" | "cancelled") => Promise<void>
  createAppointment: (appointment: AppointmentInput) => Promise<string>
  cancelAppointment: (id: string) => Promise<void>
}

// Mock data for demo purposes
const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: "appointment-1",
    doctorId: "doctor-1",
    userId: "user-1",
    date: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    timeSlot: "10:00 AM",
    status: "upcoming",
    doctor: {
      id: "doctor-1",
      name: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      image: "/placeholder.svg?height=80&width=80",
    },
  },
  {
    id: "appointment-2",
    doctorId: "doctor-2",
    userId: "user-1",
    date: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
    timeSlot: "2:00 PM",
    notes: "Follow-up for skin condition",
    status: "upcoming",
    doctor: {
      id: "doctor-2",
      name: "Dr. Michael Chen",
      specialty: "Dermatologist",
      image: "/placeholder.svg?height=80&width=80",
    },
  },
  {
    id: "appointment-3",
    doctorId: "doctor-3",
    userId: "user-1",
    date: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    timeSlot: "11:00 AM",
    status: "completed",
    doctor: {
      id: "doctor-3",
      name: "Dr. Emily Rodriguez",
      specialty: "Pediatrician",
      image: "/placeholder.svg?height=80&width=80",
    },
  },
  {
    id: "appointment-4",
    doctorId: "doctor-4",
    userId: "user-1",
    date: new Date(Date.now() - 604800000).toISOString(), // 1 week ago
    timeSlot: "3:30 PM",
    status: "cancelled",
    doctor: {
      id: "doctor-4",
      name: "Dr. James Wilson",
      specialty: "Orthopedic",
      image: "/placeholder.svg?height=80&width=80",
    },
  },
]

export const useAppointmentStore = create<AppointmentState>((set, get) => ({
  appointments: [],
  isLoading: false,

  fetchAppointments: async (status) => {
    set({ isLoading: true })

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))

    // In a real app, you would fetch from your backend
    let appointments = [...MOCK_APPOINTMENTS]

    if (status) {
      appointments = appointments.filter((app) => app.status === status)
    }

    set({
      appointments,
      isLoading: false,
    })
  },

  createAppointment: async (appointmentInput) => {
    set({ isLoading: true })

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real app, you would create in your backend
    const newAppointment: Appointment = {
      id: `appointment-${Date.now()}`,
      ...appointmentInput,
      status: "upcoming",
      doctor: {
        id: appointmentInput.doctorId,
        name: "Dr. Sarah Johnson", // Mock data for demo
        specialty: "Cardiologist",
        image: "/placeholder.svg?height=80&width=80",
      },
    }

    set((state) => ({
      appointments: [...state.appointments, newAppointment],
      isLoading: false,
    }))

    return newAppointment.id
  },

  cancelAppointment: async (id) => {
    set({ isLoading: true })

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))

    // In a real app, you would update in your backend
    set((state) => ({
      appointments: state.appointments.map((app) => (app.id === id ? { ...app, status: "cancelled" } : app)),
      isLoading: false,
    }))
  },
}))
