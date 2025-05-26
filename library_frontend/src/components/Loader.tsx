import React from "react";
import { ActivityIndicator } from "react-native-paper";
import { View } from "react-native";

export default function Loader() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 40 }}>
      <ActivityIndicator size="large" />
    </View>
  );
}