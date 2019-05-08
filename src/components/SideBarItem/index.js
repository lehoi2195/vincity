import React, { Component } from "react";
import { Image, Platform, TouchableOpacity } from "react-native";
import DeviceInfo from "react-native-device-info";
import { ListItem, View, Text, Left, Right } from "native-base";
import images from "../../assets/images";
export default class SideBarItem extends Component {
  static defaultProps = {
    active: false,
    text: ""
  };
  state = {};
  render() {
    const { active } = this.props;
    const width =  active ? 423 : 404;
    console.log('width', width)
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View
          row
          style={{
            padding: 14,
            backgroundColor: active ? "#FFDB6B" : "#F2F2F2",
            height: 54,
            width,
            marginVertical: 8,
            marginLeft: active ? 0 : 19
          }}
        >
          <Text
            bold
            style={{
              marginLeft: active ? 66 : 48,
              fontSize: 16
            }}
          >
            {this.props.text}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
