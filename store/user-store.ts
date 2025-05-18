import { create } from "zustand"

type User = {
  id: string
  name: string
  email: string
  image?: string
}

type UserState = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

// Mock user data for demo purposes
const MOCK_USER: User = {
  id: "user-1",
  name: "John Doe",
  email: "john@example.com",
  image: "/placeholder.svg?height=40&width=40",
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true })

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real app, you would validate credentials with your backend
    set({
      user: MOCK_USER,
      isAuthenticated: true,
      isLoading: false,
    })
  },

  signup: async (name: string, email: string, password: string) => {
    set({ isLoading: true })

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real app, you would create a new user in your backend
    set({
      user: { ...MOCK_USER, name, email },
      isAuthenticated: true,
      isLoading: false,
    })
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
    })
  },
}))
