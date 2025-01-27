"use client"

import { createContext, useState, useEffect } from "react"
import { setItem, getItem, removeItem } from "../utils/local-storage"

interface User {
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  login: (user: User) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = getItem("user")
    if (storedUser) {
      setUser(storedUser)
    }
  }, [])

  const login = (userData: User) => {
    setUser(userData)
    setItem("user", userData)
  }

  const logout = () => {
    setUser(null)
    removeItem("user")
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

