import * as SecureStore from 'expo-secure-store';
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null
  login: (newToken: string) => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if there is a token in secure storage
    const checkToken = async () => {
      try {
        setIsLoading(true)
        const storedToken = await SecureStore.getItemAsync('authToken');
        setToken(storedToken)
      } catch (error) {
        console.error('Error loading token:', error);
      } finally {
        setIsLoading(false)
      }
    }
    checkToken()
  }, []);

  const isAuthenticated = !!token;

  const login = async (newToken: string) => {
    await SecureStore.setItemAsync('authToken', newToken);
    setToken(token)
  }

  const logout = async () => {
    await SecureStore.deleteItemAsync('authToken');
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout, isLoading }}>
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
