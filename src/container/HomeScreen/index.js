import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Image,
  Dimensions
} from "react-native";
import {View, Text} from 'native-base';

import images from "../../assets/images";
const { width, height } = Dimensions.get("window");
import { connect } from "react-redux";
class HomeScreen extends Component {
  render() {
    return (
      <View center style={{ flex: 1 }}>
          <Image source={images.logoTransparent} />
          <Text
            black
            size14
            style={{
              paddingVertical: 10,
              paddingHorizontal: 50,
              textAlign: "center"
            }}
          >
            Cùng chờ đón những cập nhật mới trong thời gian tới nhé!
          </Text>
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
