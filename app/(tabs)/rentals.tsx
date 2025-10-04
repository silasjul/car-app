import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';

interface Rental {
    id: string;
    carName: string;
    carBrand: string;
    carImage: string;
    startDate: string;
    endDate: string;
    status: 'active' | 'upcoming' | 'completed';
    totalPrice: number;
    pickupLocation: string;
    returnLocation: string;
}

export default function Rentals() {
    const [selectedTab, setSelectedTab] = useState<'active' | 'upcoming' | 'completed'>('active');

    // Mock data - replace with your API call
    const rentals: Rental[] = [
        {
            id: '1',
            carName: 'Model S',
            carBrand: 'Tesla',
            carImage: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=400',
            startDate: '2025-10-02',
            endDate: '2025-10-06',
            status: 'active',
            totalPrice: 480,
            pickupLocation: 'Svendborg',
            returnLocation: 'Svendborg',
        },
        {
            id: '2',
            carName: 'Wrangler',
            carBrand: 'Jeep',
            carImage: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400',
            startDate: '2025-10-10',
            endDate: '2025-10-15',
            status: 'upcoming',
            totalPrice: 475,
            pickupLocation: 'Copenhagen',
            returnLocation: 'Copenhagen',
        },
        {
            id: '3',
            carName: 'Civic',
            carBrand: 'Honda',
            carImage: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=400',
            startDate: '2025-09-20',
            endDate: '2025-09-25',
            status: 'completed',
            totalPrice: 325,
            pickupLocation: 'Aarhus',
            returnLocation: 'Aarhus',
        },
        {
            id: '4',
            carName: '911 Carrera',
            carBrand: 'Porsche',
            carImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400',
            startDate: '2025-08-15',
            endDate: '2025-08-17',
            status: 'completed',
            totalPrice: 500,
            pickupLocation: 'Odense',
            returnLocation: 'Odense',
        },
    ];

    const filteredRentals = rentals.filter((rental) => rental.status === selectedTab);

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const getStatusColor = (status: string): string => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-700';
            case 'upcoming':
                return 'bg-blue-100 text-blue-700';
            case 'completed':
                return 'bg-gray-100 text-gray-600';
            default:
                return 'bg-gray-100 text-gray-600';
        }
    };

    const handleViewDetails = (rentalId: string) => {
        console.log('View details for rental:', rentalId);
        // Navigate to rental details screen
    };

    return (
        <View className="flex-1 bg-gray-50">
            {/* Header */}
            <View className="bg-white px-4 pt-12 pb-4 shadow-sm">
                <Text className="text-3xl font-bold text-gray-800">My Rentals</Text>
                <Text className="text-gray-500 mt-1">Track your car rentals</Text>
            </View>

            {/* Tabs */}
            <View className="bg-white px-4 py-3 border-b border-gray-200 flex-row justify-around">
                <TouchableOpacity
                    onPress={() => setSelectedTab('active')}
                    className={`flex-1 py-2 border-b-2 ${
                        selectedTab === 'active' ? 'border-blue-500' : 'border-transparent'
                    }`}
                >
                    <Text
                        className={`text-center font-semibold ${
                            selectedTab === 'active' ? 'text-blue-500' : 'text-gray-500'
                        }`}
                    >
                        Active
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setSelectedTab('upcoming')}
                    className={`flex-1 py-2 border-b-2 ${
                        selectedTab === 'upcoming' ? 'border-blue-500' : 'border-transparent'
                    }`}
                >
                    <Text
                        className={`text-center font-semibold ${
                            selectedTab === 'upcoming' ? 'text-blue-500' : 'text-gray-500'
                        }`}
                    >
                        Upcoming
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setSelectedTab('completed')}
                    className={`flex-1 py-2 border-b-2 ${
                        selectedTab === 'completed' ? 'border-blue-500' : 'border-transparent'
                    }`}
                >
                    <Text
                        className={`text-center font-semibold ${
                            selectedTab === 'completed' ? 'text-blue-500' : 'text-gray-500'
                        }`}
                    >
                        Completed
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Rentals List */}
            <ScrollView className="flex-1 px-4 py-4">
                {filteredRentals.length > 0 ? (
                    filteredRentals.map((rental) => (
                        <View key={rental.id} className="bg-white rounded-2xl mb-4 shadow-sm overflow-hidden">
                            <View className="flex-row">
                                <Image
                                    source={{ uri: rental.carImage }}
                                    className="w-32 h-32"
                                    resizeMode="cover"
                                />

                                <View className="flex-1 p-4">
                                    <View className="flex-row justify-between items-start mb-2">
                                        <View>
                                            <Text className="text-lg font-bold text-gray-800">
                                                {rental.carBrand} {rental.carName}
                                            </Text>
                                            <View className={`mt-1 px-2 py-1 rounded-full self-start ${getStatusColor(rental.status)}`}>
                                                <Text className="text-xs font-semibold capitalize">
                                                    {rental.status}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View className="px-4 pb-4">
                                {/* Date Range */}
                                <View className="bg-gray-50 rounded-xl p-3 mb-3">
                                    <View className="flex-row justify-between items-center mb-2">
                                        <View>
                                            <Text className="text-xs text-gray-500 mb-1">Pick-up</Text>
                                            <Text className="text-sm font-semibold text-gray-800">
                                                {formatDate(rental.startDate)}
                                            </Text>
                                        </View>
                                        <Text className="text-gray-400 mx-2">→</Text>
                                        <View>
                                            <Text className="text-xs text-gray-500 mb-1">Return</Text>
                                            <Text className="text-sm font-semibold text-gray-800">
                                                {formatDate(rental.endDate)}
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                                {/* Location */}
                                <View className="mb-3">
                                    <Text className="text-xs text-gray-500 mb-1">📍 Location</Text>
                                    <Text className="text-sm text-gray-700">{rental.pickupLocation}</Text>
                                </View>

                                {/* Price and Action */}
                                <View className="flex-row justify-between items-center">
                                    <View>
                                        <Text className="text-xs text-gray-500">Total Price</Text>
                                        <Text className="text-xl font-bold text-blue-600">${rental.totalPrice}</Text>
                                    </View>

                                    <TouchableOpacity
                                        onPress={() => handleViewDetails(rental.id)}
                                        className="bg-blue-500 px-6 py-2 rounded-xl"
                                    >
                                        <Text className="text-white font-semibold">View Details</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))
                ) : (
                    <View className="flex-1 justify-center items-center py-20">
                        <Text className="text-6xl mb-4">🚗</Text>
                        <Text className="text-gray-400 text-lg font-semibold">No {selectedTab} rentals</Text>
                        <Text className="text-gray-400 text-sm mt-2">
                            {selectedTab === 'active' && "You don't have any active rentals"}
                            {selectedTab === 'upcoming' && "You don't have any upcoming rentals"}
                            {selectedTab === 'completed' && "You haven't completed any rentals yet"}
                        </Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}