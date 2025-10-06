import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CarDetails() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { carData } = params;

  const carDataStr = Array.isArray(carData) ? carData[0] : carData;
  const car = JSON.parse(carDataStr);

  if (!car) {
    return (
      <View style={styles.container}>
        <Text>Car not found</Text>
      </View>
    );
  }

  const handleBook = () => {
    Alert.alert('Booking Confirmed', `You have booked ${car.name}`, [
      { text: 'OK', onPress: () => router.push('/(tabs)') }
    ]);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: car.name }} />
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        <Image source={{ uri: car.image }} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.name}>{car.name}</Text>
          <Text style={styles.location}>{car.location}</Text>
          <Text style={styles.price}>${car.price}/day</Text>
          <Text style={styles.availability}>
            Available: {car.availableFrom} - {car.availableTo}
          </Text>
          <Text style={styles.subtitle}>Description:</Text>
          <Text style={styles.description}>{car.description}</Text>
          <Text style={styles.specs}>Mileage: {car.mileage} km</Text>
          <Text style={styles.specs}>Fuel Type: {car.fuelType}</Text>
          <Text style={styles.specs}>Transmission: {car.transmission}</Text>
          <Text style={styles.subtitle}>Features:</Text>
          {car.features.map((feature: string, index: number) => (
            <Text key={index} style={styles.feature}>• {feature}</Text>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.bookButton} onPress={handleBook}>
        <Text style={styles.bookText}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100, // space for fixed button
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
  },
  details: {
    marginTop: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  location: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 10,
  },
  availability: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  specs: {
    fontSize: 16,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  feature: {
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 2,
  },
  bookButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  bookText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});