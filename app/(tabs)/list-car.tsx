
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert} from 'react-native';
import {useState} from "react";

export default function ListCar() {
    const [brand, setBrand] = useState('')
    const [model, setModel] = useState('')
    const [year, setYear] = useState('')
    const [price, setPrice] = useState('')
    const [location, setLocation] = useState('')

    const handleSubmit = () => {
        if(!brand || !model ||!year || !price || !location ){
            Alert.alert("Error", "Please fill out all fields");
            return;
        }

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

        <View className= "mt-4">
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
                    placeholder="eg. Odense, Aarhus, København"
                    value={location}
                    onChangeText={setLocation}
                    className="bg-white border border-gray-300 rounded-xl px-4 py-4 text-lg"
                    placeholderTextColor="#9CA3AF"
                />
            </View>

        <View className= "mt-8 mb-8">
            <TouchableOpacity
                className="bg-gray-200 border-2 border-gray-300 border-dashed rounded-xl py--4 mb-4"
                activeOpacity={0.7}
                onPress={() => Alert.alert("Upload", "Image upload feature would go here")} >
                <Text className="text-center text-gray-700 text.lg font-medium">
                    Upload images of the car
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={handleSubmit}
                className={"bg-blue-600 rounded-xl py-4 shadow-lg"}
                activeOpacity={0.8}
                >
                <Text className={"text-white text-center text-xl font-semibold"}>List my car</Text>
            </TouchableOpacity>
        </View>



    </ScrollView>
    </View>
  );
}