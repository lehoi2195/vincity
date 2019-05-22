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
const data = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
export default class PhotoViewer extends Component {
  constructor(props) {
    super(props);
  }

  onPress = (title, data) => {};

  render() {
    return (
      <View style={styles.wrapper}>
        <ImageBackground
          style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}
          source={images.placeholder}
        />
        <View center style={styles.buttonLeft}>
          <TouchableOpacity>
            <Image
              resizeMode="contain"
              style={styles.btnNextBack}
              source={images.iconBack}
            />
          </TouchableOpacity>
        </View>
        <View center style={styles.buttonRight}>
          <TouchableOpacity>
            <Image
              resizeMode="contain"
              style={styles.btnNextBack}
              source={images.iconNext}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.wrapper, AppStyles.paddingContent]}>
          <Header theme="light" title={"Teen album"} />
        </View>
        <View style={styles.slideImage}>
          <ScrollView horizontal>
            {data.map((item, index) => (
              <Image
                style={{ width: 148, height: 118, marginLeft: index!==0? 16: 0 }}
                source={images.placeholder}
              />
            ))}
          </ScrollView>
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
  slideImage: {
    position: "absolute",
    left: 42,
    right: 42,
    bottom: 42
  }
});
