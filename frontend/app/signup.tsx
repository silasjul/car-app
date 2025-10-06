import { Stack, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { z } from 'zod'
import { useSignup } from '../hooks/useSignup'

export default function Signup() {
  const router = useRouter()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const { signup, isLoading, error } = useSignup()

  const signupSchema = z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    repeatPassword: z.string()
  }).refine((data) => data.password === data.repeatPassword, {
    message: "Passwords don't match",
    path: ["repeatPassword"]
  })

  const handleSubmit = async () => {
    const formData = {
      firstName,
      lastName,
      email,
      password,
      repeatPassword
    }

    const result = signupSchema.safeParse(formData)

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
      // Sign up the user
      const { repeatPassword, ...signupData } = result.data
      await signup(signupData)
      console.log('Signup successful!')
      router.push('/(tabs)')
    }
  }

  return (
    <>
      <Stack.Screen options={{ headerStyle: { backgroundColor: 'black' }, headerTintColor: 'white', headerTitle: '' }} />
      <View style={styles.container}>
        <Text style={styles.signupText}>SIGN UP</Text>
        <Text style={styles.subtitleText}>Who are you?</Text>
        <View style={styles.inputContainer}>
          <View>
            <TextInput
              style={styles.input}
              placeholder='First name'
              placeholderTextColor='rgba(255,255,255,0.4)'
              value={firstName}
              onChangeText={setFirstName}
            />
            {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}
          </View>
          <View style={{ marginBottom: 20 }}>
            <TextInput
              style={styles.input}
              placeholder='Last name'
              placeholderTextColor='rgba(255,255,255,0.4)'
              value={lastName}
              onChangeText={setLastName}
            />
            {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}
          </View>
          <View>
            <Text style={styles.subtitleText}>Security</Text>
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
          <View>
            <TextInput
              style={styles.input}
              placeholder='Repeat password'
              secureTextEntry
              placeholderTextColor='rgba(255,255,255,0.4)'
              value={repeatPassword}
              onChangeText={setRepeatPassword}
            />
            {errors.repeatPassword && <Text style={styles.errorText}>{errors.repeatPassword}</Text>}
          </View>
        </View>
        {error && <Text style={styles.apiErrorText}>{error.message}</Text>}
        <TouchableOpacity
          style={[styles.submitBtn, isLoading && styles.submitBtnDisabled]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          <Text style={styles.submitText}>
            {isLoading ? 'Creating account...' : 'Create account'}
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
