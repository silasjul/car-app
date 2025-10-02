import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false, 
      tabBarActiveTintColor: '#fff',
      tabBarStyle: {
        backgroundColor: '#000',
      },
    }}>
      <Tabs.Screen name="index" options={{ title: 'Search' }} />
      <Tabs.Screen name="favorites" options={{ title: 'Favorite' }} />
      <Tabs.Screen name="list-car" options={{ title: 'List' }} />
      <Tabs.Screen name="messages" options={{ title: 'Messages' }} />
      <Tabs.Screen name="rentals" options={{ title: 'Rentals' }} />
    </Tabs>
  );
}

