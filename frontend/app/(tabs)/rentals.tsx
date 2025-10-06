import carsData from "@/mocks/cars.json";
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Car {
  id: number;
  brand: string;
  model: string;
  pricePerDay: number;
  location: string;
  available: boolean;
}

interface Rental {
  id: string;
  carId: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'upcoming' | 'completed';
  totalPrice: number;
  pickupLocation: string;
  returnLocation: string;
}

export default function Rentals() {
  const [selectedTab, setSelectedTab] = useState<'active' | 'upcoming' | 'completed'>('active');

  // Mock rental data - replace with your API call
  // This links to the cars from cars.json
  const rentals: Rental[] = [
    {
      id: '1',
      carId: 5, // Tesla Model 3
      startDate: '2025-10-02',
      endDate: '2025-10-06',
      status: 'active',
      totalPrice: 500,
      pickupLocation: 'Copenhagen',
      returnLocation: 'Copenhagen',
    },
    {
      id: '2',
      carId: 1, // BMW X5
      startDate: '2025-10-10',
      endDate: '2025-10-15',
      status: 'upcoming',
      totalPrice: 500,
      pickupLocation: 'Odense',
      returnLocation: 'Odense',
    },
    {
      id: '3',
      carId: 6, // Toyota Corolla
      startDate: '2025-09-20',
      endDate: '2025-09-25',
      status: 'completed',
      totalPrice: 300,
      pickupLocation: 'Odense',
      returnLocation: 'Odense',
    },
    {
      id: '4',
      carId: 4, // Mercedes C-Class
      startDate: '2025-08-15',
      endDate: '2025-08-17',
      status: 'completed',
      totalPrice: 240,
      pickupLocation: 'Odense',
      returnLocation: 'Odense',
    },
  ];

  const getCar = (carId: number): Car | undefined => {
    return carsData.find((car) => car.id === carId);
  };

  //Billeder random kan fjernes hvis vi selv har nogen
  const getCarImage = (brand: string): string => {
    const imageMap: { [key: string]: string } = {
      'BMW': 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400',
      'Volkswagen': 'https://images.unsplash.com/photo-1622353219448-46a009f0d44f?w=400',
      'Audi': 'https://images.unsplash.com/photo-1610768764270-790fbec18178?w=400',
      'Mercedes': 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400',
      'Tesla': 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=400',
      'Toyota': 'https://images.unsplash.com/photo-1629897048514-3dd7414fe72a?w=400',
    };
    return imageMap[brand] || 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400';
  };

  const filteredRentals = rentals.filter((rental) => rental.status === selectedTab);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleViewDetails = (rentalId: string) => {
    console.log('View details for rental:', rentalId);
    // Navigate to rental details screen
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Rentals</Text>
        <Text style={styles.subtitle}>Track your car rentals</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          onPress={() => setSelectedTab('active')}
          style={[styles.tabButton, selectedTab === 'active' ? styles.activeTab : styles.inactiveTab]}
        >
          <Text
            style={[styles.tabText, selectedTab === 'active' ? styles.activeTabText : styles.inactiveTabText]}
          >
            Active
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSelectedTab('upcoming')}
          style={[styles.tabButton, selectedTab === 'upcoming' ? styles.activeTab : styles.inactiveTab]}
        >
          <Text
            style={[styles.tabText, selectedTab === 'upcoming' ? styles.activeTabText : styles.inactiveTabText]}
          >
            Upcoming
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSelectedTab('completed')}
          style={[styles.tabButton, selectedTab === 'completed' ? styles.activeTab : styles.inactiveTab]}
        >
          <Text
            style={[styles.tabText, selectedTab === 'completed' ? styles.activeTabText : styles.inactiveTabText]}
          >
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      {/* Rentals List */}
      <ScrollView style={styles.scrollView}>
        {filteredRentals.length > 0 ? (
          filteredRentals.map((rental) => {
            const car = getCar(rental.carId);
            if (!car) return null;

            return (
              <View key={rental.id} style={styles.rentalCard}>
                <View style={styles.cardRow}>
                  <Image
                    source={{ uri: getCarImage(car.brand) }}
                    style={styles.carImage}
                    resizeMode="cover"
                  />

                  <View style={styles.cardContent}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                      <View>
                        <Text style={styles.carTitle}>
                          {car.brand} {car.model}
                        </Text>
                        <View style={[styles.statusBadge, rental.status === 'active' ? styles.statusActive : rental.status === 'upcoming' ? styles.statusUpcoming : styles.statusCompleted]}>
                          <Text style={[styles.statusText, rental.status === 'active' ? styles.statusTextActive : rental.status === 'upcoming' ? styles.statusTextUpcoming : styles.statusTextCompleted]}>
                            {rental.status}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
                  {/* Date Range */}
                  <View style={styles.dateSection}>
                    <View style={styles.dateRow}>
                      <View>
                        <Text style={styles.dateLabel}>Pick-up</Text>
                        <Text style={styles.dateText}>
                          {formatDate(rental.startDate)}
                        </Text>
                      </View>
                      <Text style={styles.arrow}>→</Text>
                      <View>
                        <Text style={styles.dateLabel}>Return</Text>
                        <Text style={styles.dateText}>
                          {formatDate(rental.endDate)}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* Location */}
                  <View style={styles.locationSection}>
                    <Text style={styles.locationLabel}>📍 Location</Text>
                    <Text style={styles.locationText}>{rental.pickupLocation}</Text>
                  </View>

                  {/* Price and Action */}
                  <View style={styles.priceActionRow}>
                    <View>
                      <Text style={styles.priceLabel}>Total Price</Text>
                      <Text style={styles.priceText}>${rental.totalPrice}</Text>
                    </View>

                    <TouchableOpacity
                      onPress={() => handleViewDetails(rental.id)}
                      style={styles.viewDetailsButton}
                    >
                      <Text style={styles.viewDetailsText}>View Details</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🚗</Text>
            <Text style={styles.emptyTitle}>No {selectedTab} rentals</Text>
            <Text style={styles.emptySubtitle}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  subtitle: {
    color: '#6b7280',
    marginTop: 4,
  },
  tabsContainer: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    borderBottomWidth: 2,
  },
  activeTab: {
    borderBottomColor: '#3b82f6',
  },
  inactiveTab: {
    borderBottomColor: 'transparent',
  },
  tabText: {
    textAlign: 'center',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#3b82f6',
  },
  inactiveTabText: {
    color: '#6b7280',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  rentalCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  cardRow: {
    flexDirection: 'row',
  },
  carImage: {
    width: 128,
    height: 128,
  },
  cardContent: {
    flex: 1,
    padding: 16,
  },
  carTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  statusBadge: {
    marginTop: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 50,
    alignSelf: 'flex-start',
  },
  statusActive: {
    backgroundColor: '#dcfce7',
  },
  statusUpcoming: {
    backgroundColor: '#dbeafe',
  },
  statusCompleted: {
    backgroundColor: '#f3f4f6',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  statusTextActive: {
    color: '#15803d',
  },
  statusTextUpcoming: {
    color: '#1d4ed8',
  },
  statusTextCompleted: {
    color: '#4b5563',
  },
  dateSection: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  dateLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  arrow: {
    color: '#9ca3af',
    marginHorizontal: 8,
  },
  locationSection: {
    marginBottom: 12,
  },
  locationLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  locationText: {
    fontSize: 14,
    color: '#374151',
  },
  priceActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  priceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  viewDetailsButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 12,
  },
  viewDetailsText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
  },
  emptyEmoji: {
    fontSize: 60,
    marginBottom: 16,
  },
  emptyTitle: {
    color: '#9ca3af',
    fontSize: 18,
    fontWeight: '600',
  },
  emptySubtitle: {
    color: '#9ca3af',
    fontSize: 14,
    marginTop: 8,
  },
});