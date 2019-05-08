import React, { Component } from "react";
import { Image, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View, Container } from "native-base";
import { NavigationEvents } from "react-navigation";

import variables from "@theme/variables";
import images from "@assets/images";
const width = variables.deviceWidth;

export default class PhotoLibrary extends Component {
  constructor(props) {
    super(props);
  }

  onPress = (title, data) => {
    // this.props.navigation.navigate('PhotographsDetail', { title, data })
  };

  render() {
    const { data } = this.props;
    const newData = [...data, ...data, ...data, ...data, ...data];
    if (data.length === 0) {
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
    return (
      <View style={styles.wrapper}>
        <FlatList
          contentContainerStyle={{ paddingVertical: 94 }}
          numColumns={4}
          data={newData}
          keyExtractor={index => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => this.onPress(item.name, item)}
                style={[
                  styles.folder,
                  { marginLeft: index % 4 === 0 ? 0 : 25, marginRight: 25 }
                ]}
              >
                <View>
                  <Image
                    source={
                      item.links && item.links.length > 0
                        ? { uri: `${item.links[0].link}?width=750` }
                        : images.placeholder
                    }
                    style={styles.img}
                  />
                  <View
                    style={{
                      position: "absolute",
                      top: 5,
                      left: 5,
                      width: 236,
                      height: 200,
                      borderColor: "#E0E0E0",
                      borderWidth: 1,
                      borderRadius: 1,
                      zIndex: 10
                    }}
                  />
                  <View
                    style={{
                      position: "absolute",
                      top: 10,
                      left: 10,
                      width: 236,
                      height: 200,
                      borderColor: "#E0E0E0",
                      borderWidth: 1,
                      borderRadius: 1,
                      zIndex: 1
                    }}
                  />
                </View>
                <View center style={styles.right}>
                  <Text size16 normal style={{ color: "#57585B" }} semibold>
                    {item.name}
                  </Text>
                  <Text
                    size14
                    normal
                    numberOfLines={1}
                    style={{ color: "#57585B", marginTop: 8 }}
                  >
                    {(item.links && item.links.length) || 0} ảnh
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  folder: {
    // width: "100%",
    // flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 254,
    height: 275
  },
  img: {
    borderColor: "#C4C4C4",
    borderWidth: 1,
    borderRadius: 1,
    width: 236,
    height: 200,
    zIndex: 100
  },
  right: {
    marginTop: 20,
    marginLeft: 20
  }
});
