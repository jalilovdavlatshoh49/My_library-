import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, Snackbar, Text } from "react-native-paper";
import MyButton from "../../components/MyButton";
import { useAuth } from "../../store/AuthContext";

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleRegister = async () => {
    setLoading(true);
    try {
      await register(username, password);
      setSuccess("Сабти ном муваффақ!");
      setTimeout(() => navigation.navigate("Login"), 1200);
    } catch (e: any) {
      setError(e.response?.data?.error || "Register failed");
    }
    setLoading(false);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 16 }}>
      <Text variant="headlineMedium" style={{ marginBottom: 24, textAlign: "center" }}>Сабти ном</Text>
      <TextInput label="Username" value={username} onChangeText={setUsername} style={{ marginBottom: 12 }} />
      <TextInput label="Password" value={password} onChangeText={setPassword} secureTextEntry style={{ marginBottom: 12 }} />
      <MyButton loading={loading} onPress={handleRegister}>Сабти ном</MyButton>
      <MyButton onPress={() => navigation.navigate("Login")}>Вуруд</MyButton>
      <Snackbar visible={!!error} onDismiss={() => setError("")}>{error}</Snackbar>
      <Snackbar visible={!!success} onDismiss={() => setSuccess("")}>{success}</Snackbar>
    </View>
  );
}