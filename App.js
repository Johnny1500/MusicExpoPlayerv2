import * as React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

import { Provider } from "react-redux";
import store from "./redux/store";

import Player from "./components/Player";

export default function App() {
  
  console.log('App initial store :>> ', store);

  return (
    <Provider store={store}>
      <Player />
    </Provider>
  );
}
