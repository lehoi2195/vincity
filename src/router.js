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

const VoucherStack = createStackNavigator(
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
    initialRouteName: "ProjectStack",
    headerMode: "none",
    resetOnBlur: false,
    navigationOptions: {
      header: null
    }
  }
);

class Main extends Component {
  state = {
    index: 0
  };
  renderTab = (index) => {
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
  render() {
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

export default Main;
