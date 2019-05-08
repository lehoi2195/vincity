/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions
} from "react-native";
import images from "../../assets/images";
const { width, height } = Dimensions.get("window");
import { connect } from "react-redux";
class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={images.banner} />
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.auth,
    // loading: isRequestPending(state, "login")
  };
};
const mapDispatchToProps = dispatch => {
  return {
    // login: (...args) => dispatch(login(...args))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);

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
