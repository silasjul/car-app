import { Stack, useRouter } from 'expo-router'
import React from 'react'
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function Welcome() {
  const router = useRouter()

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ImageBackground source={require('@/assets/images/welcome-bg.jpg')} style={styles.background} resizeMode="cover">
        <View style={styles.container}>
          <Image source={require('@/assets/images/logo-white.png')} style={styles.logo} />
          <Text style={styles.title}>Rent a car anywhere in the world</Text>
          <Text style={styles.subtitle}>Where would you go if you could go anywhere?</Text>
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.signupBtn} onPress={() => router.push('/signup')}>
              <Text style={styles.signupText}>Sign up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn} onPress={() => router.push('/login')}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  logo: {
    width: 40,
    height: 40,
    position: 'absolute',
    top: "10%",
    opacity: 0.4
  },
  title: {
    fontSize: 50,
    paddingHorizontal: 20,
    fontFamily: 'Medium',
    textAlign: 'center',
    marginBottom: 20,
    color: 'white',
  },
  subtitle: {
    fontSize: 20,
    fontFamily: 'Book',
    textAlign: 'center',
    paddingHorizontal: 30,
    lineHeight: 25,
    opacity: 0.8,
    color: 'white',
  },
  btnContainer: {
    flexDirection: 'row',
    position: "absolute",
    bottom: 40,
    width: '80%',
    gap: 8,
  },
  loginBtn: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,1)',
    paddingVertical: 18,
    borderRadius: 9999,
  },
  loginText: {
    textAlign: 'center',
    fontFamily: 'Book',
    fontSize: 18,
  },
  signupBtn: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,.2)',
    paddingVertical: 18,
    borderRadius: 9999,
  },
  signupText: {
    textAlign: 'center',
    fontFamily: 'Book',
    fontSize: 18,
    color: 'white'
  },
})
