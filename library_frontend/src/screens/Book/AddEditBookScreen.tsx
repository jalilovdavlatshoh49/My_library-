import React, { useState, useEffect } from "react";
import { View, Image } from "react-native";
import { TextInput, Snackbar, Text } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import api from "../../api/api";
import { useRoute, useNavigation } from "@react-navigation/native";
import MyButton from "../../components/MyButton";
import Loader from "../../components/Loader";

export default function AddEditBookScreen() {
  const { params }: any = useRoute();
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState("");

  useEffect(() => {
    if (params?.id) {
      setLoading(true);
      api.get(`/books/${params.id}`).then(res => {
        setTitle(res.data.title);
        setAuthor(res.data.author);
        setYear(String(res.data.year));
        setGenre(res.data.genre?.join(", "));
        setDescription(res.data.description);
        setImage(res.data.imageUrl ? { uri: api.defaults.baseURL + res.data.imageUrl } : null);
        setLoading(false);
      });
    }
  }, [params]);

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
    if (!result.canceled && result.assets && result.assets[0].uri) {
      setImage({ uri: result.assets[0].uri });
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("year", year);
    formData.append("genre", genre);
    formData.append("description", description);
    if (image && image.uri && !image.uri.startsWith("http")) {
      // @ts-ignore
      formData.append("image", {
        uri: image.uri,
        type: "image/jpeg",
        name: "book.jpg"
      });
    }
    try {
      setLoading(true);
      if (params?.id) {
        await api.put(`/books/${params.id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
        setSnack("Китоб иваз шуд!");
      } else {
        await api.post("/books", formData, { headers: { "Content-Type": "multipart/form-data" } });
        setSnack("Китоб илова шуд!");
      }
      navigation.goBack();
    } catch (e: any) {
      setSnack(e.response?.data?.error || "Хатогӣ");
    }
    setLoading(false);
  };

  if (loading) return <Loader />;

  return (
    <View style={{ padding: 16 }}>
      <TextInput label="Ном" value={title} onChangeText={setTitle} style={{ marginBottom: 8 }} />
      <TextInput label="Муаллиф" value={author} onChangeText={setAuthor} style={{ marginBottom: 8 }} />
      <TextInput label="Сол" value={year} onChangeText={setYear} keyboardType="numeric" style={{ marginBottom: 8 }} />
      <TextInput label="Жанр (бо вергул)" value={genre} onChangeText={setGenre} style={{ marginBottom: 8 }} />
      <TextInput label="Тавсиф" value={description} onChangeText={setDescription} style={{ marginBottom: 8 }} multiline />
      <MyButton icon="image" onPress={handlePickImage}>Тасвир интихоб кун</MyButton>
      {image && <Image source={image} style={{ width: 100, height: 140, marginVertical: 8, alignSelf: "center" }} />}
      <MyButton icon={params?.id ? "content-save-edit" : "plus-box"} onPress={handleSubmit}>{params?.id ? "Гузариш" : "Илова"}</MyButton>
      <Snackbar visible={!!snack} onDismiss={() => setSnack("")}>{snack}</Snackbar>
    </View>
  );
}