import React, { Component } from "react";
import {
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground
} from "react-native";
import { Text, View, Container } from "native-base";
import { NavigationEvents } from "react-navigation";
import Header from "@components/Header";
import variables from "@theme/variables";
import images from "@src/assets/images";
import AppStyles from "@styles";
export default class PhotoViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageIndex: 0
    };
  }

  onBack = () => {
    this.props.onBack();
  };

  onImageNext = () => {
    this.setState(
      {
        imageIndex: this.state.imageIndex + 1
      },
      () => {
        this.list.scrollToIndex({
          index: this.state.imageIndex,
          viewPosition: 0.5
        });
      }
    );
  };
  onImageBack = () => {
    this.setState(
      {
        imageIndex: this.state.imageIndex - 1
      },
      () => {
        this.list.scrollToIndex({
          index: this.state.imageIndex,
          viewPosition: 0.5
        });
      }
    );
  };

  render() {
    const { album, index } = this.props;
    const { imageIndex } = this.state;

    if (album.links.length === 0) {
      return (
        <View style={[styles.wrapper, AppStyles.paddingContent]}>
          <Header
            theme="dark"
            title={album.name}
            showBack
            onBack={this.onBack}
          />
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
        </View>
      );
    }

    return (
      <View style={styles.wrapper}>
        <ImageBackground
          // resizeMode='contain'
          style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}
          source={
            album.links && album.links.length > 0 && album.links[imageIndex]
              ? { uri: `${album.links[imageIndex].link}?width=1371` }
              : images.placeholder
          }
        />
        {imageIndex !== 0 ? (
          <View center style={styles.buttonLeft}>
            <TouchableOpacity onPress={this.onImageBack}>
              <Image
                resizeMode="contain"
                style={styles.btnNextBack}
                source={images.iconBack}
              />
            </TouchableOpacity>
          </View>
        ) : null}
        {imageIndex !== album.links.length - 1 ? (
          <View center style={styles.buttonRight}>
            <TouchableOpacity onPress={this.onImageNext}>
              <Image
                resizeMode="contain"
                style={styles.btnNextBack}
                source={images.iconNext}
              />
            </TouchableOpacity>
          </View>
        ) : null}
        <View style={[styles.wrapper, AppStyles.paddingContent]}>
          <Header
            theme="light"
            title={album.name}
            showBack
            onBack={this.onBack}
          />
        </View>
        <View style={styles.slideImage}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            ref={list => (this.list = list)}
            horizontal
            extraData={this.state}
            data={album.links}
            keyExtractor={(item, index) =>
              item.link ? item.link.toString() : index.toString()
            }
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => {
                  this.list.scrollToIndex({ index, viewPosition: 0.5 });
                  this.setState({ imageIndex: index });
                }}
              >
                <Image
                  style={{
                    width: 148,
                    height: 118,
                    marginLeft: index !== 0 ? 16 : 0
                  }}
                  source={
                    item.link
                      ? { uri: `${item.link}?width=148` }
                      : images.placeholder
                  }
                />
                {imageIndex === index ? (
                  <View
                    style={{
                      backgroundColor: "rgba(255, 203, 42, 0.4)",
                      position: "absolute",
                      top: 0,
                      left: index !== 0 ? 16 : 0,
                      right: 0,
                      bottom: 0
                    }}
                  />
                ) : null}
              </TouchableOpacity>
            )}
          />
          {imageIndex !== 0 ? (
            <View center style={[styles.buttonLeft, { padding: 10 }]}>
              <TouchableOpacity onPress={this.onImageBack}>
                <Image
                  resizeMode="contain"
                  style={styles.btnNextBackSmall}
                  source={images.iconBack}
                />
              </TouchableOpacity>
            </View>
          ) : null}
          {imageIndex !== album.links.length - 1 ? (
            <View center style={[styles.buttonRight, { padding: 10 }]}>
              <TouchableOpacity onPress={this.onImageNext}>
                <Image
                  resizeMode="contain"
                  style={styles.btnNextBackSmall}
                  source={images.iconNext}
                />
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  buttonLeft: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    padding: 20,
    backgroundColor: "transparent"
  },
  buttonRight: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    padding: 20,
    backgroundColor: "transparent"
  },
  btnNextBack: {
    width: 50,
    height: 50
  },
  btnNextBackSmall: {
    width: 17,
    height: 17
  },
  slideImage: {
    position: "absolute",
    left: 42,
    right: 42,
    bottom: 42
  }
});
