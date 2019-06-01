import React, { Component } from "react";
import { Platform, Image } from "react-native";
import {
  createStackNavigator,
  createSwitchNavigator,
  NavigationActions
} from "react-navigation";
import { Text, View } from "native-base";
import SplashScreen from "./container/SplashScreen";
import HomeScreen from "./container/HomeScreen";
import TabBarRight from "./components/TabbarRight";

import ApartmentScreen from "./container/ApartmentScreen";
import VoucherScreen from "./container/VoucherScreen";
import GalleryScreen from "./container/GalleryScreen";
import SupportScreen from "./container/SupportScreen";
import ContactScreen from "./container/ContactScreen";
import MapScreen from "./container/MapScreen";

const ProjectStack = createStackNavigator(
  {
    HomeScreen: { screen: HomeScreen },
    MapScreen: { screen: MapScreen }
  },
  {
    initialRouteName: "HomeScreen",
    headerMode: "none",
    navigationOptions: {
      header: null
    }
  }
);



const ApartmentStack = createStackNavigator(
  {
    ApartmentScreen: { screen: ApartmentScreen }
  },
  {
    initialRouteName: "ApartmentScreen",
    headerMode: "none",
    navigationOptions: {
      header: null
    }
  }
);

const VoucherStack = createStackNavigator(
  {
    VoucherScreen: { screen: VoucherScreen }
  },
  {
    initialRouteName: "VoucherScreen",
    headerMode: "none",
    navigationOptions: {
      header: null
    }
  }
);

const GalleryStack = createStackNavigator(
  {
    GalleryScreen: { screen: GalleryScreen }
  },
  {
    initialRouteName: "GalleryScreen",
    headerMode: "none",
    navigationOptions: {
      header: null
    }
  }
);

const SupportStack = createStackNavigator(
  {
    SupportScreen: { screen: SupportScreen }
  },
  {
    initialRouteName: "SupportScreen",
    headerMode: "none",
    navigationOptions: {
      header: null
    }
  }
);

const ContactStack = createStackNavigator(
  {
    ContactScreen: { screen: ContactScreen }
  },
  {
    initialRouteName: "ContactScreen",
    headerMode: "none",
    navigationOptions: {
      header: null
    }
  }
);

const SwitchScreen = createSwitchNavigator(
  {
    ProjectStack: { screen: ProjectStack },
    ApartmentStack: { screen: ApartmentStack },
  
    VoucherStack: { screen: VoucherStack },
    GalleryStack: { screen: GalleryStack },
    SupportStack: { screen: SupportStack },
    ContactStack: { screen: ContactStack }
  },
  {
    initialRouteName: "ApartmentStack",

    headerMode: "none",
    resetOnBlur: false,
    navigationOptions: {
      header: null
    }
  }
);

class Main extends Component {
  state = {
    index: 0,
    explorer: false
  };
  renderTab = index => {
    switch (index) {
      case 0:
        return "ProjectStack";
      case 1:
        return "ApartmentStack";
      case 2:
        return "VoucherStack";
      case 3:
        return "GalleryStack";
      case 4:
        return "SupportStack";
      case 5:
        return "ContactStack";
      default:
        return "ProjectStack";
    }
  };
  onFocus = index => {
    this.setState({ index });
    this.navigator &&
      this.navigator.dispatch(
        NavigationActions.navigate({
          routeName: this.renderTab(index)
        })
      );
  };
  renderMain() {
    return (
      <View style={{ flex: 1, flexDirection: "row" }}>
        {/* {this.renderTab()} */}
        <SwitchScreen
          ref={nav => {
            this.navigator = nav;
          }}
        />
        <View style={{ width: 84, backgroundColor: "#202435" }}>
          <TabBarRight onFocus={this.onFocus} index={this.state.index} />
        </View>
      </View>
    );
  }
  render() {
    return !this.state.explorer ? (
      <SplashScreen onExplorer={() => this.setState({ explorer: true })} />
    ) : (
      this.renderMain()
    );
  }
}

export default Main;
