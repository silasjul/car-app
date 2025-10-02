import { View, Text } from 'react-native';

export default function NotFound() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-2xl font-bold">Page Not Found</Text>
      <Text className="text-base mt-2.5">The page you are looking for does not exist.</Text>
    </View>
  );
}