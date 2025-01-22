import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BoardsScreen from "./screens/BoardsScreen";
import "@/global.css";

const Stack = createNativeStackNavigator();

export default function MainApp() {
  return (
    <Stack.Navigator
      initialRouteName="Boards"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#6200ea",
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
    </Stack.Navigator>
  );
}
