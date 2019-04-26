import React from "react";
import { Platform, Image } from "react-native";
import {
  createStackNavigator,
} from "react-navigation";
import { Text, View } from "native-base";
import SplashScreen from "./container/SplashScreen";
import HomeScreen from "./container/HomeScreen";
const AppStack = createStackNavigator(
  {
    HomeScreen: { screen: HomeScreen },



  },
  {
    initialRouteName: "HomeScreen",
    headerMode: "none",
    navigationOptions: {
      header: null
    }
  }
);

const AppContainer = createStackNavigator(
  {
    SplashScreen: { screen: SplashScreen },
  },
  {
    initialRouteName: "SplashScreen",
    headerMode: "none",
    navigationOptions: {
      header: null
    }
  }
);

export default AppContainer;
