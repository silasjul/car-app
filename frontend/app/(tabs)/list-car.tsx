
import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";
import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ListCar() {
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')
  const [year, setYear] = useState('')
  const [price, setPrice] = useState('')
  const [location, setLocation] = useState('')
  const [details, setDetails] = useState('')

  const [listedCars, setListedCars] = useState<any[]>([])
  const [images, setImages] = useState<string[]>([])

  const pickImages = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission required", "Camera roll permisions is required for uploading images.")
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsMultipleSelection: true,
      quality: 0.7

    })

    if (!result.canceled) {
      setImages(prev => [...result.assets.map(asset => asset.uri)]);
      Alert.alert("Succes", `${result.assets.length} image(s) have been uploaded!`)
    }
  }

  const handleSubmit = () => {
    if (!brand || !model || !year || !price || !location || !details) {
      Alert.alert("Error", "Please fill out all fields");
      return;
    }

    const newCar = {
      id: Date.now(),
      brand: brand,
      model: model,
      year: year,
      price: price,
      location: location,
      details: details,
      listedAt: new Date().toLocaleDateString(),
      images: images
    }
    setListedCars(prevCars => [...prevCars, newCar])

    //Resetting fields after submission
    setBrand('')
    setModel('')
    setYear('')
    setPrice('')
    setLocation('')
    setDetails('')
    setImages([])

    Alert.alert("Car has been listed", `Your ${year} ${brand} in ${location} has now been listed for ${price} per day`);
  };



  return (
    <View className="flex-1 bg-gray-50">
      <View className="pt-16 pb-6 px-6 bg-white shadow-sm">
        <Text className="text-3xl font-bold text-gray-900 mb-2">List Car page </Text>
        <Text className="text-lg text-gray-600">Fill in your car details</Text>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="mt-6">
          <Text className="text-lg font-semibold text-gray-800 mb-3"> Car brand</Text>
          <TextInput
            placeholder="e.g. Hyundai, BMW, Audi"
            value={brand}
            onChangeText={setBrand}
            className="bg-white border border-gray-300 rounded-xl px-4 py-4 text-lg"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View className="mt-4">
          <Text className="text-lg font-semibold text-gray-800 mb-3">Car model</Text>
          <TextInput
            placeholder="e.g. Civic, X5, RS7"
            value={model}
            onChangeText={setModel}
            className="bg-white border border-gray-300 rounded-xl px-4 py-4 text-lg"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View className="mt-4">
          <Text className="text-lg font-semibold text-gray-800 mb-3">Year</Text>
          <TextInput
            placeholder="e.g 2023,2024,2025"
            value={year}
            onChangeText={setYear}
            keyboardType={"numeric"}
            maxLength={4}
            className="bg-white border border-gray-300 rounded-xl px-4 py-4 text-lg"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View className="mt-4">
          <Text className="text-lg font-semibold text-gray-800 mb-3">Daily price $ </Text>
          <TextInput
            placeholder="eg. 45$, 99$,999$"
            value={price}
            onChangeText={setPrice}
            keyboardType={"numeric"}
            className="bg-white border border-gray-300 rounded-xl px-4 py-4 text-lg"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View className="mt-4">
          <Text className="text-lg font-semibold text-gray-800 mb-3">Location of the car </Text>
          <TextInput
            placeholder="eg. Odense, Aarhus, Copenhagen"
            value={location}
            onChangeText={setLocation}
            className="bg-white border border-gray-300 rounded-xl px-4 py-4 text-lg"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View className="mt-4">
          <Text className="text-lg font-semibold text-gray-800 mb-3">Car Equipment</Text>
          <TextInput
            placeholder="e.g. Air conditioning, Sunroof"
            value={details}
            onChangeText={setDetails}
            className="bg-white border border-gray-300 rounded-xl px-4 py-4 text-lg"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View className="mt-8 mb-8">
          <TouchableOpacity
            className="bg-gray-200 border-2 border-gray-300 border-dashed rounded-xl py-4 mb-4"
            activeOpacity={0.7}
            onPress={pickImages} >
            <Text className="text-center text-gray-700 text-lg font-medium">
              Upload images of the car {images.length > 0 ? `(${images.length} selected)` : ''}
            </Text>
          </TouchableOpacity>

          {images.length > 0 && (
            <ScrollView horizontal className="mb-4">
              <View className="flex-row space-x-2">
                {images.map((uri, index) => (
                  <View key={index} className="relative">
                    <Image
                      source={{ uri }}
                      className="w-20 h-20 rounded-lg" />
                    <TouchableOpacity
                      className="absolute -top-2 -right-2 bg-red-500 rounded-full w-6 h-6 items-center justify-center"
                      onPress={() => setImages(prev => prev.filter((_, i) => i !== index))} >
                      <Text className="text-white text-xs">x</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </ScrollView>
          )}


          <TouchableOpacity
            onPress={handleSubmit}
            className={"bg-blue-600 rounded-xl py-4 shadow-lg"}
            activeOpacity={0.8}
          >
            <Text className={"text-white text-center text-xl font-semibold"}>List my car</Text>
          </TouchableOpacity>
        </View>

        <View className="mt-8">
          <Text className="text-xl font-bold text-gray-800 mb-4"> Your listed cars ({listedCars.length})</Text>

          {listedCars.length == 0 ? (
            <Text className="text-gray-500 text-center py-8">No cars has been listed yet.</Text>
          ) : (
            listedCars.map((car) => (
              <View key={car.id} className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-200">

                {car.images && car.images.length > 0 ? (
                  <View className="mb-3">
                    <Image
                      source={{ uri: car.images[0] }}
                      className="w-full h-40 rounded-lg mb-2"
                    />
                    <Text className="text-blue-500 text-sm">
                      📸 {car.images.length} image{car.images.length > 1 ? 's' : ''}
                    </Text>
                  </View>
                ) : (
                  <View className="bg-gray-100 w-full h-40 rounded-lg mb-3 items-center justify-center">
                    <Text className="text-gray-400">No images</Text>
                  </View>
                )}

                <Text className="text-lg font-bold text-gray-800">{car.year} {car.brand} {car.model}</Text>
                <Text className="text-gray-600">Location: {car.location}</Text>
                <Text className="text-green-600 font-semibold">${car.price}/day</Text>
                <Text className="text-gray-400 text-sm">Listed: {car.listedAt}</Text>

                <TouchableOpacity
                  className="bg-red-100 rounded-lg py-2 mt-3"
                  onPress={() => {
                    setListedCars(prevCars => prevCars.filter(c => c.id !== car.id))
                  }}
                >
                  <Text className="text-red-600 text-center font-medium">Remove listing</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>


      </ScrollView>
    </View>
  );
}