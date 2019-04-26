import React, { Component } from "react";
import { Platform, Image } from "react-native";
import { createStackNavigator } from "react-navigation";
import { Text, View } from "native-base";
import SplashScreen from "./container/SplashScreen";
import HomeScreen from "./container/HomeScreen";

const ProjectStack = createStackNavigator(
  {
    SplashScreen: { screen: SplashScreen },
    HomeScreen: { screen: HomeScreen }
  },
  {
    initialRouteName: "SplashScreen",
    headerMode: "none",
    navigationOptions: {
      header: null
    }
  }
);

const ApartmentStack = createStackNavigator(
  {
    SplashScreen: { screen: SplashScreen }
  },
  {
    initialRouteName: "SplashScreen",
    headerMode: "none",
    navigationOptions: {
      header: null
    }
  }
);

const VoucherStack = createStackNavigator(
  {
    SplashScreen: { screen: SplashScreen }
  },
  {
    initialRouteName: "SplashScreen",
    headerMode: "none",
    navigationOptions: {
      header: null
    }
  }
);

const GalleryStack = createStackNavigator(
  {
    SplashScreen: { screen: SplashScreen }
  },
  {
    initialRouteName: "SplashScreen",
    headerMode: "none",
    navigationOptions: {
      header: null
    }
  }
);

const SupportStack = createStackNavigator(
  {
    SplashScreen: { screen: SplashScreen }
  },
  {
    initialRouteName: "SplashScreen",
    headerMode: "none",
    navigationOptions: {
      header: null
    }
  }
);

const ContactStack = createStackNavigator(
  {
    SplashScreen: { screen: SplashScreen }
  },
  {
    initialRouteName: "SplashScreen",
    headerMode: "none",
    navigationOptions: {
      header: null
    }
  }
);

class Main extends Component {
  render() {
    return (
      <View style={{flex: 1, flexDirection:'row'}}>
        <ProjectStack />
        <View style={{width:100, backgroundColor:'red'}}><Text>ABC</Text></View>
      </View>
    );
  }
}

const AppContainer = createStackNavigator(
  {
    Main: { screen: Main },
    HomeScreen: { screen: HomeScreen }
  },
  {
    initialRouteName: "Main",
    headerMode: "none",
    navigationOptions: {
      header: null
    }
  }
);

export default AppContainer;
