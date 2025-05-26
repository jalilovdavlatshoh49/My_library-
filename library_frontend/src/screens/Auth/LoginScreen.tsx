import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, Text, Snackbar } from "react-native-paper";
import MyButton from "../../components/MyButton";
import { useAuth } from "../../store/AuthContext";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login(username, password);
    } catch (e: any) {
      setError(e.response?.data?.error || "Login failed");
    }
    setLoading(false);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 16 }}>
      <Text variant="headlineMedium" style={{ marginBottom: 24, textAlign: "center" }}>Вуруд</Text>
      <TextInput label="Username" value={username} onChangeText={setUsername} style={{ marginBottom: 12 }} />
      <TextInput label="Password" value={password} onChangeText={setPassword} secureTextEntry style={{ marginBottom: 12 }} />
      <MyButton loading={loading} onPress={handleLogin}>Вуруд</MyButton>
      <MyButton onPress={() => navigation.navigate("Register")}>Сабти ном</MyButton>
      <Snackbar visible={!!error} onDismiss={() => setError("")}>{error}</Snackbar>
    </View>
  );
}