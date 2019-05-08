import React, { Component } from "react";
import {
  Image,
  FlatList,
  Platform,
  StyleSheet,
  PixelRatio,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { Text, View } from "native-base";
import { Thumbnail } from "react-native-thumbnail-video";
import DeviceInfo from "react-native-device-info";

import images from "@assets/images";
import { getIdYoutube } from "@utils";
import variables from "@theme/variables";

const width = variables.deviceWidth;

export default class VideoLibrary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      containerWidth: 348
    };
  }

  componentDidMount() {
    this.setState({ data: this.props.data });
  }

  renderYoutube = ({ item, index }) => {
    const ratio = 16 / 9;

    return (
      <View
        key={index}
        style={[
          styles.wrapper,
          { marginLeft: index % 3 === 0 ? 0 : 30, marginRight: 30 }
        ]}
      >
        <View
          style={[
            styles.img,
            {
              height:
                PixelRatio.roundToNearestPixel(
                  this.state.containerWidth / ratio
                ) + 20
            }
          ]}
        >
          <Thumbnail
            containerStyle={{ borderColor: "#E0E0E0", borderWidth: 1 }}
            showPlayIcon={false}
            imageWidth={348}
            imageHeight={196}
            url={item.link}
          >
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Image
                resizeMode="contain"
                style={{ width: 40, height: 40 }}
                source={images.iconPlay}
              />
            </TouchableOpacity>
          </Thumbnail>
        </View>
        <Text size14 bold black numberOfLines={2} style={{ width: 348 }}>
          {item.name}
        </Text>
      </View>
    );
  };

  render() {
    const { data } = this.props;
    const { loading } = this.props;
    if (loading) {
      return (
        <View center style={{ flex: 1 }}>
          <ActivityIndicator size="small" color="#000" />
        </View>
      );
    }
    if (
      Object.keys(data).length === 0 ||
      (Object.keys(data).length > 0 && data.links.length === 0)
    ) {
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
      <View style={{ flex: 1 }}>
        <FlatList
          contentContainerStyle={{ paddingVertical: 60 }}
          numColumns={3}
          data={data.links}
          key={index => index.toString()}
          renderItem={this.renderYoutube}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
    //   backgroundColor:'red'
  },
  img: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 7,
    width: 348
  }
});
