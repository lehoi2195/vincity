import React, { Component } from "react";
import { Image, Platform } from "react-native";
import { ListItem, View, Text, Left, Right } from "native-base";
import images from "@assets/images";
export default class Voucher extends Component {
    static defaultProps = {
        content: "",
        source: images.voucherIcon
    };
    state = {};
    render() {
        return (
            <View style={{ paddingHorizontal: 40 }}>
                <View row style={{ alignItems: 'center', marginTop: 12 }}>
                    <Image source={this.props.source} style={{ width: 44, height: 44 }} resizeMode="contain" />
                    <Text numberOfLines={2} bold style={{ fontSize: 14, color: '#434345', marginLeft: 16, flex: 1 }} >{this.props.content} </Text>
                </View>

                <View style={{ backgroundColor: '#B3B3B3', height: 1, width: '100%', marginTop: 12 }} />
            </View>
        );
    }
}
