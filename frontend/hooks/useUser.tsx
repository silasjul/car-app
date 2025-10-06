import { User } from "@/types/user"
import axios, { isAxiosError } from "axios"
import { useEffect, useState } from "react"
import { useAuth } from "./useAuth"

export default function useUser() {
  const { token } = useAuth()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://192.168.1.105:3000/users/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setUser(response.data)
      } catch (err) {
        if (isAxiosError(err)) {
          if (err.response) {
            console.error(new Error(err.response.data.error || 'Failed to fetch user'))
            setError(err.response.data.error || 'Failed to fetch user')
          } else {
            console.error(new Error('Network error'))
            setError('Network error')
          }
        } else if (err instanceof Error) {
          console.error(err)
          setError(err.message)
        } else {
          console.error(new Error("An unknown error occurred while fetching user."))
          setError("An unknown error occurred while fetching user.")
        }
      } finally {
        setLoading(false)
      }
    }

    if (token) {
      fetchUser()
    }
  }, [token])

  return { user, isLoading, error }
}