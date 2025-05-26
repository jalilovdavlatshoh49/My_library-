import React from "react";
import { FlatList, View } from "react-native";
import { Text } from "react-native-paper";
import { useAuth } from "../store/AuthContext";
import { useNavigation } from "@react-navigation/native";
import BookCard from "../components/BookCard";
import api from "../api/api";

export default function FavoritesScreen() {
  const { user } = useAuth();
  const navigation = useNavigation();

  if (!user?.favorites || user.favorites.length === 0)
    return <Text style={{ textAlign: "center", marginTop: 40 }}>Ҳеҷ китоб дар дӯстдоштаҳо нест</Text>;

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={user.favorites}
        keyExtractor={item => item._id}
        renderItem={({ item }: any) => (
          <BookCard
            book={{ ...item, imageUrl: item.imageUrl ? api.defaults.baseURL + item.imageUrl : undefined }}
            onPress={() => navigation.navigate("BookDetails", { id: item._id })}
          />
        )}
      />
    </View>
  );
}