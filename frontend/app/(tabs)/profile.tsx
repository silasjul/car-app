import { useAuth } from '@/hooks/useAuth'
import useUser from '@/hooks/useUser'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function Profile() {
  const { deleteToken } = useAuth()
  const { user, isLoading, error } = useUser();

  const handleLogout = () => {
    deleteToken()
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Text style={styles.label}>First Name:</Text>
        <Text style={styles.value}>{user?.firstName}</Text>

        <Text style={styles.label}>Last Name:</Text>
        <Text style={styles.value}>{user?.lastName}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user?.email}</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  profileContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    fontFamily: 'Medium',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    fontFamily: 'Book',
    marginBottom: 20,
    paddingLeft: 10,
  },
  logoutButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
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