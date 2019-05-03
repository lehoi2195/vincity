/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Image, Dimensions } from "react-native";
import { View, Text } from "native-base";
import images from "../../assets/images";
const { width, height } = Dimensions.get("window");
export default class ContactScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.banner} source={images.banner} />
        <View row>
          <View style={styles.row1}>
            <Image source={images.logoTransparent} style={styles.logo} />
            <Text mediumitalic style={{ marginTop: 100, fontSize: 28, color: "#464A5B", fontFamily: 'Assets/Montserrat-MediumItalic.ttf#Montserrat MediumItalic' }}>
              Thông tin liên hệ
            </Text>
            <Text extrabold style={{ marginTop: 18, fontSize: 34, color: "#464A5B" }}>
              VINHOMES OCEAN PARK
            </Text>
            <View style={styles.line} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  banner: {
    // flex: 1,
    width,
    height: 222
  },
  logo: {
    width: 192,
    height: 152
  },
  row1: {
    marginTop: 155,
    marginLeft: 225
  },
  line: {
    backgroundColor: "#464A5B",
    height: 3,
    width: 144,
    marginTop: 24
  }
});
