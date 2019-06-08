import React, { Component } from "react";
import { Image, StyleSheet } from "react-native";
import { Text, View } from "native-base";

import images from "../../../assets/images";
// import console = require("console");

export default class ApartmentDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  convertTools = apartment => {
    return [
      { name: `${apartment.badRoom} phòng ngủ`, icon: images.phongNgu },
      { name: `${apartment.bathRoom} phòng tắm`, icon: images.phongTam },
      { name: `${apartment.kitchenRoom} phòng bếp`, icon: images.phongBep },
      { name: "Ban công", icon: images.banCong }
    ];
  };
  render() {
    const { apartment } = this.props;
    const tools = this.convertTools(apartment);
    return (
      <View row style={styles.tools}>
        {tools.map((item, index) => (
          <View
            key={index}
            style={[styles.itemTools, { marginLeft: index !== 0 ? 5 : 0  }]}
          >
            <Image source={item.icon} resizeMode ='contain' style={{ width: 40, height: 40}}/>
            <Text size12 normal grey2 style={{ textAlign: "center" }}> {item.name} </Text>
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tools: {
    marginTop : 40,
   justifyContent :'space-between',
    width: "100%",
    height: 60,
    
  },
  itemTools: {
  
    width: 76,
    height: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
  }
});

// marginLeft: index !== 0 ? 5 : 0
