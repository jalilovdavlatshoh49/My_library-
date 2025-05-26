import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAuth } from "../store/AuthContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LoginScreen from "../screens/Auth/LoginScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";
import BookListScreen from "../screens/Book/BookListScreen";
import BookDetailScreen from "../screens/Book/BookDetailScreen";
import AddEditBookScreen from "../screens/Book/AddEditBookScreen";
import ProfileScreen from "../screens/ProfileScreen";
import FavoritesScreen from "../screens/FavoritesScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  const { user } = useAuth();
  return (
    <Tab.Navigator>
      <Tab.Screen name="Books" component={BookListScreen}
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="book-open-page-variant" size={26} color={color} />
        }}
      />
      <Tab.Screen name="Favorites" component={FavoritesScreen}
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="heart" size={26} color={color} />
        }}
      />
      {user?.role === "admin" && (
        <Tab.Screen name="Add Book" component={AddEditBookScreen}
          options={{
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="plus-box" size={26} color={color} />
          }}
        />
      )}
      <Tab.Screen name="Profile" component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account" size={26} color={color} />
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { user } = useAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={MainTabs} options={{ headerShown: false }} />
            <Stack.Screen name="BookDetails" component={BookDetailScreen} />
            <Stack.Screen name="EditBook" component={AddEditBookScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}