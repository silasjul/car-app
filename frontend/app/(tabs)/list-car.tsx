import DatePicker from '@/components/DatePicker';
import useCars from '@/hooks/useCars';
import useMyCars from '@/hooks/useMyCars';
import useUser from '@/hooks/useUser';
import { CreateCarData } from '@/types/car';
import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ListCar() {
  const { user } = useUser()
  const { addCar } = useCars();
  const { myCars } = useMyCars()
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')
  const [year, setYear] = useState('')
  const [price, setPrice] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [features, setFeatures] = useState('')
  const [mileage, setMileage] = useState('')
  const [fuelType, setFuelType] = useState('')
  const [transmission, setTransmission] = useState('')
  const [availableFrom, setAvailableFrom] = useState<Date | null>(null)
  const [availableTo, setAvailableTo] = useState<Date | null>(null)

  const [image, setImage] = useState<string>('')

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission required", "Camera roll permisions is required for uploading images.")
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsMultipleSelection: false,
      quality: 0.7

    })

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      Alert.alert("Success", "Image has been uploaded!")
    }
  }

  const handleSubmit = () => {
    if (!user?.id) {
      Alert.alert("Error", "User not authenticated");
      return;
    }
    if (!brand || !model || !year || !price || !location || !description || !availableFrom || !availableTo || !features || !mileage || !fuelType || !transmission || !image) {
      Alert.alert("Error", "Please fill out all fields");
      return;
    }

    const carData: CreateCarData = {
      name: `${year} ${brand} ${model}`,
      location: location,
      price: parseFloat(price),
      image: image,
      availableFrom: availableFrom!.toISOString(),
      availableTo: availableTo!.toISOString(),
      description: description,
      features: features.split(',').map(f => f.trim()).filter(f => f.length > 0),
      mileage: parseInt(mileage),
      fuelType: fuelType,
      transmission: transmission,
    }
    addCar(carData);
    
    //Resetting fields after submission
    setBrand('')
    setModel('')
    setYear('')
    setPrice('')
    setLocation('')
    setDescription('')
    setFeatures('')
    setMileage('')
    setFuelType('')
    setTransmission('')
    setAvailableFrom(null)
    setAvailableTo(null)
    setImage('')

    Alert.alert("Car has been listed", `Your ${year} ${brand} in ${location} has now been listed for $${price} per day`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>List Car page </Text>
        <Text style={styles.subtitle}>Fill in your car details</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.label}> Car brand</Text>
          <TextInput
            placeholder="e.g. Hyundai, BMW, Audi"
            value={brand}
            onChangeText={setBrand}
            style={styles.input}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Car model</Text>
          <TextInput
            placeholder="e.g. Civic, X5, RS7"
            value={model}
            onChangeText={setModel}
            style={styles.input}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Year</Text>
          <TextInput
            placeholder="e.g 2023,2024,2025"
            value={year}
            onChangeText={setYear}
            keyboardType={"numeric"}
            maxLength={4}
            style={styles.input}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Daily price $ </Text>
          <TextInput
            placeholder="eg. 45$, 99$,999$"
            value={price}
            onChangeText={setPrice}
            keyboardType={"numeric"}
            style={styles.input}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Location of the car </Text>
          <TextInput
            placeholder="eg. Odense, Aarhus, Copenhagen"
            value={location}
            onChangeText={setLocation}
            style={styles.input}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            placeholder="e.g. Well maintained car with low mileage"
            value={description}
            onChangeText={setDescription}
            style={styles.input}
            placeholderTextColor="#9CA3AF"
            multiline
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Features (comma separated)</Text>
          <TextInput
            placeholder="e.g. Air conditioning, Sunroof, GPS, Bluetooth"
            value={features}
            onChangeText={setFeatures}
            style={styles.input}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Mileage</Text>
          <TextInput
            placeholder="e.g. 50000"
            value={mileage}
            onChangeText={setMileage}
            keyboardType="numeric"
            style={styles.input}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Fuel Type</Text>
          <TextInput
            placeholder="e.g. Gasoline, Diesel, Electric"
            value={fuelType}
            onChangeText={setFuelType}
            style={styles.input}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Transmission</Text>
          <TextInput
            placeholder="e.g. Manual, Automatic"
            value={transmission}
            onChangeText={setTransmission}
            style={styles.input}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Available From</Text>
          <DatePicker
            buttonText="Select start date"
            buttonStyle={styles.input}
            time={availableFrom}
            setTime={setAvailableFrom}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Available To</Text>
          <DatePicker
            buttonText="Select end date"
            buttonStyle={styles.input}
            time={availableTo}
            setTime={setAvailableTo}
          />
        </View>

        <View style={styles.submitSection}>
          <TouchableOpacity
            style={styles.uploadButton}
            activeOpacity={0.7}
            onPress={pickImage} >
            <Text style={styles.uploadText}>
              Upload image of the car {image ? '(1 selected)' : ''}
            </Text>
          </TouchableOpacity>

          {image && (
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: image }}
                style={styles.image} />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => setImage('')} >
                <Text style={styles.removeText}>x</Text>
              </TouchableOpacity>
            </View>
          )}


          <TouchableOpacity
            onPress={handleSubmit}
            style={styles.submitButton}
            activeOpacity={0.8}
          >
            <Text style={styles.submitText}>List my car</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listedSection}>
          <Text style={styles.listedTitle}> Your listed cars ({myCars?.length || 0})</Text>

          {!myCars || myCars.length === 0 ? (
            <Text style={styles.noCarsText}>No cars has been listed yet.</Text>
          ) : (
            myCars.map((car) => (
              <View key={car.id} style={styles.carCard}>

                {car.image ? (
                  <View style={styles.imageSection}>
                    <Image
                      source={{ uri: car.image }}
                      style={styles.carImage}
                    />
                  </View>
                ) : (
                  <View style={styles.noImagePlaceholder}>
                    <Text style={styles.noImageText}>No image</Text>
                  </View>
                )}

                <Text style={styles.carTitle}>{car.name}</Text>
                <Text style={styles.carLocation}>Location: {car.location}</Text>
                <Text style={styles.carPrice}>${car.price}/day</Text>
                <Text style={styles.carMileage}>Mileage: {car.mileage} km</Text>
                <Text style={styles.carFuelType}>Fuel: {car.fuelType}</Text>
                <Text style={styles.carTransmission}>Transmission: {car.transmission}</Text>
                <Text style={styles.carFeatures}>Features: {car.features.join(', ')}</Text>
                <Text style={styles.carAvailable}>Available: {new Date(car.availableFrom).toLocaleDateString()} - {new Date(car.availableTo).toLocaleDateString()}</Text>
              </View>
            ))
          )}
        </View>


      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    paddingTop: 64,
    paddingBottom: 24,
    paddingHorizontal: 24,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#4b5563',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
  },
  section: {
    marginTop: 24,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 18,
  },
  uploadButton: {
    backgroundColor: '#e5e7eb',
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderStyle: 'dashed',
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 16,
  },
  uploadText: {
    textAlign: 'center',
    color: '#374151',
    fontSize: 18,
    fontWeight: '500',
  },
  imageScroll: {
    marginBottom: 16,
  },
  imageRow: {
    flexDirection: 'row',
  },
  imageContainer: {
    position: 'relative',
    marginHorizontal: 4,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  removeButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#ef4444',
    borderRadius: 50,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeText: {
    color: '#ffffff',
    fontSize: 12,
  },
  submitSection: {
    marginTop: 32,
    marginBottom: 32,
  },
  submitButton: {
    backgroundColor: '#000',
    borderRadius: 12,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  submitText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
  },
  listedSection: {
    marginTop: 32,
  },
  listedTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  noCarsText: {
    color: '#6b7280',
    textAlign: 'center',
    paddingVertical: 32,
  },
  carCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  imageSection: {
    marginBottom: 12,
  },
  carImage: {
    width: '100%',
    height: 160,
    borderRadius: 8,
    marginBottom: 8,
  },
  imageCount: {
    color: '#3b82f6',
    fontSize: 14,
  },
  noImagePlaceholder: {
    backgroundColor: '#f3f4f6',
    width: '100%',
    height: 160,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noImageText: {
    color: '#9ca3af',
  },
  carTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  carLocation: {
    color: '#4b5563',
  },
  carPrice: {
    color: '#16a34a',
    fontWeight: '600',
  },
  carListedAt: {
    color: '#9ca3af',
    fontSize: 14,
  },
  carMileage: {
    color: '#4b5563',
  },
  carFuelType: {
    color: '#4b5563',
  },
  carTransmission: {
    color: '#4b5563',
  },
  carFeatures: {
    color: '#4b5563',
  },
  carAvailable: {
    color: '#4b5563',
  },
  removeListingButton: {
    backgroundColor: '#fee2e2',
    borderRadius: 8,
    paddingVertical: 8,
    marginTop: 12,
  },
  removeListingText: {
    color: '#dc2626',
    textAlign: 'center',
    fontWeight: '500',
  },
});