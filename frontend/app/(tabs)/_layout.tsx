import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#fff',
      tabBarStyle: {
        backgroundColor: '#000',
      },
      tabBarShowLabel: false,
    }}>
      <Tabs.Screen name="index" options={{
        title: 'Search',
        tabBarIcon: ({ color, size }) => <Ionicons name="search" color={color} size={size} />
      }} />
      <Tabs.Screen name="rentals" options={{
        title: 'Rentals',
        tabBarIcon: ({ color, size }) => <Ionicons name="car" color={color} size={size} />
      }} />
      <Tabs.Screen name="favorites" options={{
        title: 'Favorite',
        tabBarIcon: ({ color, size }) => <Ionicons name="heart" color={color} size={size} />
      }} />
      <Tabs.Screen name="list-car" options={{
        title: 'List',
        tabBarIcon: ({ color, size }) => <Ionicons name="add-circle" color={color} size={size} />
      }} />
    </Tabs>
  );
}

