/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Image, Dimensions } from "react-native";
import { View, Text } from "native-base";
import AppStyles from "@styles";
import Header from "@components/Header";
import SideBarItem from "@components/SideBarItem";
const { width, height } = Dimensions.get("window");
const GALLERY_TAB = [
  { id: 0, text: "Hình ảnh" },
  { id: 1, text: "Video" },
  { id: 2, text: "Tài liệu" }
];

import images from "@assets/images";
import variables from "@theme/variables";
import {
  actionLibrary,
  getDocumentLibrary,
  getProjectByCity,
  openGallery
} from "@store/actions";
import { getToken, isRequestPending } from "@store/selectors";
import configs from "@src/constants/configs";
import PhotoLibrary from "./PhotoLibary";
import VideoLibrary from "./VideoLibrary";
import { connect } from "react-redux";
class GalleryScreen extends Component {
  state = {
    index: 4
  };
  onPressItem = index => {
    this.setState({ index });
  };
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.watcher = null;
  }

  getDocument = query => {
    const { token, getDocumentLibrary } = this.props;
    this.setState({ data: [] });
    getDocumentLibrary(token, query, (error, data) => {
      if (error) return;
      console.log(data);
      if (data && data.data) {
        this.setState({ data: data.data });
      }
    });
  };

  componentDidMount() {
    this.getDocument(`?project=${configs.projectId}`);
  }

  render() {
    const { data } = this.state;

    return (
      <View row style={styles.container}>
        <View style={AppStyles.content}>
          <Header />
          {/* <PhotoLibrary
            tabLabel="Hình ảnh"
            loading={this.props.loading}
            data={data.images || []}
            allImages={data.listImages || []}
            arrFolderImages={data.arrFolderImages || []}
            navigation={this.props.navigation}
          /> */}
          <VideoLibrary
            tabLabel="Video"
            loading={this.props.loading}
            data={data.video || {}}
          />
        </View>
        <View
          style={[AppStyles.sidebar, { paddingTop: 108, paddingRight: 42 }]}
        >
          {GALLERY_TAB.map((tab, index) => (
            <SideBarItem
              onPress={() => this.onPressItem(index)}
              active={this.state.index === index}
              text={tab.text}
              key={tab.id.toString()}
            />
          ))}
        </View>
      </View>
    );
  }
}

export default connect(
  state => ({
    token: getToken(state),
    loading: isRequestPending(state, "getDocumentLibrary")
    // dropLibrary: state.app.dropLibrary,
  }),
  {
    actionLibrary,
    getDocumentLibrary,
    getProjectByCity,
    openGallery
  }
)(GalleryScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
    // backgroundColor:'red',
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
