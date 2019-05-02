/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import { Text, View } from "native-base";
import images from "../../assets/images";
const { width, height } = Dimensions.get("window");
export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={images.background}
          style={{
            width,
            height,
            justifyContent: "center",
            alignItems: "center", 
          
          }}
        >
          <Image source={images.logoTransparent}/>
          <TouchableOpacity 
          onPress={()=>this.props.onExplorer()}
          >
            <Image source={images.btnExplorer}/>
          </TouchableOpacity>
        </ImageBackground>
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
  touch:{
    backgroundColor: '#FFDB6B', 
    paddingVertical: 10,
    paddingHorizontal : 30,
    borderRadius: 20, 
    justifyContent: "center",
    alignItems: "center", 
    shadowColor: 'rgba(255, 203, 42, 0.29)',
    shadowOffset: {width: 5, height:10},
    shadowRadius: 10, 
    shadowOpacity: 1
  }
});
