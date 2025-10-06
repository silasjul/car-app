import axios, { isAxiosError } from 'axios'
import * as SecureStore from 'expo-secure-store'
import { useState } from 'react'
import { useAuth } from './useAuth'

interface LoginData {
  email: string
  password: string
}

interface LoginResponse {
  token: string
}

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const { saveToken } = useAuth()

  const login = async (signupData: LoginData) => {
    setIsLoading(true)
    setError(null)

    try {
      // Login user
      const response = await axios.post<LoginResponse>(
        `http://192.168.1.105:3000/auth/login`,
        signupData
      )

      // Save token
      const { token } = response.data
      console.log("Login request succesfull")
      saveToken(token)

    } catch (err) {
      if (isAxiosError(err)) {
        if (err.response) {
          setError(new Error(err.response.data.error || 'Signup failed'))
        } else {
          setError(new Error('Network error'))
        }
      } else if (err instanceof Error) {
        setError(err)
      } else {
        setError(new Error("An unknown error occurred during signup."))
      }
    } finally {
      setIsLoading(false)
    }
  }

  return {
    login,
    isLoading,
    error
  }
}
