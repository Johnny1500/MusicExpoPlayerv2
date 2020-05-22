import * as React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

import { Provider } from "react-redux";
import store from "./redux/store";

import Home from "./components/Home";

export default function App() {
  
  console.log('App initial store :>> ', store);

  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}
