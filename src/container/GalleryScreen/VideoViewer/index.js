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
import { getIdYoutube } from "@src/utils";
export default class PhotoViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }
  onBack = () => {
    this.props.onBack();
  };
  render() {
    const { video, index } = this.props;

    if (!video.link) {
      return (
        <View style={[styles.wrapper, AppStyles.paddingContent]}>
          <Header theme="dark" title={""} showBack onBack={this.onBack} />
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
        <View style={AppStyles.paddingContent}>
          <Header
            theme="light"
            title={video.name}
            showBack
            hideLine
            onBack={this.onBack}
          />
        </View>
        <WebView
          style={{ flex: 1, marginBottom: 150 }}
          javaScriptEnabled={true}
          source={{
            uri:
              `https://www.youtube.com/embed/${getIdYoutube(video.link)}?rel=0&autoplay=0&showinfo=0`
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#151515"
  }
});
