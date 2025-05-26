import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { Text, Button, Snackbar, Card, Chip } from "react-native-paper";
import api from "../../api/api";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useAuth } from "../../store/AuthContext";
import Loader from "../../components/Loader";

export default function BookDetailScreen() {
  const { params }: any = useRoute();
  const navigation = useNavigation();
  const { user, fetchProfile } = useAuth();
  const [book, setBook] = useState<any>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    api.get(`/books/${params.id}`).then(res => setBook(res.data));
  }, [params]);

  if (!book) return <Loader />;

  const isFavorite = user?.favorites?.some((fav: any) => typeof fav === "string" ? fav === book._id : fav?._id === book._id);

  const toggleFavorite = async () => {
    try {
      await api.post(`/users/me/favorites/${book._id}`);
      await fetchProfile();
      setSuccess(isFavorite ? "Аз дӯстдоштаҳо бардошта шуд" : "Ба дӯстдоштаҳо илова шуд");
    } catch (e: any) {
      setError(e.response?.data?.error || "Хатогӣ");
    }
  };

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <Card>
        {book.imageUrl && (
          <Card.Cover source={{ uri: api.defaults.baseURL + book.imageUrl }} style={{ height: 220 }} />
        )}
        <Card.Title title={book.title} subtitle={book.author} />
        <Card.Content>
          <Text>{book.description}</Text>
          <View style={{ flexDirection: "row", marginVertical: 6, flexWrap: "wrap" }}>
            {book.genre?.map((g: string) => <Chip key={g} style={{ margin: 2 }}>{g}</Chip>)}
          </View>
          <Button mode={isFavorite ? "outlined" : "contained"} icon="heart" onPress={toggleFavorite} style={{ marginVertical: 8 }}>
            {isFavorite ? "Аз дӯстдоштаҳо" : "Ба дӯстдоштаҳо"}
          </Button>
          {user?.role === "admin" && (
            <Button icon="pencil" onPress={() => navigation.navigate("EditBook", { id: book._id })}>Таҳрир</Button>
          )}
        </Card.Content>
      </Card>
      <Snackbar visible={!!error} onDismiss={() => setError("")}>{error}</Snackbar>
      <Snackbar visible={!!success} onDismiss={() => setSuccess("")}>{success}</Snackbar>
    </ScrollView>
  );
}