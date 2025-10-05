import CarPreviewCard from '@/components/CarPreviewCard';
import { cars } from '@/mocks/cars';
import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';


export default function SearchResults() {
  const params = useLocalSearchParams();
  const { location, startTime, endTime } = params;

  return (
    <View style={styles.container}>
      <View style={styles.paramsContainer}>
        <View style={styles.paramItem}>
          <Text style={styles.paramText}><Text style={styles.labelText}>Location: </Text>{location}</Text>
        </View>
        <View style={styles.paramItem}>
          <Text style={styles.paramText}><Text style={styles.labelText}>From: </Text>{startTime}</Text>
        </View>
        <View style={styles.paramItem}>
          <Text style={styles.paramText}><Text style={styles.labelText}>To: </Text>{endTime}</Text>
        </View>
      </View>
      <ScrollView style={styles.resultsContainer}>
        <Stack.Screen options={{ title: 'Search Results' }} />
        {cars.map((car, idx) => (
          <CarPreviewCard key={idx} carData={car} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  paramsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    gap: 8,
  },
  paramItem: {
    backgroundColor: 'white',
    borderRadius: 9999,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  paramText: {
    fontSize: 16,
    color: '#333',
  },
  labelText: {
    fontWeight: 'bold',
  },
  resultsContainer: {
    flex: 1,
  },
  carItem: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 60,
    borderRadius: 5,
  },
  details: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 14,
    color: 'gray',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
});