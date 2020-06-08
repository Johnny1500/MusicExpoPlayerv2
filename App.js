import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Platform, StyleSheet, Text, View } from "react-native";

import { Provider } from "react-redux";
import store from "./redux/store";

import Home from "./components/Home";

export default function App() {
  // console.log('App initial store :>> ', store);

  return (
    <NavigationContainer>
      <Provider store={store}>
        <Home />
      </Provider>
    </NavigationContainer>
  );
}
