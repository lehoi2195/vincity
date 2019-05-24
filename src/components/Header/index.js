import React, { Component } from "react";
import { Image, Platform, TouchableOpacity } from "react-native";
import DeviceInfo from "react-native-device-info";
import { ListItem, View, Text, Left, Right } from "native-base";
import images from "../../assets/images";
export default class Header extends Component {
  static defaultProps = {
    title: "",
    theme: "dark",
    showBack: false,
    hideLine: false
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
          {this.props.showBack ? (
            <TouchableOpacity onPress={this.props.onBack}>
              <View row style={{ marginRight: 56 }}>
                <Image
                  source={
                    theme === "dark" ? images.btnBackBlack : images.btnBackWhite
                  }
                  style={{ width: 20, height: 10, marginRight: 18 }}
                />
                <Text style={{ color: theme === "dark" ? "#434345" : "white" }}>
                  Quay lại
                </Text>
              </View>
            </TouchableOpacity>
          ) : null}
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: this.props.hideLine
              ? "transparent"
              : theme === "dark"
              ? "#CACACA"
              : "white",
            marginTop: 32,
            marginRight: 56
          }}
        />
      </View>
    );
  }
}
