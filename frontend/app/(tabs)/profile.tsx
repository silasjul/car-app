import { useAuth } from '@/hooks/useAuth'
import useUser from '@/hooks/useUser'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Profile() {
  const { deleteToken } = useAuth()
  const { user, isLoading, error } = useUser();

  const handleLogout = () => {
    deleteToken()
  }

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    )
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <Text style={styles.label}>First Name</Text>
        <View style={styles.valueContainer}>
          <Text style={styles.value}>{user?.firstName}</Text>
        </View>

        <Text style={styles.label}>Last Name</Text>
        <View style={styles.valueContainer}>
          <Text style={styles.value}>{user?.lastName}</Text>
        </View>

        <Text style={styles.label}>Email</Text>
        <View style={styles.valueContainer}>
          <Text style={styles.value}>{user?.email}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
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
    marginBottom: 14,
  },
  valueContainer: {
    backgroundColor: 'rgba(0,0,0, 0.1)',
    fontFamily: 'Thin',
    fontSize: 16,
    padding: 14,
    borderRadius: 8,
    marginBottom: 20,
  },
  profileContainer: {
    flex: 1,
  },
  label: {
    fontSize: 18,
    fontFamily: 'Medium',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    fontFamily: 'Thin',
  },
  logoutButton: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 9999,
    alignItems: 'center',
    marginBottom: 20,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Medium',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    fontFamily: 'Book',
    textAlign: 'center',
  },
})