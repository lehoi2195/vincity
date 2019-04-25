import React from "react";
import { Platform, Image } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
  createAppContainer
} from "react-navigation";
import { Text, View } from "native-base";

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

const AppNavigator = createStackNavigator(
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
const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
