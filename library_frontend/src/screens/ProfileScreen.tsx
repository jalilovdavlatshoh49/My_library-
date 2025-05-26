import React from "react";
import { View } from "react-native";
import { Text, Button, Card } from "react-native-paper";
import { useAuth } from "../store/AuthContext";

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Card style={{ width: "90%", padding: 20 }}>
        <Text variant="titleLarge" style={{ marginBottom: 8 }}>Профил</Text>
        <Text>Истифодабаранда: {user.username}</Text>
        <Text>Нақш: {user.role}</Text>
        <Button mode="outlined" onPress={logout} style={{ marginTop: 24 }}>Баромадан</Button>
      </Card>
    </View>
  );
}