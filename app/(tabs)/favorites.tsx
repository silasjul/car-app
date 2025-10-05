import { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import cars from "../cars.json";

type Car = {
  id: number;
  brand: string;
  model: string;
  pricePerDay: number;
  location: string;
  available: boolean;
  image?: string;
};

export default function Favorites() {
  const [favoriteIds] = useState<number[]>([1, 4, 7, 9]);

  const favorites: Car[] = (cars as Car[]).filter((car) =>
    favoriteIds.includes(car.id)
  );

  const renderCarCard = ({ item }: { item: Car }) => (
    <View style={styles.card}>
      {/* Billede */}
      <Image
        source={{
          uri: item.image || "https://i.ibb.co/0qP3tkW/default-car.jpg",
        }}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.title}>
          {item.brand} {item.model}
        </Text>
        <Text style={styles.location}>{item.location}</Text>

        {/* Pris + Status */}
        <View style={styles.row}>
          <Text style={styles.price}>${item.pricePerDay}/day</Text>
          <Text
            style={[
              styles.status,
              { color: item.available ? "green" : "red" },
            ]}
          >
            {item.available ? "Available" : "Unavailable"}
          </Text>
        </View>

        {/* Book Now knap */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Favorites</Text>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCarCard}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      ) : (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No favorites yet</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    padding: 16,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 160,
  },
  info: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  location: {
    color: "#6b7280",
    marginTop: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    alignItems: "center",
  },
  price: {
    fontSize: 20,
    fontWeight: "700",
  },
  status: {
    fontWeight: "500",
  },
  button: {
    backgroundColor: "black",
    marginTop: 12,
    paddingVertical: 12,
    borderRadius: 16,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#6b7280",
  },
});
