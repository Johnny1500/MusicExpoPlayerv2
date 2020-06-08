import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { Platform, StyleSheet, Text, View } from "react-native";

import { Provider } from "react-redux";
import store from "./redux/store";

import Home from "./components/Home";
import Player from "./components/Player";

const Stack = createStackNavigator();

export default function App() {
  // console.log('App initial store :>> ', store);

  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
        {/* <Home /> */}
          <Stack.Screen name="Playlist" component={Home} options={{
          title: "Playlist",
          headerTitleStyle: {
            textAlign:"center",
            flex:1 
          },          
        }}/>
        <Stack.Screen name="MediaPlayer" component={Player} options={{
          title: "MediaPlayer",
          headerTitleStyle: {
            textAlign:"center",
            flex:1 
          },          
        }}/>
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}
