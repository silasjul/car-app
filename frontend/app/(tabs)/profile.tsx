import React, { useState } from "react";
import {
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useAuth } from "./AuthContext";


export default function Profile() {
  const { user, login, logout } = useAuth();
  const [username, setUsername] = useState("");
  const bgImage = require("../../assets/images/login-bg.jpg");

  if (user) {
    return (
      <ImageBackground source={bgImage} style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.welcome}>Welcome {user} 👋</Text>
          <Button title="Logout" onPress={logout} color="red" />
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={bgImage} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter username"
          placeholderTextColor="#888"
          value={username}
          onChangeText={setUsername}
        />
        <Button
          title="Login"
          onPress={() => login(username)}
          disabled={!username}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "80%",
    backgroundColor: "rgba(255,255,255,0.85)",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  welcome: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    width: "100%",
    marginBottom: 20,
    backgroundColor: "#fff",
  },
});
