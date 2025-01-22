import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GluestackUIProvider } from "./components/ui/gluestack-ui-provider";
import { store } from "./redux/store/store";
import MainApp from "./MainApp";
import "@/global.css";
import { Box } from "./components/ui/box";
import { Text } from "react-native";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <GluestackUIProvider mode="light">
          <NavigationContainer>
            <MainApp />
          </NavigationContainer>
        </GluestackUIProvider>
      </SafeAreaProvider>
    </Provider>
  );
}
