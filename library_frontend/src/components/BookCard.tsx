import React from "react";
import { Card, Text } from "react-native-paper";
import { TouchableOpacity } from "react-native";

type Book = {
  _id: string;
  title: string;
  author: string;
  imageUrl?: string;
};

export default function BookCard({ book, onPress }: { book: Book; onPress?: () => void }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={{ margin: 10, elevation: 2 }}>
        <Card.Content style={{ flexDirection: "row", alignItems: "center" }}>
          {book.imageUrl && (
            <Card.Cover source={{ uri: book.imageUrl }} style={{ width: 60, height: 80, marginRight: 16 }} />
          )}
          <Text variant="titleMedium" style={{ flex: 1 }}>{book.title}</Text>
        </Card.Content>
        <Card.Content>
          <Text variant="bodyMedium" style={{ color: "#777" }}>{book.author}</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
}