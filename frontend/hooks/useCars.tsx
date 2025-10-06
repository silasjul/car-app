import { CarDetailsData, CreateCarData } from "@/types/car"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios, { isAxiosError } from "axios"
import { useEffect, useState } from "react"
import { useAuth } from "./useAuth"
import useUser from "./useUser"

export default function useCars() {
  const { token } = useAuth()
  const { user } = useUser()
  const [cars, setCars] = useState<CarDetailsData[]>([])
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadCars = async () => {
      setLoading(true)
      setError(null)

      // check asyncstorage
      try {
        const cachedCars = await AsyncStorage.getItem('cachedCars')
        if (cachedCars) {
          setCars(JSON.parse(cachedCars))
        }
      } catch (storageErr) {
        console.error('Error loading cached cars:', storageErr)
      }

      // fetch from backend
      const fetchCars = async () => {
        try {
          const response = await axios.get('http://192.168.1.105:3000/cars', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          // set and store in asyncstorage
          setCars(response.data)
          await AsyncStorage.setItem('cachedCars', JSON.stringify(response.data))
        } catch (err) {
          if (isAxiosError(err)) {
            if (err.response) {
              console.error(new Error(err.response.data.error || 'Failed to fetch cars'))
              setError(err.response.data.error || 'Failed to fetch cars')
            } else {
              console.error(new Error('Network error'))
              setError('Network error')
            }
          } else if (err instanceof Error) {
            console.error(err)
            setError(err.message)
          } else {
            console.error(new Error("An unknown error occurred while fetching cars."))
            setError("An unknown error occurred while fetching cars.")
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

    loadCars()
  }, [token])

  const addCar = async (carData: CreateCarData) => {
    if (!user) {
      throw new Error('User not authenticated')
    }
    try {
      const carToSend = {
        ...carData,
        userId: user.id,
        availableFrom: new Date(carData.availableFrom),
        availableTo: new Date(carData.availableTo)
      }
      const response = await axios.post('http://192.168.1.105:3000/cars', carToSend, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      // Add to local state
      setCars(prev => prev ? [...prev, response.data] : [response.data])
      // Update AsyncStorage
      const updatedCars = cars ? [...cars, response.data] : [response.data]
      await AsyncStorage.setItem('cachedCars', JSON.stringify(updatedCars))
    } catch (err) {
      if (isAxiosError(err)) {
        if (err.response) {
          throw new Error(err.response.data.error || 'Failed to add car')
        } else {
          throw new Error('Network error')
        }
      } else if (err instanceof Error) {
        throw err
      } else {
        throw new Error("An unknown error occurred while adding car.")
      }
    }
  }

  return { cars, isLoading, error, addCar }
}