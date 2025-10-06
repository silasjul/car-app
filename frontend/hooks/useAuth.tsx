import axios, { isAxiosError } from 'axios';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null
  saveToken: (newToken: string) => Promise<void>
  deleteToken: () => Promise<void>
  validateToken: () => Promise<void>
  isLoading: boolean
}

interface CheckTokenResponse {
  isValid: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter();

  useEffect(() => {
    // Check if there is a token in secure storage
    const checkToken = async () => {
      try {
        setIsLoading(true)
        const storedToken = await SecureStore.getItemAsync('authToken');
        if (storedToken) {
          setToken(storedToken)
          console.log("Found stored token")
        } else console.log("No stored token found")
      } catch (error) {
        console.error('Error loading token:', error);
      } finally {
        setIsLoading(false)
      }
    }
    checkToken()
  }, []);

  const saveToken = async (newToken: string) => {
    await SecureStore.setItemAsync('authToken', newToken);
    setToken(newToken)
    console.log("saved token")
  }

  const deleteToken = useCallback(async () => {
    await SecureStore.deleteItemAsync('authToken');
    console.log("deleting token")
    setToken(null)

    // Redirect to welcome page
    router.replace('/welcome')
  }, [router])

  const validateToken = useCallback(async () => {
    console.log("Validating token")
    try {
      const response = await axios.post<CheckTokenResponse>(
        `http://192.168.1.105:3000/auth/check-token`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      const { isValid } = response.data

      if (!isValid) {
        console.log("Tokenvalidation: Invalid token")
        setIsAuthenticated(false)
        deleteToken()
      } else {
        console.log("Tokenvalidation: Valid token")
        setIsAuthenticated(true)
      }

    } catch (err) {
      if (isAxiosError(err)) {
        if (err.response) {
          console.error(new Error(err.response.data.error || 'Token validation failed'))
          setIsAuthenticated(false)
          deleteToken()
        } else {
          console.error(new Error('Network error'))
        }
      } else if (err instanceof Error) {
        console.error(err)
      } else {
        console.error(new Error("An unknown error occurred during token validation."))
      }
    }
  }, [token, deleteToken])

  useEffect(() => {
    if (token) validateToken()
  }, [token, validateToken]);

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, saveToken, deleteToken, validateToken, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
