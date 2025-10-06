import { useFonts } from 'expo-font';
import { Stack } from "expo-router";
import { ActivityIndicator, Text, View } from 'react-native';
import { AuthProvider, useAuth } from "../hooks/useAuth";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Thin': require('../assets/fonts/PPNeueMontreal-Thin.otf'),
    'Book': require('../assets/fonts/PPNeueMontreal-Book.otf'),
    'Medium': require('../assets/fonts/PPNeueMontreal-Medium.otf'),
    'SemiBolditalic': require('../assets/fonts/PPNeueMontreal-SemiBolditalic.otf'),
    'Bold': require('../assets/fonts/PPNeueMontreal-Bold.otf'),
    'Italic': require('../assets/fonts/PPNeueMontreal-Italic.otf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  // Set default font for all Text components
  // @ts-ignore
  Text.defaultProps = Text.defaultProps || {};
  // @ts-ignore
  Text.defaultProps.style = { fontFamily: 'Book' };

  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

function App() {
  const { isAuthenticated, isLoading } = useAuth();

  // Loading screen while checking for token
  if (isLoading) return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  )

  if (!isAuthenticated) {
    return (
      <Stack>
        <Stack.Screen name="welcome" options={{ headerShown: false }} />
      </Stack>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
