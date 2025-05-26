import React, { useEffect, useState } from "react";
import { FlatList, View, ScrollView } from "react-native";
import { TextInput, Chip, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import api from "../../api/api";
import BookCard from "../../components/BookCard";
import Loader from "../../components/Loader";
import { useDebounce } from "../../hooks/useDebounce";

type Book = {
  _id: string;
  title: string;
  author: string;
  genre: string[];
  imageUrl?: string;
};

export default function BookListScreen() {
  const [books, setBooks] = useState<Book[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("");
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    setLoading(true);
    api.get("/books", { params: { query: debouncedQuery, genre } })
      .then(res => {
        setBooks(res.data);
        setLoading(false);
        const allGenres = Array.from(new Set(res.data.flatMap((b: Book) => b.genre || [])));
        setGenres(allGenres);
      });
  }, [debouncedQuery, genre]);

  if (loading) return <Loader />;

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        placeholder="Ҷустуҷӯи китоб..."
        value={query}
        onChangeText={setQuery}
        style={{ margin: 12 }}
      />
      <ScrollView horizontal contentContainerStyle={{ paddingHorizontal: 10, marginBottom: 6 }}>
        {genres.map(g => (
          <Chip key={g} selected={genre === g} onPress={() => setGenre(genre === g ? "" : g)} style={{ marginHorizontal: 4 }}>{g}</Chip>
        ))}
      </ScrollView>
      {books.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 40 }}>Китоб ёфт нашуд.</Text>
      ) : (
        <FlatList
          data={books}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <BookCard
              book={{ ...item, imageUrl: item.imageUrl ? api.defaults.baseURL + item.imageUrl : undefined }}
              onPress={() => navigation.navigate("BookDetails", { id: item._id })}
            />
          )}
        />
      )}
    </View>
  );
}