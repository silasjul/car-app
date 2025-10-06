import { CarDetailsData } from "@/types/car"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios, { isAxiosError } from "axios"
import { useEffect, useState } from "react"
import { useAuth } from "./useAuth"

export default function useMyCars() {
  const { token } = useAuth()
  const [myCars, setMyCars] = useState<CarDetailsData[] | null>(null)
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadMyCars = async () => {
      setLoading(true)
      setError(null)

      // check asyncstorage
      try {
        const cachedMyCars = await AsyncStorage.getItem('cachedMyCars')
        if (cachedMyCars) {
          setMyCars(JSON.parse(cachedMyCars))
        }
      } catch (storageErr) {
        console.error('Error loading cached cars:', storageErr)
      }

      // fetch from backend
      const fetchCars = async () => {
        try {
          const response = await axios.get('http://192.168.1.105:3000/my-cars', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          // set and store in asyncstorage
          setMyCars(response.data)
          await AsyncStorage.setItem('cachedMyCars', JSON.stringify(response.data))
        } catch (err) {
          if (isAxiosError(err)) {
            if (err.response) {
              console.error(new Error(err.response.data.error || 'Failed to fetch user cars'))
              setError(err.response.data.error || 'Failed to fetch user cars')
            } else {
              console.error(new Error('Network error'))
              setError('Network error')
            }
          } else if (err instanceof Error) {
            console.error(err)
            setError(err.message)
          } else {
            console.error(new Error("An unknown error occurred while fetching user cars."))
            setError("An unknown error occurred while fetching user cars.")
          }
        } finally {
          setLoading(false)
        }
      }

      if (token) {
        fetchCars()
      } else {
        setLoading(false)
      }
    }

    loadMyCars()
  }, [token])

  return { myCars, isLoading, error }
}