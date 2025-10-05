import { CarPreviewData } from '@/types/car'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

interface CarPreviewProps {
  carData: CarPreviewData
}

export default function CarPreviewCard({ carData }: CarPreviewProps) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: carData.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{carData.name}</Text>
        <Text style={styles.location}>{carData.location}</Text>
        <Text style={styles.price}>${carData.price}/day</Text>
        <Text style={styles.availability}>
          Available: {carData.availableFrom} - {carData.availableTo}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    margin: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
  },
  details: {
    padding: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 5,
  },
  availability: {
    fontSize: 12,
    color: '#888',
  },
})
