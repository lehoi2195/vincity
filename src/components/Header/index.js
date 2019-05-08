import React, { Component } from "react";
import { Image, Platform } from "react-native";
import DeviceInfo from "react-native-device-info";
import { ListItem, View, Text, Left, Right } from "native-base";
import images from "../../assets/images";
export default class Header extends Component {
  static defaultProps = {
    title: "",
    theme: "dark",
    showBack : false,
  };
  state = {};
  render() {
    const { theme } = this.props;
    return (
      <View style={{}}>
        <View row style={{ justifyContent: "space-between" }}>
          <Text
            semibold
            size30
            style={{ color: theme === "dark" ? "#434345" : "white" }}
          >
            {this.props.title}
          </Text>
          {this.props.showBack?<View style={{ marginRight: 56 }}>
            <Text style={{ color: theme === "dark" ? "#434345" : "white" }}>
              Quay lại
            </Text>
          </View>:null}
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: theme ? "#CACACA" : "white",
            marginTop: 32,
            marginRight: 56
          }}
        />
      </View>
    );
  }
}
