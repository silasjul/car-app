import { View, Text, StyleSheet } from 'react-native';

export default function NotFound() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    subtitle: {
      fontSize: 16,
      marginTop: 10,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Page Not Found</Text>
      <Text style={styles.subtitle}>The page you are looking for does not exist.</Text>
    </View>
  );
}