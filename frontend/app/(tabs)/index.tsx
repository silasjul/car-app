import DatePicker from '@/components/DatePicker';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Search() {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);

  const handleSearch = () => {
    router.push({
      pathname: '/search-results',
      params: {
        location,
        startTime: startTime?.toLocaleDateString(),
        endTime: endTime?.toLocaleDateString(),
      },
    })
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.title}>GoRent</Text>
        <Text style={styles.subtitle}>Find the perfect car for your next adventure</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Ionicons name="location-outline" size={28} color='rgba(0, 0, 0, 0.8)' style={styles.icon} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your location (city, airport)"
            value={location}
            onChangeText={setLocation}
          />
        </View>
        <View style={styles.datePickerContainer}>
          <DatePicker buttonText="Start date" buttonStyle={styles.datePickerButton} time={startTime} setTime={setStartTime} />
          <DatePicker buttonText="End date" buttonStyle={styles.datePickerButton} time={endTime} setTime={setEndTime} />
        </View>
        <TouchableOpacity style={[styles.searchButton, (location.trim() === '' || startTime === null || endTime === null) && { opacity: 0.5 }]} disabled={location.trim() === '' || startTime === null || endTime === null} onPress={handleSearch}>
          <Text style={styles.searchText}>Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    paddingTop: 160,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    opacity: .9
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 5,
    opacity: .65,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: '80%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 20,
  },
  icon: {
    marginRight: 4,
  },
  textInput: {
    flex: 1,
    fontWeight: 500,
    fontSize: 16,
  },
  datePickerContainer: {
    flexDirection: 'row',
    gap: 10,
    width: '80%',
    height: 50,
    marginTop: 10,
  },
  datePickerButton: {
    flex: 1,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  searchButton: {
    width: '80%',
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, .9)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  searchText: {
    color: 'white',
    fontWeight: 500,
    fontSize: 16,
  },
});
