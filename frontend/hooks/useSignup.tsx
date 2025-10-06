import axios, { isAxiosError } from 'axios'
import * as SecureStore from 'expo-secure-store'
import { useState } from 'react'

interface SignupData {
  firstName: string
  lastName: string
  email: string
  password: string
}

interface SignupResponse {
  token: string
}

export function useSignup() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const signup = async (signupData: SignupData) => {
    setIsLoading(true)
    setError(null)

    try {
      // Create account
      const response = await axios.post<SignupResponse>(
        'http://192.168.1.105:3000/auth/signup',
        signupData
      )

      // Save token
      const { token } = response.data
      await SecureStore.setItemAsync('authToken', token)

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
    signup,
    isLoading,
    error
  }
}
