import { User } from "@/types/user"
import axios, { isAxiosError } from "axios"
import { useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useAuth } from "./useAuth"

export default function useUser() {
  const { token } = useAuth()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true)
      setError(null)

      // Tjek asyncstorage
      try {
        const cachedUser = await AsyncStorage.getItem('cachedUser')
        if (cachedUser) {
          setUser(JSON.parse(cachedUser))
        }
      } catch (storageErr) {
        console.error('Error loading cached user:', storageErr)
      }

      // fetch from backend
      const fetchUser = async () => {
        try {
          const response = await axios.get('http://192.168.1.105:3000/users/me', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          // set data and add to asyncstorage
          setUser(response.data)
          await AsyncStorage.setItem('cachedUser', JSON.stringify(response.data))
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
      } else {
        setLoading(false)
      }
    }
    loadUser()
  }, [token])

  return { user, isLoading, error }
}