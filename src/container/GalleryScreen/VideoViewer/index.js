import React, { Component } from "react";
import {
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground, 
  WebView
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

  render() {
    const { album =[{}], index } = this.props;
    const { imageIndex } = this.state;

    if (album.length === 0) {
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
        <Header title={"Thư viện ảnh"} />
        <WebView
          style={{ flex: 1 }}
          javaScriptEnabled={true}
          source={{
            uri:
              "https://www.youtube.com/embed/3fi7uwBU-CE?rel=0&autoplay=0&showinfo=0"
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  }
});
