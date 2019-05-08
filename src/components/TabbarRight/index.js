import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Tabbar from "../Tabbar";
import { View, Text } from "native-base";
import images from "@assets/images";
const tabInfo = [
  {
    label: "Dự án",
    srcActive: images.projectActive,
    srcDeactive: images.project
  },
  {
    label: "Căn hộ",
    srcActive: images.apartmentActive,
    srcDeactive: images.apartment
  },
  {
    label: "Ưu đãi",
    srcActive: images.voucherActive,
    srcDeactive: images.voucher
  },
  {
    label: "Thư viện",
    srcActive: images.galleryActive,
    srcDeactive: images.gallery
  },
  {
    label: "Hỗ trợ",
    srcActive: images.supportActive,
    srcDeactive: images.support
  },
  {
    label: "Liên hệ",
    srcActive: images.contactActive,
    srcDeactive: images.contact
  }
];
class TabbarRight extends Component {
  state = {};

  render() {
    const { tintColor } = this.props;
    return (
      <View center style={{ width: 84, backgroundColor: "#202435", flex: 1 }}>
        {tabInfo.map((tab, index) => {
          const focused = index === this.props.index;
          return (
            <TouchableOpacity
              activeOpacity={0.99}
              key={index.toString()}
              style={{
                backgroundColor: "transparent",
                overflow: "hidden",
                alignItems: "center",
                justifyContent: "center",
                width: 84
              }}
              onPress={() => this.props.onFocus(index)}
            >
              <Tabbar
               
                focused={focused}
                tintColor={tintColor}
                label={tab.label}
                srcActive={tab.srcActive}
                srcDeactive={tab.srcDeactive}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}
export default TabbarRight