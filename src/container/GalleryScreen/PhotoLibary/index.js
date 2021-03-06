import React, { Component } from "react";
import { Image, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View, Container } from "native-base";
import { NavigationEvents } from "react-navigation";
import Header from "@components/Header";
import variables from "@theme/variables";
import images from "@assets/images";
import AppStyles from "@styles";
import PhotoViewer from "../PhotoViewer";

const width = variables.deviceWidth;

export default class PhotoLibrary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPhotoViewer: false,
      albumSelected: [],
      albumIndex: 0
    };
  }
  onBack = () => {
    this.setState({ showPhotoViewer: false, albumSelected: [], albumIndex: 0 });
  };
  onPress = (item, index) => {
    // this.props.navigation.navigate('PhotographsDetail', { title, data })
    this.setState({
      showPhotoViewer: true,
      albumSelected: item,
      albumIndex: index
    });
  };
  renderPhotoViewer() {
    return (
      <PhotoViewer
        onBack={this.onBack}
        album={this.state.albumSelected}
        index={this.state.albumIndex}
      />
    );
  }

  renderAlbumList() {
    const { data } = this.props;
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
    console.log("Album data", data);
    return (
      <View style={[styles.wrapper, AppStyles.paddingContent]}>
       
        <FlatList
          contentContainerStyle={{ paddingVertical: 40 }}
          numColumns={4}
          data={data}
          keyExtractor={index => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => this.onPress(item, index)}
                style={[
                  styles.folder,
                  {
                    marginLeft: index % 4 === 0 ? 0 : 25,
                    marginRight: 25,
                    marginVertical: 10
                  }
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

  render() {
    return this.state.showPhotoViewer
      ? this.renderPhotoViewer()
      : this.renderAlbumList();
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
