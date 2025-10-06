import { useLogin } from '@/hooks/useLogin'
import { Stack } from 'expo-router'
import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { z } from 'zod'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const { login, isLoading, error } = useLogin()

  const loginSchema = z.object({
    email: z.string(),
    password: z.string(),
  })

  const handleSubmit = async () => {
    const formData = {
      email,
      password
    }

    const result = loginSchema.safeParse(formData)

    if (!result.success) {
      const errorMessages: { [key: string]: string } = {}
      result.error.errors.forEach((error) => {
        if (error.path.length > 0) {
          errorMessages[error.path[0] as string] = error.message
        }
      })
      setErrors(errorMessages)
    } else {
      setErrors({})
      // Login the user
      await login(result.data)
    }
  }

  return (
    <>
      <Stack.Screen options={{ headerStyle: { backgroundColor: 'black' }, headerTintColor: 'white', headerTitle: '' }} />
      <View style={styles.container}>
        <Text style={styles.signupText}>LOGIN</Text>
        <Text style={styles.subtitleText}>Welcome back!</Text>
        <View style={styles.inputContainer}>
          <View>
            <TextInput
              style={styles.input}
              placeholder='Email'
              placeholderTextColor='rgba(255,255,255,0.4)'
              value={email}
              onChangeText={setEmail}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          </View>
          <View>
            <TextInput
              style={styles.input}
              placeholder='Password'
              secureTextEntry
              placeholderTextColor='rgba(255,255,255,0.4)'
              value={password}
              onChangeText={setPassword}
            />
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
          </View>
        </View>
        {error && <Text style={styles.apiErrorText}>{error.message}</Text>}
        <TouchableOpacity
          style={[styles.submitBtn, isLoading && styles.submitBtnDisabled]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          <Text style={styles.submitText}>
            {isLoading ? 'Signing in...' : 'Login'}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
  },
  signupText: {
    letterSpacing: 1.5,
    fontSize: 12,
    color: 'gray',
    fontFamily: 'Thin',
    marginBottom: 2,
  },
  subtitleText: {
    fontSize: 24,
    color: 'white',
    marginBottom: 14,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'column',
    gap: 12
  },
  input: {
    backgroundColor: 'rgba(255,255,255, 0.1)',
    fontFamily: 'Thin',
    fontSize: 16,
    color: 'white',
    height: 60,
    padding: 10,
    borderRadius: 8,
  },
  submitBtn: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    paddingVertical: 18,
    borderRadius: 9999,
  },
  submitBtnDisabled: {
    opacity: 0.6,
  },
  submitText: {
    textAlign: 'center',
    fontFamily: 'Book',
    fontSize: 18,
    color: 'black'
  },
  errorText: {
    color: 'red',
    fontFamily: 'Book',
    fontSize: 12,
    marginTop: 4,
  },
  apiErrorText: {
    color: 'red',
    fontFamily: 'Book',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  }
})
