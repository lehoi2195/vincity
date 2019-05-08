/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Image, Dimensions } from "react-native";
import { View, Text } from "native-base";
import AppStyles from "@styles";
import images from "../../assets/images";
import Header from "@components/Header";
import SideBarItem from "@components/SideBarItem";
const { width, height } = Dimensions.get("window");
const GALLERY_TAB = [
  { id: 0, text: "Hình ảnh" },
  { id: 1, text: "Video" },
  { id: 2, text: "Tài liệu" }
];

export default class Gallery extends Component {
  state = {
    index: 4
  };
  onPressItem = index => {
    this.setState({ index });
  };

  render() {
    return (
      <View row style={styles.container}>
        <View style={AppStyles.content}>
          <Header />
        </View>
        <View
          style={[AppStyles.sidebar, { paddingTop: 108, paddingRight: 42, backgroundColor:'blue' }]}
        >
          {GALLERY_TAB.map((tab, index) => (
            <SideBarItem
              onPress={() => this.onPressItem(index)}
              active={this.state.index === index}
              text={tab.text}
              key={tab.id.toString()}
            />
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
