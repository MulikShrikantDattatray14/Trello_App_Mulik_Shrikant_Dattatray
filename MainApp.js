import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BoardsScreen from "./screens/BoardsScreen";
import ListsScreen from "./screens/ListsScreen";
import "@/global.css";

const Stack = createNativeStackNavigator();

export default function MainApp() {
  return (
    <Stack.Navigator
      initialRouteName="Boards"
      screenOptions={{
        headerStyle: {
          backgroundColor: "black",
        },
        headerTintColor: "#ffffff",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
        },
        headerTitleAlign: "center",
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="Boards"
        component={BoardsScreen}
        options={{
          title: "Your Boards",
        }}
      />

      <Stack.Screen
        name="Lists"
        component={ListsScreen}
        options={{
          title: "Your Lists",
        }}
      />
    </Stack.Navigator>
  );
}
