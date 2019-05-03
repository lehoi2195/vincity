import React, { Component } from "react";
import { Image, Platform } from "react-native";
import DeviceInfo from "react-native-device-info";
import { ListItem, View, Text, Left, Right } from "native-base";
import images from "../../assets/images";
export default class ContactItem extends Component {
  static defaultProps = {
    content: "",
    source: images.address
  };
  state = {};
  render() {
    return (
      <View row style={{ padding: 20 }}>
        <Image
          source={this.props.source}
          style={{
            width: 46,
            height: 46
          }}
          resizeMode="contain"
        />
        <Text
          bold
          style={{
            marginLeft: 26,
            fontSize: 20, 
            color: '#333333'
          }}
        >
          {this.props.content}
        </Text>
      </View>
    );
  }
}
